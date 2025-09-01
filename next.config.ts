import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    domains: ["jytsaziogmmbytstkyvm.supabase.co"], // أضف دومين Supabase هنا
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
