"use client";

import { Icon } from "@iconify/react";
import PropertyCard from "./Card/Card";

import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getPropertie } from "../Services/apiProperties";

const Properties: React.FC = () => {
  const t = useTranslations("Properties");

  const { data: properties } = useQuery({
    queryKey: ["properties"],
    queryFn: getPropertie,
  });

  return (
    <section>
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div className="mb-16 flex flex-col gap-3 ">
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
              {t("properties")}
            </p>
          </div>
          <h2 className="text-[20px] lg:text-[30px] font-medium text-black dark:text-white text-center tracking-tight leading-11 mb-2">
            {t("discoverHomes")}
          </h2>
          <p className="text-[15px] font-normal text-black/50 dark:text-white/50 text-center">
            {t("ComfortUnite")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {properties?.slice(0, 6).map((item, index) => (
            <div key={index} className="">
              <PropertyCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Properties;
