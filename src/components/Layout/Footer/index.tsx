"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { FooterLinks } from "@/app/api/footerlinks";
import { useTranslations, useLocale } from "next-intl";
import ContactModal from "@/components/shared/ContactModal";
import { useContactModal } from "@/hooks/useContactModal";
import { useMainRealtor } from "@/hooks/useMainRealtor";
import { useEffect, useState } from "react";
import { getContacts } from "@/components/Home/Services/apiContacts";
import { Contact } from "@/types/contact";

const Footer = () => {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const { isOpen, openModal, closeModal } = useContactModal();
  const { mainRealtor } = useMainRealtor();
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <footer className="relative z-10 bg-dark">
      <div className="container mx-auto max-w-8xl pt-14 px-4 sm:px-6 lg:px-0">
        <div
          className={`flex lg:items-center justify-between items-end lg:gap-11 pb-14 border-b border-white/10 lg:flex-nowrap flex-wrap gap-6 ${
            isArabic ? "flex-row-reverse" : ""
          }`}
        >
          <p className="text-white text-sm lg:max-w-1/5">
            {t("stayUpdatedWithTheLatestNewsPromotionsAndExclusiveOffers")}
          </p>
          <div
            className={`hidden md:flex lg:flex-row flex-col items-center lg:gap-10 gap-3 ${
              isArabic ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`flex gap-2 lg:order-1 order-2 ${
                isArabic ? "flex-row-reverse" : ""
              }`}
            >
              <input
                type="email"
                placeholder="Enter Your Email"
                className="rounded-full py-4 px-6 bg-white/10 placeholder:text-white text-white focus-visible:outline-0"
              />
              <button className="text-dark bg-white py-4 px-8 font-semibold rounded-full hover:bg-primary hover:text-white duration-300 hover:cursor-pointer">
                {t("subscribe")}
              </button>
            </div>
            <p className="text-white/40 text-sm lg:max-w-[45%] order-1 lg:order-2">
              {t(
                "bySubscribingYouAgreeToReceiveOurPromotionalEmailsYouCanUnsubscribeAtAnyTime"
              )}
            </p>
          </div>
          <div
            className={`flex items-center gap-6 ${
              isArabic ? "flex-row-reverse" : ""
            }`}
          >
            {contacts.length > 0 && contacts[0].twitter_url && (
              <Link
                href={contacts[0].twitter_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  icon="ph:x-logo-bold"
                  width={24}
                  height={24}
                  className="text-white hover:text-primary duration-300"
                />
              </Link>
            )}
            {contacts.length > 0 && contacts[0].facebook_url && (
              <Link
                href={contacts[0].facebook_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  icon="ph:facebook-logo-bold"
                  width={24}
                  height={24}
                  className="text-white hover:text-primary duration-300"
                />
              </Link>
            )}
            {contacts.length > 0 && contacts[0].instagram_url && (
              <Link
                href={contacts[0].instagram_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  icon="ph:instagram-logo-bold"
                  width={24}
                  height={24}
                  className="text-white hover:text-primary duration-300"
                />
              </Link>
            )}
          </div>
        </div>
        <div className="py-16 border-b border-white/10 text-center md:text-start">
          <div className="grid grid-cols-12 sm:gap-10 gap-y-6">
            <div className="md:col-span-7 col-span-12">
              <h2 className="text-white leading-[1.2] text-[30px] font-medium mb-6 lg:max-w-3/4">
                {t("beginYourPathToSuccessContactUsToday")}
              </h2>
              {mainRealtor && (
                <button
                  onClick={openModal}
                  className="bg-primary text-base font-semibold py-4 px-8 rounded-full text-white hover:bg-white hover:text-dark duration-300 hover:cursor-pointer"
                >
                  {t("getInTouch")}
                </button>
              )}
            </div>
            <div className="md:col-span-3 sm:col-span-6 col-span-12 ">
              <div className="flex flex-col gap-4 md:w-fit w-full text-center md:text-start">
                {FooterLinks.slice(0, 4).map((item, index) => (
                  <div key={index}>
                    <Link
                      href={item.href}
                      className="text-white/40 text-xm hover:text-white"
                    >
                      {locale === "ar" && item.labelAr
                        ? item.labelAr
                        : item.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 sm:col-span-6 col-span-12">
              <div className="flex flex-col gap-4 md:w-fit w-full text-center md:text-start ">
                {FooterLinks.slice(4, 8).map((item, index) => (
                  <div key={index}>
                    <Link
                      href={item.href}
                      className="text-white/40 text-xm hover:text-white"
                    >
                      {locale === "ar" && item.labelAr
                        ? item.labelAr
                        : item.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`flex justify-between md:flex-nowrap flex-wrap items-center py-6 gap-6 ${
            isArabic ? "flex-row-reverse" : ""
          }`}
        >
          <p className="text-white/40 text-sm ">
            ©2025 الاندلوسية للعقارات -{" "}
            <Link
              href="https://ens.eg//"
              className="hover:text-primary"
              target="_blanck"
            >
              {t("designedAndDevelopedBy")}
            </Link>
          </p>
          <div
            className={`flex gap-8 items-center ${
              isArabic ? "flex-row-reverse" : ""
            }`}
          >
            <Link href="#" className="text-white/40 hover:text-primary text-sm">
              {t("termsOfService")}
            </Link>
            <Link href="#" className="text-white/40 hover:text-primary text-sm">
              {t("privacyPolicy")}
            </Link>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isOpen}
        onClose={closeModal}
        realtorData={mainRealtor}
      />
    </footer>
  );
};

export default Footer;
