import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { teamName, leaderName, email, phone, college, members, idea, region } = body;

    if (!teamName || !leaderName || !email || !phone || !college) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const registration = await prisma.hackathonRegistration.create({
      data: {
        teamName,
        leaderName,
        email,
        phone,
        college,
        members: members || [],
        idea: idea || "",
        region: region || "in",
      },
    });

    return NextResponse.json({ success: true, registration });
  } catch (error: any) {
    console.error("Failed to save hackathon registration:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
