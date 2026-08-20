import { NextResponse } from "next/server";
import { getAdminSession } from "@in/lib/auth";
import { prisma } from "@in/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const contacts = await prisma.contactRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Failed to fetch contact requests:', error);
    return NextResponse.json({ error: 'Failed to fetch contact requests' }, { status: 500 });
  }
}
