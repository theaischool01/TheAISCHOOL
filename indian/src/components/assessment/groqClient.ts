import { SpeechEvaluation, StructuredResume, QuizQuestion, EvaluationReport, CandidateProfile } from './types';
import {
  MOCK_SPEECH_EVALUATION,
  MOCK_CHAT_MENTOR_RESPONSES,
  MOCK_STRUCTURED_RESUME,
  MOCK_QUIZ_QUESTIONS,
  generateEvaluationReport as generateMockReport
} from './mockTemplates';

export function getApiBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5000';
    }
  }
  return 'https://api.theaischool.co';
}

async function callGroqProxy(
  messages: { role: 'system' | 'user' | 'assistant'; content: string }[],
  options: { jsonMode?: boolean; temperature?: number; maxTokens?: number } = {}
): Promise<string> {
  const baseUrl = getApiBaseUrl();
  const res = await fetch(`${baseUrl}/api/groq`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages,
      temperature: options.temperature ?? 0.3,
      max_tokens: options.maxTokens ?? 1500,
      response_format: options.jsonMode ? { type: 'json_object' } : undefined
    })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Server responded with status ${res.status}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

// STEP 2: Speech Evaluation
export async function evaluateSpeech(
  introText: string,
  demoMode = false
): Promise<{ data: SpeechEvaluation | null; isLive: boolean; error?: string }> {
  const cleanText = (introText || '').trim();

  if (demoMode) {
    return { data: MOCK_SPEECH_EVALUATION, isLive: false, error: 'Demo mode active' };
  }

  if (!cleanText || cleanText.length < 25) {
    throw new Error('Please record or type at least 25 characters of introduction before running analysis.');
  }

  try {
    const systemPrompt = `You are an elite AI technical recruiter and speech coach evaluating a candidate's video self-introduction.
Analyze the candidate's transcript verbatim.
IMPORTANT RULES:
1. Base your evaluation strictly on the candidate's actual words and topic.
2. In "samplePolishedIntro", provide an enhanced, polished version of the candidate's actual stated background and words. Do NOT invent a fake person or unrelated projects.
3. Return ONLY valid JSON matching this schema:
{
  "overallScore": number (0-100),
  "clarityScore": number (0-100),
  "fluencyScore": number (0-100),
  "vocabularyScore": number (0-100),
  "confidenceScore": number (0-100),
  "grammarFeedback": string[],
  "vocabularyFeedback": string[],
  "keyStrengths": string[],
  "improvementAreas": string[],
  "samplePolishedIntro": string
}`;

    const userPrompt = `Candidate Self-Introduction Transcript (verbatim):
"""
${cleanText}
"""
Evaluate clarity, grammar, pacing, and technical vocabulary based strictly on the above text.`;

    const raw = await callGroqProxy(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      { jsonMode: true, temperature: 0.3 }
    );

    const parsed = JSON.parse(raw);
    const data: SpeechEvaluation = {
      overallScore: Number(parsed.overallScore) || 75,
      clarityScore: Number(parsed.clarityScore) || 75,
      fluencyScore: Number(parsed.fluencyScore) || 75,
      vocabularyScore: Number(parsed.vocabularyScore) || 75,
      confidenceScore: Number(parsed.confidenceScore) || 75,
      grammarFeedback: Array.isArray(parsed.grammarFeedback) ? parsed.grammarFeedback : [],
      vocabularyFeedback: Array.isArray(parsed.vocabularyFeedback) ? parsed.vocabularyFeedback : [],
      keyStrengths: Array.isArray(parsed.keyStrengths) ? parsed.keyStrengths : [],
      improvementAreas: Array.isArray(parsed.improvementAreas) ? parsed.improvementAreas : [],
      samplePolishedIntro: parsed.samplePolishedIntro || cleanText
    };

    return { data, isLive: true };
  } catch (err: any) {
    console.error('Groq speech evaluation failed:', err);
    throw new Error(err.message || 'Failed to analyze speech with Groq AI');
  }
}

// STEP 3: Career Chat Mentor Turn
export async function getMentorChatResponse(
  messages: { role: 'user' | 'assistant'; content: string }[],
  questionIndex: number,
  candidateName: string,
  demoMode = false
): Promise<{ reply: string; isLive: boolean; error?: string }> {
  if (demoMode) {
    return {
      reply: MOCK_CHAT_MENTOR_RESPONSES[questionIndex] || "Thank you for that explanation. Let's proceed.",
      isLive: false,
      error: 'Demo mode active'
    };
  }

  try {
    const systemPrompt = `You are "AI Career Mentor" at The AI School. You are conducting an interactive 5-question technical interview with candidate ${candidateName || 'Candidate'}.
Currently addressing Question #${questionIndex + 1} of 5.
Provide a thoughtful, encouraging, yet critically analytical 2-3 sentence reaction to the candidate's latest response.
Highlight their technical insights or suggest a subtle optimization, then smoothly acknowledge completion of this question.`;

    const groqMessages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    const reply = await callGroqProxy(groqMessages, { temperature: 0.7, maxTokens: 250 });
    return { reply: reply.trim(), isLive: true };
  } catch (err: any) {
    console.warn('Groq mentor chat failed, using fallback:', err);
    return {
      reply: MOCK_CHAT_MENTOR_RESPONSES[questionIndex] || "Thank you for sharing your experience! That was insightful.",
      isLive: false,
      error: err.message || 'Groq connection failed'
    };
  }
}

