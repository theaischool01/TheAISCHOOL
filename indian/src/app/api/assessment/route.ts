import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { rateLimit } from '@/lib/rateLimit';
import { z } from 'zod';
import { sendAssessmentEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

const postAssessmentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  college: z.string().min(1, 'College is required'),
  degree: z.string().min(1, 'Degree is required'),
  graduationYear: z.string().min(1, 'Graduation year is required'),
  linkedinUrl: z.string().url({ message: 'Invalid LinkedIn URL' }).optional().or(z.literal('')),
  githubUrl: z.string().url({ message: 'Invalid GitHub URL' }).optional().or(z.literal('')),
  portfolioUrl: z.string().url({ message: 'Invalid Portfolio URL' }).optional().or(z.literal('')),
  resumeUrl: z.string().url({ message: 'Invalid Resume URL' }).optional().or(z.literal('')),
  resumeStatus: z.enum(['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED']).optional(),
  source: z.string().optional(),
  skillsMatrix: z.record(z.string(), z.any()).optional(),
  candidateProfile: z.string().optional(),
  interestVector: z.record(z.string(), z.any()).optional(),
  answers: z.array(z.object({
    questionId: z.string(),
    selectedAnswer: z.string(),
    score: z.number()
  })).optional(),
  scores: z.object({
    technicalFoundation: z.number().optional(),
    aiReadiness: z.number().optional(),
    industryReadiness: z.number().optional(),
    learningVelocity: z.number().optional(),
    problemSolving: z.number().optional(),
    overall: z.number().optional()
  }).optional()
});

