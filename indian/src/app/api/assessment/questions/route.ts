import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  // Rate Limiting Check
  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
  const limiter = rateLimit(ip, 25, 60000); // 25 requests/min per IP
  if (!limiter.success) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const difficulty = searchParams.get('difficulty') || 'Beginner';

    console.log(`[QuestionsEngine] Fetching questions for difficulty: ${difficulty}`);

    // Fetch questions matching target difficulty
    let targetQuestions = await prisma.assessmentQuestion.findMany({
      where: { difficulty },
      include: { options: true }
    });

    let selectedQuestions = [...targetQuestions];

    // If we have fewer than 10, backfill from other difficulties to ensure exactly 10 distinct questions
    if (selectedQuestions.length < 10) {
      console.log(`[QuestionsEngine] Target difficulty count ${selectedQuestions.length} is less than 10. Backfilling...`);
      const fallbackQuestions = await prisma.assessmentQuestion.findMany({
        where: {
          NOT: { difficulty }
        },
        include: { options: true }
      });

      // Add unique questions until we hit 10
      for (const q of fallbackQuestions) {
        if (selectedQuestions.length >= 10) break;
        if (!selectedQuestions.some((sq) => sq.id === q.id)) {
          selectedQuestions.push(q);
        }
      }
    }

    // Shuffle final list
    const shuffled = selectedQuestions.sort(() => 0.5 - Math.random());
    const finalTen = shuffled.slice(0, 10);

    const formatted = finalTen.map((q) => ({
      id: q.id,
      category: q.category,
      difficulty: q.difficulty,
      question: q.question,
      explanation: q.explanation,
      options: q.options.map((o) => ({
        id: o.id,
        text: o.text,
      })),
    }));

    console.log(`[QuestionsEngine] Serving 10 questions. Target matches: ${targetQuestions.length}`);
    return NextResponse.json(formatted);
  } catch (error: any) {
    console.error('[QuestionsEngine] Failed to retrieve questions:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
