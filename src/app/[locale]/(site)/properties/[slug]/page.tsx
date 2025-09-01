"use client";
import React from "react";

import { useParams } from "next/navigation";
import { Icon } from "@iconify/react";

import Image from "next/image";
import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getPropertyById } from "@/components/Home/Services/apiProperties";
import ContactModal from "@/components/shared/ContactModal";
import { useContactModal } from "@/hooks/useContactModal";

export default function Details() {
  const { slug } = useParams();
  const locale = useLocale();
  const { isOpen, openModal, closeModal } = useContactModal();

  // const item = propertyHomes.find((item) => item.slug === slug);

  const { data: properite } = useQuery({
    queryKey: ["properite", slug],
    queryFn: () => {
      if (!slug) throw new Error("No ID provided");
      return getPropertyById(slug as string);
    },
    enabled: !!slug,
  });

  return (
    <section className="!pt-44 pb-20 relative">
      <div className="container mx-auto max-w-8xl px-5 2xl:px-0">
        <div className="grid grid-cols-12 items-end gap-6">
          <div className="lg:col-span-8 col-span-12">
            <h1 className="lg:text-52 text-40 font-semibold text-dark dark:text-white">
              {locale === "ar" ? properite?.name_ar : properite?.name_en}
            </h1>
            <div className="flex gap-2.5">
              <Icon
                icon="ph:map-pin"
                width={24}
                height={24}
                className="text-dark/50 dark:text-white/50"
              />
              <p className="text-dark/50 dark:text-white/50 text-xm">
                {locale === "ar"
                  ? properite?.address_ar
                  : properite?.address_en}
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 col-span-12">
            <div className="flex">
              <div className="flex flex-col  gap-2 border-e border-black/10 dark:border-white/20 px-2 xs:pr-4 mobile:pr-8">
                <Icon icon={"solar:bed-linear"} width={20} height={20} />
                <p className="text-sm mobile:text-base font-normal text-black dark:text-white">
                  {properite?.bedrooms}{" "}
                  {locale === "ar" ? "غرف النوم" : "Bedrooms"}
                </p>
              </div>
              <div className="flex flex-col gap-2 border-e border-black/10 dark:border-white/20 px-2 xs:px-4 mobile:px-8">
                <Icon icon={"solar:bath-linear"} width={20} height={20} />
                <p className="text-sm mobile:text-base font-normal text-black dark:text-white">
                  {properite?.bathrooms}{" "}
                  {locale === "ar" ? " الحمامات" : "Bathrooms"}
                </p>
              </div>
              <div className="flex flex-col gap-2 px-2 xs:pl-4 mobile:pl-8">
                <Icon
                  icon={"lineicons:arrow-all-direction"}
                  width={20}
                  height={20}
                />
                <p className="text-sm mobile:text-base font-normal text-black dark:text-white">
                  {properite?.area}m<sup>2</sup>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-8 gap-8">
          <div className="lg:col-span-8 col-span-12 row-span-2">
            {properite?.images && properite?.images[0] && (
              <div className="">
                <Image
                  src={properite.images[0]}
                  alt="Main Property Image"
                  width={400}
                  height={500}
                  className="rounded-2xl w-full h-540"
                  unoptimized={true}
                />
              </div>
            )}
          </div>
          <div className="lg:col-span-4 lg:block hidden">
            {properite?.images && properite?.images[1] && (
              <Image
                src={properite.images[1]}
                alt="Property Image 2"
                width={400}
                height={500}
                className="rounded-2xl w-full h-full"
                unoptimized={true}
              />
            )}
          </div>
          <div className="lg:col-span-2 col-span-6">
            {properite?.images && properite?.images[2] && (
              <Image
                src={properite.images[2]}
                alt="Property Image 3"
                width={400}
                height={500}
                className="rounded-2xl w-full h-full"
                unoptimized={true}
              />
            )}
          </div>
          <div className="lg:col-span-2 col-span-6">
            {properite?.images && properite?.images[3] && (
              <Image
                src={properite.images[3]}
                alt="Property Image 4"
                width={400}
                height={500}
                className="rounded-2xl w-full h-full"
                unoptimized={true}
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-8 mt-10">
          <div className="lg:col-span-8 col-span-12">
            <h3 className="text-3xl font-medium mb-10">
              {locale === "ar" ? "تفاصيل العقار" : "Property details"}
            </h3>
            {/* <div className="py-8 my-8 border-y border-dark/10 dark:border-white/20 flex flex-col gap-8">
              <div className="flex items-center gap-6">
                <div>
                  <Image
                    src="/images/SVGs/property-details.svg"
                    width={400}
                    height={500}
                    alt=""
                    className="w-8 h-8 dark:hidden"
                    unoptimized={true}
                  />
                  <Image
                    src="/images/SVGs/property-details-white.svg"
                    width={400}
                    height={500}
                    alt=""
                    className="w-8 h-8 dark:block hidden"
                    unoptimized={true}
                  />
                </div>
                <div>
                  <h3 className="text-dark dark:text-white text-xm">
                    Property details
                  </h3>
                  <p className="text-base text-dark/50 dark:text-white/50">
                    One of the few homes in the area with a private pool.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <Image
                    src="/images/SVGs/smart-home-access.svg"
                    width={400}
                    height={500}
                    alt=""
                    className="w-8 h-8 dark:hidden"
                    unoptimized={true}
                  />
                  <Image
                    src="/images/SVGs/smart-home-access-white.svg"
                    width={400}
                    height={500}
                    alt=""
                    className="w-8 h-8 dark:block hidden"
                    unoptimized={true}
                  />
                </div>
                <div>
                  <h3 className="text-dark dark:text-white text-xm">
                    Smart home access
                  </h3>
                  <p className="text-base text-dark/50 dark:text-white/50">
                    Easily check yourself in with a modern keypad system.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <Image
                    src="/images/SVGs/energyefficient.svg"
                    width={400}
                    height={500}
                    alt=""
                    className="w-8 h-8 dark:hidden"
                    unoptimized={true}
                  />
                  <Image
                    src="/images/SVGs/energyefficient-white.svg"
                    width={400}
                    height={500}
                    alt=""
                    className="w-8 h-8 dark:block hidden"
                    unoptimized={true}
                  />
                </div>
                <div>
                  <h3 className="text-dark dark:text-white text-xm">
                    Energy efficient
                  </h3>
                  <p className="text-base text-dark/50 dark:text-white/50">
                    Built in 2025 with sustainable and smart-home features.
                  </p>
                </div>
              </div>
            </div> */}
            <div className="flex flex-col gap-5 ">
              <h4>
                <div
                  className="force-font"
                  dangerouslySetInnerHTML={{
                    __html:
                      locale === "en"
                        ? properite?.details_en
                        : properite?.details_ar,
                  }}
                />
              </h4>
            </div>

            <iframe
              src={
                "https://www.google.com/maps?q=30.789214751799687, 30.990236173645165&z=15&output=embed"
              }
              width="1114"
              height="400"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl w-full"
            ></iframe>
          </div>
          <div className="lg:col-span-4 col-span-12">
            <div className="bg-primary/10 p-8 rounded-2xl relative z-10 overflow-hidden">
              <h4 className="text-dark text-3xl font-medium dark:text-white">
                {properite?.price}
              </h4>
              <p className="text-sm text-dark/50 dark:text-white">
                {locale === "ar" ? "السعر" : "Price"}
              </p>
              <button
                onClick={openModal}
                className="py-4 px-8 bg-primary text-white rounded-full w-full block text-center hover:bg-dark duration-300 text-base mt-8 hover:cursor-pointer"
              >
                {locale === "ar" ? "تواصل معنا" : "Get in touch"}
              </button>
              <div className="absolute right-0 top-4 -z-[1]">
                <Image
                  src="/images/properties/vector.svg"
                  width={400}
                  height={500}
                  alt="vector"
                  unoptimized={true}
                />
              </div>
            </div>
            {/* {testimonials.slice(0, 1).map((item, index) => (
              <div
                key={index}
                className="border p-10 rounded-2xl border-dark/10 dark:border-white/20 mt-10 flex flex-col gap-6"
              >
                <Icon
                  icon="ph:house-simple"
                  width={44}
                  height={44}
                  className="text-primary"
                />
                <p className="text-xm text-dark dark:text-white">
                  {locale === "ar" && item.reviewAr
                    ? item.reviewAr
                    : item.review}
                </p>
                <div className="flex items-center gap-6">
                  <Image
                    src={item.image}
                    alt={
                      locale === "ar" && item.nameAr ? item.nameAr : item.name
                    }
                    width={400}
                    height={500}
                    className="w-20 h-20 rounded-2xl"
                    unoptimized={true}
                  />
                  <div className="">
                    <h3 className="text-xm text-dark dark:text-white">
                      {locale === "ar" && item.nameAr ? item.nameAr : item.name}
                    </h3>
                    <h4 className="text-base text-dark/50 dark:text-white/50">
                      {locale === "ar" && item.positionAr
                        ? item.positionAr
                        : item.position}
                    </h4>
                  </div>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isOpen}
        onClose={closeModal}
        realtorData={properite?.realtor_id}
      />
    </section>
  );
}
