import React, { FC } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocale } from "next-intl";

interface HeroSubProps {
  title_ar: string;
  title_en: string;
  description_en: string;
  description_ar: string;
  badge_en: string;
  badge_ar: string;
}

const HeroSub: FC<HeroSubProps> = ({
  title_ar,
  title_en,
  description_en,
  description_ar,
  badge_en,
  badge_ar,
}) => {
  const locale = useLocale();

  return (
    <>
      <section className="text-center bg-cover !pt-40 pb-20 relative overflow-x-hidden">
        <div className="flex gap-2.5 items-center justify-center">
          <span>
            <Icon
              icon={"ph:house-simple-fill"}
              width={20}
              height={20}
              className="text-primary"
            />
          </span>
          <p className="text-base font-semibold text-dark/75 dark:text-white/75">
            {locale === "ar" ? badge_ar : badge_en}
          </p>
        </div>
        <h2 className="text-dark text-52 relative font-bold dark:text-white ">
          {locale === "ar" ? title_ar : title_en}
        </h2>
        <p className="text-lg text-dark/50 dark:text-white/50 font-normal w-full mx-auto">
          {locale === "ar" ? description_ar : description_en}
        </p>
      </section>
    </>
  );
};

export default HeroSub;
