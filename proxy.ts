import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  if (pathname.startsWith('/orion') && !pathname.startsWith('/orion/login')) {
    const hasSession = req.cookies.getAll().some(c => c.name.startsWith('sb-'))
    if (!hasSession) {
      return NextResponse.redirect(new URL('/orion/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/orion/:path*'],
}
