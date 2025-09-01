"use client";
import * as React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useTranslations, useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getTestemonial } from "../Services/apiTestimonial";

const Testimonial = () => {
  const t = useTranslations("Testimonial");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

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

  const {
    data: testimonial,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["testimonial"],
    queryFn: getTestemonial,
  });

  if (isLoading) {
    return (
      <section className="bg-dark relative overflow-hidden" id="testimonial">
        <div className="container max-w-8xl mx-auto px-5 2xl:px-0 py-20">
          <div className="flex items-center justify-center">
            <div className="text-white text-lg">{t("loading")}</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-dark relative overflow-hidden" id="testimonial">
        <div className="container max-w-8xl mx-auto px-5 2xl:px-0 py-20">
          <div className="flex items-center justify-center">
            <div className="text-white text-lg">{t("error")}</div>
          </div>
        </div>
      </section>
    );
  }

  if (!testimonial || testimonial.length === 0) {
    return (
      <section className="bg-dark relative overflow-hidden" id="testimonial">
        <div className="container max-w-8xl mx-auto px-5 2xl:px-0 py-20">
          <div className="flex items-center justify-center">
            <div className="text-white text-lg">{t("noTestimonials")}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-dark relative overflow-hidden" id="testimonial">
      <div className={`absolute ${isArabic ? "left-0" : "right-0"}`}>
        <Image
          src="/images/testimonial/Vector.png"
          alt="victor"
          width={700}
          height={1039}
          unoptimized={true}
        />
      </div>
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div>
          <p className="text-white text-base font-semibold flex gap-2">
            <Icon
              icon="ph:house-simple-fill"
              className="text-2xl text-primary"
            />
            {t("testimonials")}
          </p>
          <h2 className="lg:text-[30px] text-[20px] font-medium text-white">
            {t("whatOurClientsSay")}
          </h2>
        </div>
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {testimonial?.map((item, index) => (
              <CarouselItem key={item.id || index} className="mt-9">
                <div
                  className={`lg:flex items-center gap-11 ${
                    isArabic ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex items-start gap-11 ${
                      isArabic ? "lg:pl-20" : "lg:pr-20"
                    }`}
                  >
                    <div>
                      <Icon
                        icon="ph:house-simple"
                        width={32}
                        height={32}
                        className="text-primary"
                      />
                    </div>
                    <div>
                      <h4 className="text-white lg:text-[20px] text-[15px]">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: isArabic
                              ? item.message_ar
                              : item.message_en,
                          }}
                        />
                      </h4>
                      <div
                        className={`flex items-center mt-8 gap-6 ${
                          isArabic ? "flex-row-reverse" : ""
                        }`}
                      >
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={isArabic ? item.name_ar : item.name_en}
                            width={80}
                            height={80}
                            className="rounded-full lg:hidden block"
                            unoptimized={true}
                          />
                        )}
                        <div>
                          <h6 className="text-white text-xm font-medium">
                            {isArabic ? item.name_ar : item.name_en}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={isArabic ? item.name_ar : item.name_en}
                        width={440}
                        height={440}
                        className="lg:block hidden"
                        unoptimized={true}
                      />
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2.5 p-2.5 bg-white/20 rounded-full">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2.5 h-2.5 rounded-full ${
                current === index + 1 ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
