import {
  convexAuthNextjsMiddleware,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  const isAuthenticated = await convexAuth.isAuthenticated();
  const url = request.nextUrl.pathname;

  console.log("MIDDLEWARE", { url, isAuthenticated });

  if (!isAuthenticated && url !== "/signin") {
    console.log("Redirecting to /signin");
    return nextjsMiddlewareRedirect(request, "/signin");
  }

  if (isAuthenticated && (url === "/" || url === "/signin")) {
    console.log("Redirecting to /wardrobe");
    return nextjsMiddlewareRedirect(request, "/wardrobe");
  }
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
