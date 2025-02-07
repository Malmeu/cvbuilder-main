import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protection de la route admin
  if (req.nextUrl.pathname.startsWith('/admin')) {
    console.log('Tentative d\'accès à /admin')
    
    if (!session) {
      console.log('Pas de session, redirection vers signin')
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }
    
    // Vérifier si l'utilisateur est admin
    const { data: { user } } = await supabase.auth.getUser()
    console.log('Email utilisateur:', user?.email)
    
    if (!user || user.email !== 'admin@cvdiali.com') {
      console.log('Utilisateur non admin, redirection vers accueil')
      return NextResponse.redirect(new URL('/', req.url))
    }
    
    console.log('Accès admin autorisé')
    return res
  }

  // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
  if (!session && (
    req.nextUrl.pathname.startsWith('/dashboard') ||
    req.nextUrl.pathname.startsWith('/favoris')
  )) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }

  // Si l'utilisateur est connecté et essaie d'accéder aux pages d'auth
  if (session && (
    req.nextUrl.pathname.startsWith('/auth/signin') ||
    req.nextUrl.pathname.startsWith('/auth/signup')
  )) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/favoris/:path*',
    '/auth/signin',
    '/auth/signup',
    '/admin/:path*',
  ],
}
