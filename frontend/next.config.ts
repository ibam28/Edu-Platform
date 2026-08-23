import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_URL ?? "http://localhost:8000";

// SEC-004: baseline security headers applied to every response.
// HSTS is intentionally omitted: the prototype runs on local HTTP, and HSTS
// must only be enabled when the deployment actually uses HTTPS.
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

// Baseline CSP that covers what the app actually uses (self-hosted Next.js
// scripts/styles, same-origin API, inline SVGs, system fonts). Next.js injects
// inline scripts/styles, so script-src/style-src need 'unsafe-inline'. The
// production build avoids 'unsafe-eval'; dev mode needs it for HMR.
const isDev = process.env.NODE_ENV !== "production";
const cspParts = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // Click-jacking protection (complementary to X-Frame-Options: DENY).
  "frame-ancestors 'none'",
];

securityHeaders.push({ key: "Content-Security-Policy", value: cspParts.join("; ") });

const nextConfig: NextConfig = {
  output: "standalone",
  // SEC-012: disable the X-Powered-By fingerprint header.
  poweredByHeader: false,
  allowedDevOrigins: [".monkeycode-ai.live"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
