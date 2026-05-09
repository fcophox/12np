import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

export default async function proxy(request: NextRequest) {
  // 1. Primero ejecutamos la actualización de sesión (necesario para Supabase)
  const supabaseResponse = await updateSession(request)
  
  // 2. Creamos un cliente de Supabase para verificar al usuario actual
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // No necesitamos setear aquí porque updateSession ya se encarga
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // 3. Lógica de protección del Dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Si no hay usuario autenticado en Supabase, redirigir al login
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
