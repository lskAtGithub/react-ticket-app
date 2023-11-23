import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'

export default authMiddleware({
  async afterAuth(auth, req, evt) {
    if(!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }

    console.log("🚀 ~ file: middleware.ts:10 ~ afterAuth ~ auth.userId:", auth.userId)
  }
})

export const config = {
  // matcher: ['/((?!.+.[\\w]+$|_next).*/', '/', '/(api|trpc)(.*)'],
  matcher: ['/'],
}
