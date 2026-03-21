import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://unpkg.com https://core.sanity-cdn.com",
      "style-src 'self' 'unsafe-inline' https://unpkg.com",
      "img-src 'self' data: blob: https://cdn.sanity.io https://*.basemaps.cartocdn.com https://*.tile.openstreetmap.org",
      "font-src 'self' https://fonts.gstatic.com",
      "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://core.sanity-cdn.com",
      "connect-src 'self' https://cdn.sanity.io https://*.api.sanity.io https://*.sanity.io wss://*.sanity.io https://formspree.io https://*.basemaps.cartocdn.com https://*.tile.openstreetmap.org",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://formspree.io",
      "frame-ancestors 'self'",
    ].join("; "),
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
