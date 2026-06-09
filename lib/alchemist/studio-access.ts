// Private access code for the Studio (Bella + Dr. private records inbox).
// Change it by setting STUDIO_ACCESS_CODE in Netlify env. Falls back to the Lyra code area only if unset.
export const STUDIO_CODE = (process.env.STUDIO_ACCESS_CODE || 'alchemized2026').trim().toLowerCase()

export function checkStudioCode(code: unknown): boolean {
  return String(code || '').trim().toLowerCase() === STUDIO_CODE
}
