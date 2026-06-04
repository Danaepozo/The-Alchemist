// Invite-only access code for Lyra. Change it by setting LYRA_ACCESS_CODE in Netlify env.
export const LYRA_CODE = (process.env.LYRA_ACCESS_CODE || 'alquimia2026').trim().toLowerCase()

export function checkLyraCode(code: unknown): boolean {
  return String(code || '').trim().toLowerCase() === LYRA_CODE
}
