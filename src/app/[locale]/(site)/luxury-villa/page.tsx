import HeroSub from "@/components/shared/HeroSub";

import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Property List | الاندلوسية للعقارات",
};

const page = () => {
  return (
    <>
      <HeroSub
        title_en="Luxury Villas."
        title_ar="Luxury Villas."
        description_en="Experience elegance and comfort with our exclusive luxury  villas, designed for sophisticated living."
        description_ar="Experience elegance and comfort with our exclusive luxury  villas, designed for sophisticated living."
        badge_en="Properties"
        badge_ar="Properties"
      />
      {/* <LuxuryVillas /> */}
    </>
  );
};

export default page;
