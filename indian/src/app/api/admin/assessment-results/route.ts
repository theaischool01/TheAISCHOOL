import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sessions = await prisma.assessmentSession.findMany({
      include: {
        lead: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        results: {
          include: {
            recommendations: {
              include: {
                course: {
                  select: {
                    title: true,
                  },
                },
              },
            },
          },
        },
        answers: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const formattedResults = sessions.map((session: any) => {
      const result = session.results[0];
      const primaryRecommendation = result?.recommendations.find(
        (rec: any) => rec.type === 'PRIMARY'
      );
      
      const answers = session.answers.map((answer: any) => ({
        questionId: answer.questionId,
        selectedAnswer: answer.selectedAnswer,
        score: answer.score,
      }));

      return {
        id: session.id,
        name: session.lead.name,
        email: session.lead.email,
        phone: session.lead.phone,
        score: result?.overallScore ? Math.round(result.overallScore) : 0,
        recommendedCourse: primaryRecommendation?.course?.title || 'N/A',
        createdAt: session.createdAt.toISOString(),
        answers,
      };
    });

    return NextResponse.json(formattedResults);
  } catch (error) {
    console.error('Failed to fetch assessment results:', error);
    return NextResponse.json({ error: 'Failed to fetch assessment results' }, { status: 500 });
  }
}
