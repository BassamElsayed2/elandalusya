import HeroSub from "@/components/shared/HeroSub";
import PropertiesListing from "@/components/Properties/PropertyList";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Property List | الاندلوسية للعقارات",
};

const page = () => {
  return (
    <>
      <HeroSub
        title_en="Discover inspiring designed homes."
        title_ar="اكتشف المنازل ذات التصميمات الملهمة. تفاصيل العقار"
        description_en="Experience elegance and comfort with our exclusive luxury  villas, designed for sophisticated living."
        description_ar="استمتع بالأناقة والراحة مع فيلاتنا الفاخرة الحصرية المصممة خصيصاً لتوفر لك حياة راقية."
        badge_en="Properties"
        badge_ar="العقارات"
      />
      <PropertiesListing />
    </>
  );
};

export default page;
