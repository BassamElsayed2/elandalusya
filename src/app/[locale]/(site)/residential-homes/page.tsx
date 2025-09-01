import HeroSub from "@/components/shared/HeroSub";
import ResidentialList from "@/components/Properties/Residential";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Property List | Homely",
};

const page = () => {
  return (
    <>
      <HeroSub
        title_en="Residential Homes."
        title_ar="Residential Homes."
        description_en="Experience elegance and comfort with our exclusive luxury  villas, designed for sophisticated living."
        description_ar="Experience elegance and comfort with our exclusive luxury  villas, designed for sophisticated living."
        badge_en="Properties"
        badge_ar="Properties"
      />
      <ResidentialList />
    </>
  );
};

export default page;
