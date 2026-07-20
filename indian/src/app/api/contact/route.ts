import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, region } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const contact = await prisma.contactRequest.create({
      data: {
        name,
        email,
        phone,
        subject: subject || "No Subject",
        message,
        region: region || "in",
      },
    });

    return NextResponse.json({ success: true, contact });
  } catch (error: any) {
    console.error("Failed to save contact request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