// STEP 4: Resume Structuring
export async function structureResume(
  resumeRawText: string,
  demoMode = false
): Promise<{ data: StructuredResume; isLive: boolean; error?: string }> {
  if (demoMode) {
    return { data: MOCK_STRUCTURED_RESUME, isLive: false, error: 'Demo mode active' };
  }

  if (!resumeRawText.trim() || resumeRawText.trim().length < 20) {
    return { data: MOCK_STRUCTURED_RESUME, isLive: false, error: 'Resume text too short' };
  }

  try {
    const systemPrompt = `You are an expert AI resume parser. Extract and structure the candidate's resume into ONLY valid JSON matching this schema:
{
  "candidateName": string,
  "email": string,
  "phone": string,
  "summary": string,
  "skills": {
    "programming": string[],
    "aiAndMl": string[],
    "webAndCloud": string[],
    "toolsAndFrameworks": string[],
    "softSkills": string[]
  },
  "experienceLevel": "Student / Fresher" | "Junior (1-2 yrs)" | "Mid-Level (3-5 yrs)" | "Senior (5+ yrs)",
  "highlightedProjects": [
    {
      "title": string,
      "description": string,
      "technologies": string[]
    }
  ],
  "education": [
    {
      "degree": string,
      "institution": string,
      "year": string
    }
  ]
}`;

    const raw = await callGroqProxy(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Resume Content:\n${resumeRawText.slice(0, 4000)}` }
      ],
      { jsonMode: true, temperature: 0.2 }
    );

    const parsed = JSON.parse(raw);
    const data: StructuredResume = {
      candidateName: parsed.candidateName || MOCK_STRUCTURED_RESUME.candidateName,
      email: parsed.email || MOCK_STRUCTURED_RESUME.email,
      phone: parsed.phone || MOCK_STRUCTURED_RESUME.phone,
      summary: parsed.summary || MOCK_STRUCTURED_RESUME.summary,
      skills: {
        programming: parsed.skills?.programming?.length ? parsed.skills.programming : MOCK_STRUCTURED_RESUME.skills.programming,
        aiAndMl: parsed.skills?.aiAndMl?.length ? parsed.skills.aiAndMl : MOCK_STRUCTURED_RESUME.skills.aiAndMl,
        webAndCloud: parsed.skills?.webAndCloud?.length ? parsed.skills.webAndCloud : MOCK_STRUCTURED_RESUME.skills.webAndCloud,
        toolsAndFrameworks: parsed.skills?.toolsAndFrameworks?.length ? parsed.skills.toolsAndFrameworks : MOCK_STRUCTURED_RESUME.skills.toolsAndFrameworks,
        softSkills: parsed.skills?.softSkills?.length ? parsed.skills.softSkills : MOCK_STRUCTURED_RESUME.skills.softSkills
      },
      experienceLevel: parsed.experienceLevel || MOCK_STRUCTURED_RESUME.experienceLevel,
      highlightedProjects: parsed.highlightedProjects?.length ? parsed.highlightedProjects : MOCK_STRUCTURED_RESUME.highlightedProjects,
      education: parsed.education?.length ? parsed.education : MOCK_STRUCTURED_RESUME.education
    };

    return { data, isLive: true };
  } catch (err: any) {
    console.warn('Groq resume structuring failed, using fallback:', err);
    return { data: MOCK_STRUCTURED_RESUME, isLive: false, error: err.message || 'Groq connection failed' };
  }
}

// STEP 5: Technical Quiz Generation
export async function generateQuizQuestions(
  skills: string[],
  demoMode = false
): Promise<{ questions: QuizQuestion[]; isLive: boolean; error?: string }> {
  if (demoMode || !skills.length) {
    return { questions: MOCK_QUIZ_QUESTIONS, isLive: false, error: demoMode ? 'Demo mode active' : 'No skills provided' };
  }

  try {
    const systemPrompt = `You are a Senior Principal AI Engineer drafting an adaptive technical quiz for a candidate with skills: ${skills.join(', ')}.
Generate EXACTLY 5 questions (Questions 1, 2, 3 must be Multiple Choice Questions with 4 options; Questions 4 and 5 must be Numerical problems with single integer answers).
Output ONLY valid JSON matching this schema:
{
  "questions": [
    {
      "id": "q1",
      "type": "mcq",
      "category": string,
      "difficulty": "Intermediate",
      "question": string,
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "Exact string of one of the options",
      "explanation": string
    },
    ... (3 MCQ total),
    {
      "id": "q4",
      "type": "numerical",
      "category": string,
      "difficulty": "Intermediate",
      "question": string,
      "correctAnswer": number,
      "explanation": string
    },
    ... (2 numerical total)
  ]
}`;

    const raw = await callGroqProxy(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: 'Generate 5 adaptive questions tailored to the candidate skills now.' }
      ],
      { jsonMode: true, temperature: 0.3 }
    );

    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed.questions) && parsed.questions.length === 5) {
      return { questions: parsed.questions, isLive: true };
    }
    return { questions: MOCK_QUIZ_QUESTIONS, isLive: false, error: 'Unexpected question format received from AI' };
  } catch (err: any) {
    console.warn('Groq quiz generation failed, using fallback:', err);
    return { questions: MOCK_QUIZ_QUESTIONS, isLive: false, error: err.message || 'Groq connection failed' };
  }
}

// STEP 6: Full Evaluation Report Generation via Groq
export async function generateAiEvaluationReport(
  candidate: CandidateProfile,
  speechScore: number,
  quizScore: number,
  totalQuiz: number,
  demoMode = false
): Promise<{ report: EvaluationReport; isLive: boolean; error?: string }> {
  if (demoMode) {
    return {
      report: generateMockReport(candidate, speechScore, quizScore, totalQuiz),
      isLive: false,
      error: 'Demo mode active'
    };
  }

  try {
    const systemPrompt = `You are the Chief Talent Scientist at The AI School. Generate a personalized, highly thorough AI career evaluation report for:
Candidate: ${candidate.name || 'Candidate'}
College: ${candidate.college || 'Engineering College'}
Target Domain: ${candidate.targetDomain || 'AI Engineering'}
Speech Evaluation Score: ${speechScore}/100
Quiz Score: ${quizScore}/${totalQuiz}

Return ONLY valid JSON matching this schema:
{
  "overallScore": number (0-100),
  "readinessLevel": "Foundational" | "Emerging Talent" | "Industry Ready" | "Advanced Practitioner",
  "summary": string,
  "metricScores": [
    { "name": string, "score": number, "benchmark": number, "description": string }
  ],
  "identifiedStrengths": string[],
  "areasForGrowth": string[],
  "ninetyDayRoadmap": [
    { "month": string, "title": string, "goals": string[] }
  ],
  "recommendedCourses": [
    { "name": string, "slug": string, "matchPercentage": number, "description": string, "category": string }
  ]
}`;

    const raw = await callGroqProxy(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: 'Generate the complete evaluation dossier in JSON now.' }
      ],
      { jsonMode: true, temperature: 0.3 }
    );

    const parsed = JSON.parse(raw);
    const mockDefault = generateMockReport(candidate, speechScore, quizScore, totalQuiz);

    const report: EvaluationReport = {
      overallScore: parsed.overallScore || mockDefault.overallScore,
      readinessLevel: parsed.readinessLevel || mockDefault.readinessLevel,
      summary: parsed.summary || mockDefault.summary,
      metricScores: Array.isArray(parsed.metricScores) && parsed.metricScores.length >= 4
        ? parsed.metricScores
        : mockDefault.metricScores,
      identifiedStrengths: Array.isArray(parsed.identifiedStrengths) && parsed.identifiedStrengths.length
        ? parsed.identifiedStrengths
        : mockDefault.identifiedStrengths,
      areasForGrowth: Array.isArray(parsed.areasForGrowth) && parsed.areasForGrowth.length
        ? parsed.areasForGrowth
        : mockDefault.areasForGrowth,
      ninetyDayRoadmap: Array.isArray(parsed.ninetyDayRoadmap) && parsed.ninetyDayRoadmap.length
        ? parsed.ninetyDayRoadmap
        : mockDefault.ninetyDayRoadmap,
      recommendedCourses: Array.isArray(parsed.recommendedCourses) && parsed.recommendedCourses.length
        ? parsed.recommendedCourses
        : mockDefault.recommendedCourses
    };

    return { report, isLive: true };
  } catch (err: any) {
    console.warn('Groq report generation failed, using fallback:', err);
    return {
      report: generateMockReport(candidate, speechScore, quizScore, totalQuiz),
      isLive: false,
      error: err.message || 'Groq connection failed'
    };
  }
}

// Student DB Persistence
export async function saveStudentProfile(candidate: CandidateProfile): Promise<boolean> {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/api/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        college: candidate.college
      })
    });
    return res.ok;
  } catch (err) {
    console.warn('Could not save student to backend:', err);
    return false;
  }
}

export async function saveInterviewReport(payload: any): Promise<{ success: boolean; reportId?: string | number }> {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/api/save-interview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const data = await res.json();
      return { success: true, reportId: data.reportId };
    }
    return { success: false };
  } catch (err) {
    console.warn('Could not save interview report to backend:', err);
    return { success: false };
  }
}
