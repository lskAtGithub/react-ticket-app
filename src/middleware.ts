import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import { request } from './app/utils/request'

export default authMiddleware({
  async afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }

    request('/user', {
      method: 'POST',
      body: JSON.stringify({
        userId: auth.userId,
      }),
    })
  },
})

export const config = {
  // matcher: ['/((?!.+.[\\w]+$|_next).*/', '/', '/(api|trpc)(.*)'],
  matcher: ['/'],
}
