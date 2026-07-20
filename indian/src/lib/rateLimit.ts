const rateLimitCache = new Map<string, { count: number; expiresAt: number }>();

export function rateLimit(ip: string, limit = 30, windowMs = 60000) {
  const now = Date.now();
  const cached = rateLimitCache.get(ip);

  // Clear expired cache entries periodically to prevent memory leaks
  if (rateLimitCache.size > 1000) {
    for (const [key, value] of rateLimitCache.entries()) {
      if (now > value.expiresAt) {
        rateLimitCache.delete(key);
      }
    }
  }

  if (!cached || now > cached.expiresAt) {
    rateLimitCache.set(ip, { count: 1, expiresAt: now + windowMs });
    return { success: true };
  }

  if (cached.count >= limit) {
    return { success: false, expiresAt: cached.expiresAt };
  }

  cached.count += 1;
  return { success: true };
}
