"use client";
import { Icon } from "@iconify/react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { getFaqs } from "../Services/apiFaqs";
import { Faq } from "@/types/faq";

const FAQ: React.FC = () => {
  const t = useTranslations("FAQs");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await getFaqs();
        setFaqs(data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

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
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : faqs.length > 0 ? (
                <Accordion
                  type="single"
                  defaultValue={faqs[0]?.id}
                  collapsible
                  className="w-full flex flex-col gap-6"
                >
                  {faqs.map((faq, index) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  لا توجد أسئلة شائعة متاحة حالياً
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
