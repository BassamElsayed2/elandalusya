import HeroSub from "@/components/shared/HeroSub";
import OfficeSpace from "@/components/Properties/OfficeSpaces";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Property List | الأندلسية للعقارات",
};

const page = () => {
  return (
    <>
      <HeroSub
        title_en="Office Spaces."
        title_ar="Office Spaces."
        description_en="Experience elegance and comfort with our exclusive luxury  villas, designed for sophisticated living."
        description_ar="Experience elegance and comfort with our exclusive luxury  villas, designed for sophisticated living."
        badge_en="Properties"
        badge_ar="Properties"
      />
      <OfficeSpace />
    </>
  );
};

export default page;
