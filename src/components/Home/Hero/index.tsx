"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import SearchFilters, {
  FilterState,
} from "@/components/Properties/PropertyList/SearchFilters";
import ContactModal from "@/components/shared/ContactModal";
import { useContactModal } from "@/hooks/useContactModal";
import { useMainRealtor } from "@/hooks/useMainRealtor";

const Hero: React.FC = () => {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const router = useRouter();
  const isArabic = locale === "ar";
  const { isOpen, openModal, closeModal } = useContactModal();
  const { mainRealtor, isLoading } = useMainRealtor();

  const handleSearch = (filters: FilterState) => {
    // إنشاء query parameters للبحث
    const searchParams = new URLSearchParams();

    if (filters.search) {
      searchParams.set("search", filters.search);
    }
    if (filters.propertyType) {
      searchParams.set("propertyType", filters.propertyType);
    }
    if (filters.operation) {
      searchParams.set("operation", filters.operation);
    }
    if (filters.bedrooms > 0) {
      searchParams.set("bedrooms", filters.bedrooms.toString());
    }
    if (filters.bathrooms > 0) {
      searchParams.set("bathrooms", filters.bathrooms.toString());
    }
    if (filters.priceRange[0] > 0) {
      searchParams.set("minPrice", filters.priceRange[0].toString());
    }
    if (filters.priceRange[1] < 1000000) {
      searchParams.set("maxPrice", filters.priceRange[1].toString());
    }
    if (filters.areaRange[0] > 0) {
      searchParams.set("minArea", filters.areaRange[0].toString());
    }
    if (filters.areaRange[1] < 1000) {
      searchParams.set("maxArea", filters.areaRange[1].toString());
    }

    // التنقل إلى صفحة Properties مع معاملات البحث
    const queryString = searchParams.toString();
    const url = queryString
      ? `/${locale}/properties?${queryString}`
      : `/${locale}/properties`;
    router.push(url);
  };

  const handleReset = () => {
    // إعادة تعيين الفلاتر (لا حاجة للتنقل)
  };

  return (
    <section className="!py-0">
      <div className="relative overflow-hidden bg-gradient-to-b from-skyblue via-lightskyblue dark:via-[#4298b0] to-white/10 dark:to-black/10">
        {/* 🎥 Background Video */}
        <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/hero/poster.jpg" // صورة fallback لو الفيديو مش اشتغل
            className="w-full h-full object-cover"
          >
            <source src="/videos/real-estate.mp4" type="video/mp4" />
            <source src="/videos/real-estate.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* 🌟 Foreground Content */}
        <div className="relative z-10 container max-w-8xl mx-auto px-5 2xl:px-0 pt-32 md:pt-60 md:pb-68">
          <div
            className={` xl:absolute xl:bottom-5 md:relative text-white dark:text-dark  mb-5 text-center md:text-start z-10`}
          >
            <p className="herop text-inherit text-xm font-medium">
              {t("location")}
            </p>
            <h1 className="heroh text-inherit text-6xl sm:text-9xl font-semibold -tracking-wider  mt-4 mb-6">
              {t("heroTitle")}
            </h1>
            <div className="flex flex-col xs:flex-row justify-center md:justify-start gap-4">
              {mainRealtor && (
                <button
                  onClick={openModal}
                  className="herolink px-8 py-4 border border-white dark:border-dark bg-white dark:bg-dark text-dark dark:text-white duration-300 dark:hover:text-dark hover:bg-transparent hover:text-white text-base font-semibold rounded-full hover:cursor-pointer"
                >
                  {t("getInTouch")}
                </button>
              )}
              <Link
                href="/properties"
                className="herolink2 px-8 py-4 border border-white dark:border-dark bg-transparent text-white dark:text-dark hover:bg-white dark:hover:bg-dark dark:hover:text-white hover:text-dark duration-300 text-base font-semibold rounded-full hover:cursor-pointer"
              >
                {t("viewDetails")}
              </Link>
            </div>
          </div>

          {/* Search Filters Section */}
          <div className="relative xl:block hidden z-20  mt-8 md:mt-12 max-w-4xl mx-auto">
            <SearchFilters
              onSearch={handleSearch}
              onReset={handleReset}
              isLoading={false}
            />
          </div>

          {/* Icons and Stats Section */}
          <div
            className={`hidden md:block md:absolute bottom-0 ${
              isArabic ? "md:-left-68 " : "md:-right-68 "
            } bg-white dark:bg-black py-12 px-8 mobile:px-16 ${
              isArabic ? "md:pr-16 md:pl-[295px]" : "md:pl-16 md:pr-[295px]"
            } rounded-2xl md:rounded-none ${
              isArabic ? "md:rounded-tr-2xl" : "md:rounded-tl-2xl"
            } mt-24`}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 md:flex gap-16 md:gap-24 sm:text-center dark:text-white text-black">
              {/* Bedrooms */}
              <div className="flex flex-col sm:items-center gap-3">
                <Image
                  src="/images/hero/sofa.svg"
                  alt="sofa"
                  width={32}
                  height={32}
                  className="block dark:hidden"
                  unoptimized
                />
                <Image
                  src="/images/hero/dark-sofa.svg"
                  alt="sofa"
                  width={32}
                  height={32}
                  className="hidden dark:block"
                  unoptimized
                />
                {/* <p className="herod text-sm sm:text-base font-normal text-inherit">
                  {t("bedrooms")}
                </p> */}
              </div>

              {/* Restrooms */}
              <div className="flex flex-col sm:items-center gap-3">
                <Image
                  src="/images/hero/tube.svg"
                  alt="bath"
                  width={32}
                  height={32}
                  className="block dark:hidden"
                  unoptimized
                />
                <Image
                  src="/images/hero/dark-tube.svg"
                  alt="bath"
                  width={32}
                  height={32}
                  className="hidden dark:block"
                  unoptimized
                />
                {/* <p className="herod text-sm sm:text-base font-normal text-inherit">
                  {t("restrooms")}
                </p> */}
              </div>

              {/* Parking */}
              <div className="flex flex-col sm:items-center gap-3">
                <Image
                  src="/images/hero/parking.svg"
                  alt="parking"
                  width={32}
                  height={32}
                  className="block dark:hidden"
                  unoptimized
                />
                <Image
                  src="/images/hero/dark-parking.svg"
                  alt="parking"
                  width={32}
                  height={32}
                  className="hidden dark:block"
                  unoptimized
                />
                {/* <p className="herod text-sm sm:text-base font-normal text-inherit">
                  {t("parkingSpace")}
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isOpen}
        onClose={closeModal}
        realtorData={mainRealtor}
      />
    </section>
  );
};

export default Hero;
