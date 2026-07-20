import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, region } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email: email.toLowerCase().trim(),
        region: region || "in",
      },
    });

    return NextResponse.json({ success: true, subscriber });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Email is already subscribed" }, { status: 400 });
    }
    console.error("Failed to subscribe to newsletter:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
