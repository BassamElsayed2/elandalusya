"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { Icon } from "@iconify/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useTranslations, useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getSpecialProperty } from "../Services/apiProperties";

const FeaturedProperty: React.FC = () => {
  const t = useTranslations("FeaturedProperty");
  const locale = useLocale();
  const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleDotClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  const { data: properties } = useQuery({
    queryKey: ["special-property"],
    queryFn: getSpecialProperty,
  });

  return (
    <section>
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div
          className={`grid lg:grid-cols-2 gap-10 
           `}
        >
          <div className={`relative `}>
            <Carousel
              setApi={setApi}
              opts={{
                loop: true,
                direction: locale === "ar" ? "rtl" : "ltr",
              }}
            >
              <CarouselContent>
                {properties?.images.map((item, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={item}
                      alt={item}
                      width={680}
                      height={530}
                      className="rounded-2xl w-full h-540"
                      unoptimized={true}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div
              className={`absolute left-2/5 bg-dark/50 rounded-full py-2.5 bottom-10 flex justify-center mt-4 gap-2.5 px-2.5`}
            >
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    current === index + 1 ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className={`flex flex-col gap-10 `}>
            <div>
              <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2">
                <Icon
                  icon="ph:house-simple-fill"
                  className="text-2xl text-primary "
                />
                {t("featuredProperty")}
              </p>
              <h2 className="lg:text-[30px] text-[20px] font-medium text-dark dark:text-white">
                {locale === "ar" ? properties?.name_ar : properties?.name_en}
              </h2>
              <div className="flex items-center gap-2.5">
                <Icon
                  icon="ph:map-pin"
                  width={28}
                  height={26}
                  className="text-dark/50 dark:text-white/50"
                />
                <p className="text-dark/50 dark:text-white/50 text-base">
                  {locale === "ar"
                    ? properties?.address_ar
                    : properties?.address_en}
                </p>
              </div>
            </div>

            <div
              className="text-base text-dark/50 dark:text-white/50 force-font"
              dangerouslySetInnerHTML={{
                __html:
                  (locale === "en"
                    ? properties?.details_en
                    : properties?.details_ar
                  )
                    ?.split(" ")
                    .slice(0, 40)
                    .join(" ") + "...",
              }}
            ></div>

            <div className="grid grid-cols-2 gap-10">
              <div className="flex items-center gap-4">
                <div className="bg-dark/5 dark:bg-white/5 p-2.5 rounded-[6px]">
                  <Image
                    src={"/images/hero/sofa.svg"}
                    alt="sofa"
                    width={24}
                    height={24}
                    className="block dark:hidden"
                    unoptimized={true}
                  />
                  <Image
                    src={"/images/hero/dark-sofa.svg"}
                    alt="sofa"
                    width={24}
                    height={24}
                    className="hidden dark:block"
                    unoptimized={true}
                  />
                </div>
                <h6 className="">
                  {properties?.bedrooms}{" "}
                  {locale === "ar" ? "غرف نوم" : "Bedrooms"}
                </h6>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-dark/5 dark:bg-white/5 p-2.5 rounded-[6px]">
                  <Image
                    src={"/images/hero/tube.svg"}
                    alt="tube"
                    width={24}
                    height={24}
                    className="block dark:hidden"
                    unoptimized={true}
                  />
                  <Image
                    src={"/images/hero/dark-tube.svg"}
                    alt="tube"
                    width={24}
                    height={24}
                    className="hidden dark:block"
                    unoptimized={true}
                  />
                </div>
                <h6 className="">
                  {properties?.bathrooms}{" "}
                  {locale === "ar" ? "حمامات" : "Bathrooms"}
                </h6>
              </div>
            </div>
            <div className={`flex gap-10 `}>
              <Link
                href={`/${locale}/properties/${properties?.id}`}
                className="py-4 px-8 bg-primary hover:bg-dark duration-300 rounded-full text-white"
              >
                {locale === "ar" ? "تفاصيل" : "Details"}
              </Link>
              <div>
                <h4 className="text-3xl text-dark dark:text-white font-medium">
                  {properties?.price} {locale === "ar" ? "ج.م" : "EG"}
                </h4>
                <p className="text-base text-dark/50">
                  {locale === "ar" ? "سعر" : "Price"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperty;
