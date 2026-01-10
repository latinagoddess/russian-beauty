/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: "export",
  trailingSlash: true, // <--- SET THIS TO TRUE
  images: {
    unoptimized: true, // Required for static export
  },
  env: {
    NEXT_PUBLIC_RESEND_API_KEY: "re_chqFsNBC_9S3Grm5U459g94QkiGRw86zq",
    NEXT_PUBLIC_EMAIL: "russialover444@outlook.com",
    NEXT_PUBLIC_PHONE_NUMBER: "+1 416-302-6396", // 1774
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: "6LdQLvUrAAAAAG5884zJPfGX62Ze4_MiJ_QFq1ju",
    NEXT_PUBLIC_SPAIN_SITE: "https://www.spain-ppr.com/",
    NEXT_PUBLIC_BRAZIL_SITE: "https://the-affiliatessp.com/",
    NEXT_PUBLIC_CERB_SITE: "https://vip-cerb.com/",
    FRONTEND_URL: "https://ballerinabarbie.com/"
  }
};

module.exports = nextConfig;
