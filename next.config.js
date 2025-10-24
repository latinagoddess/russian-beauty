/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  trailingSlash: true, // <--- SET THIS TO TRUE
  images: {
    unoptimized: true, // Required for static export
  },
  env: {
    NEXT_PUBLIC_RESEND_API_KEY: "re_AadsE7Kq_KayfnTGAwP4ZjQKHVZFNVNtJ",
    NEXT_PUBLIC_EMAIL: "foreignprincess888@gmail.com",
    NEXT_PUBLIC_PHONE_NUMBER: "+1 416-618-9575",
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: "6LcR63QqAAAAABAYbLlmwvWuKmWMi4W7EA7d3Ii1",
    NEXT_PUBLIC_SPAIN_SITE: "http://www.spain-ppr.com/",
    NEXT_PUBLIC_BRAZIL_SITE: "http://the-affiliatessp.com/",
    NEXT_PUBLIC_CERB_SITE: "http://vip-cerb.com/",
    FRONTEND_URL: "https://slavic-goddess.com/"
  }
};

module.exports = nextConfig;
