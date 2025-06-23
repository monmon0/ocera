import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "vi"],

  // Used when no locale matches
  defaultLocale: "en",

  // Never redirect to default locale
  localePrefix: "as-needed",
});

export const config = {
  // Match only internationalized pathnames, exclude API routes and static files
  matcher: [
    // Match all pathnames except for
    // - /api routes
    // - /_next (Next.js internals)
    // - /_static (inside /public)
    // - all root files inside /public (e.g. /favicon.ico)
    "/((?!api|_next|_static|.*\\..*).*)",
  ],
};
