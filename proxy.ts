import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/home',
  '/home/upcoming',
  '/home/previous',
  '/home/recordings',
  '/home/personal-room',
  '/meeting(.*)',
]);

export default clerkMiddleware(async(auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
});

export const config = {
  matcher: [
    // Run middleware on all routes except static files and Next internals
    '/((?!_next|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
};
