import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, college, year, courseSlug } = body;

    if (!name || !email || !phone || !college || !year || !courseSlug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if course exists by slug
    const course = await prisma.course.findUnique({
      where: { slug: courseSlug },
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const registration = await prisma.courseRegistration.create({
      data: {
        name,
        email,
        phone,
        college,
        year,
        courseId: course.id,
      },
    });

    return NextResponse.json({ success: true, registration });
  } catch (error) {
    console.error('Failed to create registration:', error);
    return NextResponse.json({ error: 'Failed to create registration' }, { status: 500 });
  }
}
