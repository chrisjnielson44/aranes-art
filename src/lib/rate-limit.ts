/**
 * Fixed-window counters held in memory. Each server instance keeps its own, so this is a brake on floods from one
 * address rather than an exact global limit; BotID and the honeypot catch most automated traffic first.
 */
const windows = new Map<string, { count: number; resetAt: number }>()

/** Counts one hit against `key` and reports whether it is still within `limit` hits per `windowMs`. */
export function allow(key: string, limit: number, windowMs: number) {
  const now = Date.now()
  if (windows.size > 10_000) {
    for (const [stale, entry] of windows) if (entry.resetAt <= now) windows.delete(stale)
  }
  const entry = windows.get(key)
  if (!entry || entry.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  entry.count += 1
  return entry.count <= limit
}