export async function GET(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const leads = await prisma.assessmentLead.findMany({
      include: {
        sessions: {
          include: {
            results: {
              include: {
                recommendations: {
                  include: {
                    course: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate metrics
    const totalLeads = leads.length;
    let totalScoreSum = 0;
    let hotLeadsCount = 0;
    let enrolledLeadsCount = 0;
    const courseCounts: Record<string, number> = {};

    leads.forEach((l) => {
      if (l.leadScore && l.leadScore >= 90) hotLeadsCount++;
      if (l.status === 'ENROLLED') enrolledLeadsCount++;

      const session = l.sessions[0];
      if (session) {
        if (session.overallScore) {
          totalScoreSum += session.overallScore;
        }
        const result = session.results[0];
        if (result && result.recommendations) {
          const primary = result.recommendations.find((r) => r.type === 'PRIMARY');
          if (primary && primary.course) {
            courseCounts[primary.course.title] = (courseCounts[primary.course.title] || 0) + 1;
          }
        }
      }
    });

    const averageScore = totalLeads > 0 ? Math.round(totalScoreSum / totalLeads) : 0;
    const conversionPercent = totalLeads > 0 ? Math.round((enrolledLeadsCount / totalLeads) * 100) : 0;

    let topCourse = 'N/A';
    let maxCount = 0;
    Object.entries(courseCounts).forEach(([title, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topCourse = title;
      }
    });

    const metrics = {
      totalAssessments: totalLeads,
      averageScore,
      hotLeads: hotLeadsCount,
      topRecommendedCourse: topCourse,
      enrollmentConversion: conversionPercent,
    };

    return NextResponse.json({ leads, metrics });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  // 1. Rate Limiting Check
  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
  const limiter = rateLimit(ip, 15, 60000); // 15 requests/min per IP
  if (!limiter.success) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  console.log('[AssessmentPipeline] Onboarding started');
  try {
    const rawBody = await req.json();

    // 2. Input Validation via Zod
    const parsed = postAssessmentSchema.safeParse(rawBody);
    if (!parsed.success) {
      console.log('[AssessmentPipeline] Validation failed:', parsed.error.format());
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.format() }, { status: 400 });
    }

    const {
      name,
      email,
      phone,
      college,
      degree,
      graduationYear,
      linkedinUrl,
      githubUrl,
      portfolioUrl,
      resumeUrl,
      resumeStatus = 'PENDING',
      source = 'Direct',
      skillsMatrix = {},
      candidateProfile = 'Beginner',
      interestVector = {},
      answers = [],
      scores = {},
    } = parsed.data;

    // Fetch active courses
    const activeCourses = await prisma.course.findMany({ where: { isActive: true } });
    if (activeCourses.length === 0) {
      throw new Error('No active learning tracks found in course catalog');
    }

    // Skill Gap Analysis
    const currentSkills: string[] = [];
    const missingSkills: string[] = [];
    
    const skillList = [
      { key: 'python', label: 'Python' },
      { key: 'sql', label: 'SQL' },
      { key: 'machineLearning', label: 'Machine Learning' },
      { key: 'react', label: 'React / Frontend' },
      { key: 'generativeAi', label: 'Generative AI' },
      { key: 'cloud', label: 'Cloud Deployments' },
      { key: 'dataAnalytics', label: 'Data Analytics' },
    ];

    skillList.forEach((sk) => {
      if (skillsMatrix[sk.key]) {
        currentSkills.push(sk.label);
      } else {
        missingSkills.push(sk.label);
      }
    });

    // Score Calculations
    let completeness = 0;
    if (name) completeness += 3;
    if (email) completeness += 3;
    if (phone) completeness += 3;
    if (college) completeness += 3;
    if (degree) completeness += 3;
    if (graduationYear) completeness += 3;
    if (linkedinUrl || githubUrl || portfolioUrl) completeness += 2;

    const techScoreRaw = scores.technicalFoundation || 0;
    const techPoints = (techScoreRaw / 100) * 40;
    const resumePoints = resumeUrl ? 20 : 0;
    const interestMap = (interestVector || {}) as any;
    const skillsMap = (skillsMatrix || {}) as any;
    const strongInterestCount = Object.values(interestMap).filter((val: any) => val >= 70).length;
    const interestPoints = Math.min(strongInterestCount * 5, 20);

    const calculatedLeadScore = Math.round(completeness + techPoints + resumePoints + interestPoints);

    // Recommendation Category Scores
    const categoryScores: Record<string, number> = {
      'AI Agents & GenAI': (interestMap.GenAI || 0) * 0.7 + (skillsMap.python ? 30 : 0),
      'Data Analytics': (interestMap.DataScience || 0) * 0.7 + (skillsMap.sql ? 30 : 0),
      'Cloud & Security': (interestMap.Cloud || 0) * 0.7 + (skillsMap.cloud ? 30 : 0),
      'Programming': (interestMap.Coding || 0) * 0.7 + (skillsMap.react ? 30 : 0),
      'Business & Growth': (interestMap.Business || 0) * 0.7,
    };

    const sortedCategories = Object.entries(categoryScores).sort((a, b) => b[1] - a[1]);
    const topCategory = sortedCategories[0][0];

    const matchedCourses = activeCourses.filter((c) => c.category === topCategory);
    const primaryCourse = matchedCourses[0] || activeCourses[0];
    const secondaryCourses = activeCourses.filter((c) => c.id !== primaryCourse.id).slice(0, 3);

    // Database transaction block
    console.log('[AssessmentPipeline] Executing database transaction...');
    const txResult = await prisma.$transaction(async (tx) => {
      // Upsert Lead
      const lead = await tx.assessmentLead.upsert({
        where: { email },
        update: {
          name,
          phone,
          college,
          degree,
          graduationYear,
          linkedinUrl,
          githubUrl,
          portfolioUrl,
          resumeUrl,
          resumeStatus: resumeUrl ? 'COMPLETED' : resumeStatus,
          source,
          leadScore: calculatedLeadScore,
        },
        create: {
          name,
          email,
          phone,
          college,
          degree,
          graduationYear,
          linkedinUrl,
          githubUrl,
          portfolioUrl,
          resumeUrl,
          resumeStatus: resumeUrl ? 'COMPLETED' : resumeStatus,
          source,
          leadScore: calculatedLeadScore,
        },
      });

      // Create Session
      const session = await tx.assessmentSession.create({
        data: {
          leadId: lead.id,
          skillsMatrix: skillsMatrix as any,
          candidateProfile,
          interestVector: interestVector as any,
          overallReadiness: scores.aiReadiness || 0,
          technicalFoundation: scores.technicalFoundation || 0,
          problemSolving: scores.problemSolving || 0,
          industryReadiness: scores.industryReadiness || 0,
          learningVelocity: scores.learningVelocity || 0,
          overallScore: scores.overall || 0,
          skillGapAnalysis: { currentSkills, missingSkills } as any,
          answers: {
            create: answers.map((ans: any) => ({
              questionId: ans.questionId,
              selectedAnswer: ans.selectedAnswer,
              score: ans.score,
            })),
          },
        },
      });

      // Create Result
      const result = await tx.assessmentResult.create({
        data: {
          sessionId: session.id,
          technicalFoundationScore: scores.technicalFoundation || 0,
          aiReadinessScore: scores.aiReadiness || 0,
          industryReadinessScore: scores.industryReadiness || 0,
          learningVelocityScore: scores.learningVelocity || 0,
          overallScore: scores.overall || 0,
        },
      });

      // Create Recommendations
      // Primary
      await tx.assessmentRecommendation.create({
        data: {
          resultId: result.id,
          courseId: primaryCourse.id,
          confidenceScore: Math.min(Math.round(sortedCategories[0][1]), 100),
          alignmentScore: Math.min(Math.round(sortedCategories[0][1]), 100),
          type: 'PRIMARY',
        },
      });

      // Secondary
      for (const sec of secondaryCourses) {
        await tx.assessmentRecommendation.create({
          data: {
            resultId: result.id,
            courseId: sec.id,
            confidenceScore: Math.min(Math.round(scores.overall || 70) - 10, 90),
            alignmentScore: Math.min(Math.round(scores.overall || 70) - 10, 90),
            type: 'SECONDARY',
          },
        });
      }

      return { leadId: lead.id, resumeUrl: lead.resumeUrl };
    });

    console.log(`[AssessmentPipeline] Transaction successfully completed. Lead: ${txResult.leadId}`);

    // Trigger automated assessment completion email asynchronously in the background
    try {
      const emailParams = {
        leadId: txResult.leadId,
        recipientEmail: email,
        candidateName: name,
        overallScore: scores.overall || 0,
        aiReadiness: scores.aiReadiness || 0,
        technicalFoundation: scores.technicalFoundation || 0,
        recommendedCourse: primaryCourse.title,
        confidenceScore: Math.min(Math.round(sortedCategories[0][1]), 100),
        skillGapSummary: { currentSkills, missingSkills },
      };
      
      sendAssessmentEmail(emailParams).catch((err) => {
        console.error('[AssessmentPipeline] Background email sending task failed:', err);
      });
    } catch (emailErr) {
      console.error('[AssessmentPipeline] Failed to trigger email service async:', emailErr);
    }

    return NextResponse.json({
      success: true,
      leadId: txResult.leadId,
      resumeUrl: txResult.resumeUrl,
    });
  } catch (error: any) {
    console.error('[AssessmentPipeline] Onboarding transaction failed:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
