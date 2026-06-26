import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    const registrations = await prisma.courseRegistration.findMany({
      where: { courseId },
      include: {
        course: {
          select: {
            title: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const formattedRegistrations = registrations.map((reg: any) => ({
      id: reg.id,
      name: reg.name,
      email: reg.email,
      phone: reg.phone,
      college: reg.college,
      year: reg.year,
      courseTitle: reg.course.title,
      createdAt: reg.createdAt.toISOString(),
    }));

    return NextResponse.json(formattedRegistrations);
  } catch (error) {
    console.error('Failed to fetch course registrations:', error);
    return NextResponse.json({ error: 'Failed to fetch course registrations' }, { status: 500 });
  }
}
