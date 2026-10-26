import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Country fallback only when the visitor has not expressed a supported language.
// Geo headers are supplied by the hosting provider and may be unavailable locally.
const RUSSIAN_FALLBACK_COUNTRIES = new Set([
  "KZ", "KG", "UZ", "TJ", "TM", "RU", "BY",
]);

function browserSupportsSiteLocale(header: string | null) {
  if (!header) return false;
  return header.split(",").some((part) => {
    const [tag, ...parameters] = part.trim().split(";");
    const quality = parameters.find((value) => value.trim().startsWith("q="));
    const q = quality ? Number(quality.trim().slice(2)) : 1;
    return q > 0 && /^(ru|en)(-|$)/i.test(tag);
  });
}

export default function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // Never override explicit locale URLs or the locale previously chosen by a visitor.
  if (/^\/(ru|en)(\/|$)/.test(path) || request.cookies.has("NEXT_LOCALE")) {
    return intlMiddleware(request);
  }

  const language = request.headers.get("accept-language");
  if (browserSupportsSiteLocale(language)) {
    return intlMiddleware(request);
  }

  const country = (
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    ""
  ).toUpperCase();

  if (!RUSSIAN_FALLBACK_COUNTRIES.has(country)) {
    return intlMiddleware(request);
  }

  // Provide a locale hint to next-intl without changing the visitor's URL
  // or overriding a user-selected locale cookie.
  const headers = new Headers(request.headers);
  headers.set("accept-language", "ru");
  const localizedRequest = new Request(request, { headers }) as NextRequest;
  return intlMiddleware(localizedRequest);
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
