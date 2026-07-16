import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function getAdminSession() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('admin_session')?.value;
    if (!sessionToken) return null;

    const dbSession = await prisma.session.findUnique({
      where: { id: sessionToken },
      include: { admin: true },
    });

    if (!dbSession) return null;

    // Check expiry
    if (new Date() > dbSession.expiresAt) {
      try {
        await prisma.session.delete({ where: { id: dbSession.id } });
      } catch (err) {
        // Safe to ignore if already deleted
      }
      return null;
    }

    return {
      id: dbSession.admin.id,
      email: dbSession.admin.email,
      name: dbSession.admin.name,
    };
  } catch (error) {
    console.error('[AuthError] Session validation failed:', error);
    return null;
  }
}
