"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openPopup = (index: number = 0) => {
    setCurrentImageIndex(index);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const remainingImages = images.length - 3;

  return (
    <>
      <div className="grid grid-cols-12 mt-8 gap-8">
        {/* Main large image */}
        <div className="lg:col-span-8 col-span-12 row-span-2">
          {images[0] && (
            <div className="cursor-pointer" onClick={() => openPopup(0)}>
              <Image
                src={images[0]}
                alt={`${alt} - Main Image`}
                width={400}
                height={500}
                className="rounded-2xl w-full h-540 object-cover"
                unoptimized={true}
              />
            </div>
          )}
        </div>

        {/* Second image */}
        <div className="lg:col-span-4 lg:block hidden">
          {images[1] && (
            <div className="cursor-pointer h-full" onClick={() => openPopup(1)}>
              <Image
                src={images[1]}
                alt={`${alt} - Image 2`}
                width={400}
                height={500}
                className="rounded-2xl w-full h-260 object-cover"
                unoptimized={true}
              />
            </div>
          )}
        </div>

        {/* Third image */}
        <div className="lg:col-span-2 col-span-6">
          {images[2] && (
            <div
              className="cursor-pointer relative h-full"
              onClick={() => openPopup(images.length > 3 ? 2 : 2)}
            >
              <Image
                src={images[2]}
                alt={`${alt} - Image 3`}
                width={400}
                height={500}
                className="rounded-2xl w-full h-260 object-cover"
                unoptimized={true}
              />
              {/* Overlay for remaining images */}
              {images.length > 3 && (
                <div className="absolute inset-0 bg-black bg-opacity-60 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-2xl font-semibold">
                    +{remainingImages}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Fourth image */}
        <div className="lg:col-span-2 col-span-6">
          {images[3] && images.length <= 3 && (
            <div className="cursor-pointer h-full" onClick={() => openPopup(3)}>
              <Image
                src={images[3]}
                alt={`${alt} - Image 4`}
                width={400}
                height={500}
                className="rounded-2xl w-full h-260 object-cover"
                unoptimized={true}
              />
            </div>
          )}
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl max-h-full p-4">
            {/* Close button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
            >
              <Icon icon="ph:x" width={32} height={32} />
            </button>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
                >
                  <Icon icon="ph:caret-left" width={48} height={48} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
                >
                  <Icon icon="ph:caret-right" width={48} height={48} />
                </button>
              </>
            )}

            {/* Current image */}
            <Image
              src={images[currentImageIndex]}
              alt={`${alt} - Image ${currentImageIndex + 1}`}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain rounded-lg"
              unoptimized={true}
            />

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
