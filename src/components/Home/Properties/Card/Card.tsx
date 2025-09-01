import { PropertyHomes } from "@/types/properyHomes";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

const PropertyCard: React.FC<{ item: PropertyHomes }> = ({ item }) => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const mainImage = item?.images[0];

  return (
    <div>
      <div className="relative rounded-2xl border border-dark/10 dark:border-white/10 group hover:shadow-3xl duration-300 dark:hover:shadow-white/20">
        <div className="overflow-hidden rounded-t-2xl">
          <Link href={`/properties/${item.id}`}>
            {mainImage && (
              <div className="relative w-full h-[300px] overflow-hidden rounded-t-2xl">
                <Image
                  src={mainImage}
                  alt={item.name_en}
                  width={440}
                  height={300}
                  className="w-full h-full object-cover rounded-t-2xl group-hover:brightness-50 group-hover:scale-125 transition duration-300 delay-75"
                  unoptimized={true}
                />
              </div>
            )}
          </Link>
          <div
            className={`absolute top-6 ${
              isArabic ? "left-6" : "right-6"
            } p-4 bg-white rounded-full hidden group-hover:block`}
          >
            <Icon
              icon={
                isArabic
                  ? "solar:arrow-left-linear"
                  : "solar:arrow-right-linear"
              }
              width={24}
              height={24}
              className="text-black"
            />
          </div>
        </div>
        <div className="p-6">
          <div
            className={`flex flex-col mobile:flex-row gap-5 mobile:gap-0 justify-between mb-6 ${
              isArabic ? "flex-row-reverse" : ""
            }`}
          >
            <div>
              <Link href={`/properties/${item.id}`}>
                <h3 className="text-xl font-medium text-black dark:text-white duration-300 group-hover:text-primary">
                  {locale === "ar" ? item.name_ar : item.name_en}
                </h3>
              </Link>
              <p className="text-base font-normal text-black/50 dark:text-white/50">
                {locale === "ar" ? item.address_ar : item.address_en}
              </p>
            </div>
            <div>
              <button className="text-base font-normal text-primary px-5 py-2 rounded-full bg-primary/10">
                {item.price} {locale === "ar" ? "ج.م" : "EG"}
              </button>
            </div>
          </div>
          <div className={`flex ${isArabic ? "flex-row-reverse" : ""}`}>
            <div
              className={`flex flex-col gap-2 items-center ${
                isArabic
                  ? "border-s border-black/10 dark:border-white/20 px-2 xs:px-4 mobile:px-8"
                  : "border-e border-black/10 dark:border-white/20 pr-2 xs:pr-4 mobile:pr-8"
              }`}
            >
              <Icon icon={"solar:bed-linear"} width={20} height={20} />
              <p className="text-sm mobile:text-base font-normal text-black dark:text-white text-center">
                {item.bedrooms} {locale === "ar" ? "غرف نوم" : "Bedrooms"}
              </p>
            </div>
            <div
              className={`flex flex-col gap-2 items-center ${
                isArabic
                  ? "border-s border-black/10 dark:border-white/20 px-2 xs:px-4 mobile:px-8"
                  : "border-e border-black/10 dark:border-white/20 px-2 xs:px-4 mobile:px-8"
              }`}
            >
              <Icon icon={"solar:bath-linear"} width={20} height={20} />
              <p className="text-sm mobile:text-base font-normal text-black dark:text-white text-center">
                {item.bathrooms} {locale === "ar" ? "حمامات" : "Bathrooms"}
              </p>
            </div>
            <div
              className={`flex flex-col gap-2 items-center  ${
                isArabic
                  ? "px-2 xs:px-4 mobile:px-8"
                  : "pl-2 xs:pl-4 mobile:pl-8"
              }`}
            >
              <Icon
                icon={"lineicons:arrow-all-direction"}
                width={20}
                height={20}
              />
              <p className="text-sm mobile:text-base font-normal text-black dark:text-white text-center">
                {item.area}m<sup>2</sup>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
