import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { z } from 'zod';

const patchStatusSchema = z.object({
  id: z.string().min(1, 'Lead ID is required'),
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'ENROLLED', 'REJECTED']),
});

export async function PATCH(req: Request) {
  try {
    // 1. Authentication & Authorization check
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const rawBody = await req.json();

    // 2. Input Validation via Zod
    const parsed = patchStatusSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.format() }, { status: 400 });
    }

    const { id, status } = parsed.data;

    // 3. Update with Audit fields
    const updated = await prisma.assessmentLead.update({
      where: { id },
      data: { 
        status,
        updatedBy: session.email, // Auditing field
      },
    });

    console.log(`[LeadCRM] Lead ${id} status updated to ${status} by ${session.email}`);
    return NextResponse.json({ success: true, lead: updated });
  } catch (error: any) {
    console.error('[LeadCRM] Failed to update lead status:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
