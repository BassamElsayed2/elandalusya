"use client";

import React from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Icon } from "@iconify/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface RealtorData {
  id: string;
  name: string;
  number: string;
  email: string;
  image: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  realtorData?: RealtorData | null;
}

const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  realtorData,
}) => {
  const locale = useLocale();

  const isArabic = locale === "ar";

  // استخدام بيانات الوسيط العقاري المرسلة أو البيانات الافتراضية
  const contactInfo = realtorData
    ? {
        name: realtorData.name,
        email: realtorData.email,
        phone: realtorData.number,
        whatsapp: realtorData.number,
        image: realtorData.image
          ? realtorData.image.startsWith("http")
            ? realtorData.image
            : `https://jytsaziogmmbytstkyvm.supabase.co/storage/v1/object/public/images/${realtorData.image}`
          : "/images/users/alkesh.jpg",
      }
    : {
        name: isArabic
          ? "أحمد محمد - مستشار عقاري"
          : "Ahmed Mohamed - Real Estate Consultant",
        email: "ahmed@homely.com",
        phone: "+20 123 456 7890",
        whatsapp: "+20 123 456 7890",
        image: "/images/users/alkesh.jpg",
      };

  const handleCall = () => {
    window.open(`tel:${contactInfo.phone}`);
  };

  const handleWhatsApp = () => {
    const message = isArabic
      ? `مرحباً، أنا مهتم بالعقارات المتاحة لديكم`
      : `Hello, I'm interested in your available properties`;
    window.open(
      `https://wa.me/${contactInfo.whatsapp.replace(
        /\s+/g,
        ""
      )}?text=${encodeURIComponent(message)}`
    );
  };

  const handleEmail = () => {
    const subject = isArabic ? "استفسار عن العقارات" : "Property Inquiry";
    const body = isArabic
      ? "مرحباً،\n\nأنا مهتم بالحصول على معلومات إضافية حول العقارات المتاحة لديكم.\n\nشكراً لكم"
      : "Hello,\n\nI am interested in getting more information about your available properties.\n\nThank you";
    window.open(
      `mailto:${contactInfo.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto mx-4">
        <DialogHeader className="text-center">
          <DialogTitle
            className={`text-2xl font-bold text-gray-900 dark:text-white ${
              isArabic ? "text-right" : "text-left"
            }`}
          >
            {isArabic ? "تواصل معنا" : "Contact Us"}
          </DialogTitle>
          <DialogDescription
            className={`text-gray-600 dark:text-gray-300 ${
              isArabic ? "text-right" : "text-left"
            }`}
          >
            {isArabic
              ? "نحن هنا لمساعدتك في العثور على العقار المثالي"
              : "We are here to help you find the perfect property"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-6 py-6">
          {/* صورة الشخص */}
          <div className="relative">
            <Image
              src={contactInfo.image}
              alt={contactInfo.name}
              width={120}
              height={120}
              className="rounded-full border-4 border-primary/20 object-cover"
              unoptimized={true}
            />
            <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
              <Icon icon="ph:phone-fill" className="text-white text-sm" />
            </div>
          </div>

          {/* اسم الشخص */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {contactInfo.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {realtorData
                ? isArabic
                  ? "وسيط عقاري معتمد"
                  : "Certified Real Estate Agent"
                : isArabic
                ? "خبير عقاري معتمد"
                : "Certified Real Estate Expert"}
            </p>
          </div>

          {/* معلومات التواصل */}
          <div className="w-full space-y-4">
            {/* البريد الإلكتروني */}
            <button
              onClick={handleEmail}
              className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
            >
              <div
                className={`flex items-center space-x-3 ${
                  isArabic ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                  <Icon
                    icon="ph:envelope-simple-fill"
                    className="text-blue-600 dark:text-blue-400 text-lg"
                  />
                </div>
                <div className={`${isArabic ? "text-right" : "text-left"}`}>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {isArabic ? "البريد الإلكتروني" : "Email"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {contactInfo.email}
                  </p>
                </div>
              </div>
              <Icon
                icon={isArabic ? "ph:arrow-left" : "ph:arrow-right"}
                className="text-gray-400 group-hover:text-primary transition-colors"
              />
            </button>

            {/* رقم الهاتف */}
            <button
              onClick={handleCall}
              className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
            >
              <div
                className={`flex items-center space-x-3 ${
                  isArabic ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                  <Icon
                    icon="ph:phone-fill"
                    className="text-green-600 dark:text-green-400 text-lg"
                  />
                </div>
                <div className={`${isArabic ? "text-right" : "text-left"}`}>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {isArabic ? "اتصال مباشر" : "Phone Call"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {contactInfo.phone}
                  </p>
                </div>
              </div>
              <Icon
                icon={isArabic ? "ph:arrow-left" : "ph:arrow-right"}
                className="text-gray-400 group-hover:text-primary transition-colors"
              />
            </button>

            {/* واتساب */}
            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors group border border-green-200 dark:border-green-700"
            >
              <div
                className={`flex items-center space-x-3 ${
                  isArabic ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div className="bg-green-500 p-2 rounded-full">
                  <Icon
                    icon="ph:whatsapp-logo-fill"
                    className="text-white text-lg"
                  />
                </div>
                <div className={`${isArabic ? "text-right" : "text-left"}`}>
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    {isArabic ? "واتساب" : "WhatsApp"}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {contactInfo.whatsapp}
                  </p>
                </div>
              </div>
              <Icon
                icon={isArabic ? "ph:arrow-left" : "ph:arrow-right"}
                className="text-green-400 group-hover:text-green-600 transition-colors"
              />
            </button>
          </div>

          {/* ملاحظة إضافية */}
          {/* <div className="w-full bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="flex items-start space-x-3">
              <Icon
                icon="ph:info-fill"
                className="text-blue-600 dark:text-blue-400 text-lg mt-0.5 flex-shrink-0"
              />
              <p
                className={`text-sm text-blue-800 dark:text-blue-200 ${
                  isArabic ? "text-right" : "text-left"
                }`}
              >
                {isArabic
                  ? "متاح للرد على استفساراتكم من السبت إلى الخميس، من 9 صباحاً إلى 6 مساءً"
                  : "Available to answer your inquiries from Saturday to Thursday, 9 AM to 6 PM"}
              </p>
            </div>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
