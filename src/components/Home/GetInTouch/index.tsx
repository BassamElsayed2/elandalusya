"use client";

import { useTranslations, useLocale } from "next-intl";
import ContactModal from "@/components/shared/ContactModal";
import { useContactModal } from "@/hooks/useContactModal";
import { useMainRealtor } from "@/hooks/useMainRealtor";

const GetInTouch: React.FC = () => {
  const t = useTranslations("GetInTouch");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const { isOpen, openModal, closeModal } = useContactModal();
  const { mainRealtor } = useMainRealtor();

  return (
    <section>
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div className="relative rounded-t-2xl overflow-hidden">
          <video
            className="w-full h-full absolute top-0 left-0 object-cover -z-10 min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Video background showing luxurious real estate"
          >
            <source
              src="https://videos.pexels.com/video-files/7233782/7233782-hd_1920_1080_25fps.mp4"
              type="video/mp4"
            />
          </video>

          <div className="bg-black/30 lg:py-64 md:py-28 py-10 relative z-10 min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center">
            <div className="flex flex-col items-center gap-8">
              <h2 className="text-white lg:text-52 md:text-40 text-3xl max-w-3/4 text-center font-medium">
                {t(
                  "enterARealmWhereExquisiteDesignAndTimelessLuxuryComeTogether"
                )}
              </h2>
              {mainRealtor && (
                <button
                  onClick={openModal}
                  className="bg-white py-4 px-8 rounded-full text-dark hover:bg-dark hover:text-white duration-300"
                >
                  {t("getInTouch")}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="w-full py-5 bg-primary rounded-b-2xl overflow-hidden">
          <div
            className={`flex items-center gap-40 ${
              isArabic ? "animate-slide-rtl" : "animate-slide"
            }`}
          >
            <p className="text-white whitespace-nowrap relative after:absolute after:w-20 after:h-px after:bg-white after:top-3 after:-right-32">
              {t("getAFreePropertyValuationSellYourHomeWithConfidence")}
            </p>
            <p className="text-white whitespace-nowrap relative after:absolute after:w-20 after:h-px after:bg-white after:top-3 after:-right-32">
              {t("browseThousandsOfListingsInPrimeLocationsAtGreatPrices")}
            </p>
            <p className="text-white whitespace-nowrap relative after:absolute after:w-20 after:h-px after:bg-white after:top-3 after:-right-32">
              {t("getAFreeProperty")}
            </p>
            <p className="text-white whitespace-nowrap relative after:absolute after:w-20 after:h-px after:bg-white after:top-3 after:-right-32">
              {t("browseThousands")}
            </p>
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

export default GetInTouch;
