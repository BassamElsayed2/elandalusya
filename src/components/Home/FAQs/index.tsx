import { Icon } from "@iconify/react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations, useLocale } from "next-intl";

const FAQ: React.FC = () => {
  const t = useTranslations("FAQs");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section id="faqs">
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div
          className={`grid lg:grid-cols-2 gap-10 ${
            isArabic ? "lg:grid-cols-2" : ""
          }`}
        >
          <div className={`lg:mx-0 mx-auto ${isArabic ? "lg:order-2" : ""}`}>
            <Image
              src="/images/faqs/faq-image.png"
              alt="image"
              width={680}
              height={644}
              className="lg:w-full"
              unoptimized={true}
            />
          </div>
          <div className={`lg:px-12 ${isArabic ? "lg:order-1" : ""}`}>
            <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2">
              <Icon
                icon="ph:house-simple-fill"
                className="text-2xl text-primary "
              />
              {t("faqs")}
            </p>
            <h2 className="lg:text-[30px] text-[20px] leading-[1.2] font-medium text-dark dark:text-white">
              {t("everything")}
            </h2>
            <p
              className={`text-dark/50 dark:text-white/50 text-[15px] ${
                isArabic ? "pl-20" : "pr-20"
              }`}
            >
              {t(
                "weKnowThatBuyingSellingOrInvestingInRealEstateCanBeOverwhelmingHereAreSomeFrequentlyAskedQuestionsToHelpGuideYouThroughTheProcess"
              )}
            </p>
            <div className="my-8">
              <Accordion
                type="single"
                defaultValue="item-1"
                collapsible
                className="w-full flex flex-col gap-6"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>{t("canIPersonalize")}</AccordionTrigger>
                  <AccordionContent>{t("discoverADiverse")}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>{t("whereCan")}</AccordionTrigger>
                  <AccordionContent>{t("discoverADiverse")}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>{t("whatSteps")}</AccordionTrigger>
                  <AccordionContent>{t("discoverADiverse")}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
