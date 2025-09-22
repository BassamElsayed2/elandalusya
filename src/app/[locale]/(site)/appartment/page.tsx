import HeroSub from "@/components/shared/HeroSub";
import Appartment from "@/components/Properties/Appartment";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Property List | الأندلسية للعقارات",
};

const page = () => {
  return (
    <>
      <HeroSub
        title_en="Apartments."
        title_ar="Apartments."
        description_en="Experience elegance and comfort with our exclusive luxury  villas, designed for sophisticated living."
        description_ar="Experience elegance and comfort with our exclusive luxury  villas, designed for sophisticated living."
        badge_en="Properties"
        badge_ar="Properties"
      />
      <Appartment />
    </>
  );
};

export default page;
