"use client";

import PropertyCard from "@/components/Home/Properties/Card/Card";
import SearchFilters, { FilterState } from "./SearchFilters";
import { useQuery } from "@tanstack/react-query";
import { getPropertie } from "@/components/Home/Services/apiProperties";
import { useState, useMemo, useEffect } from "react";
import { PropertyHomes } from "@/types/properyHomes";
import { Icon } from "@iconify/react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

const PropertiesListing: React.FC = () => {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: getPropertie,
  });

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    propertyType: "",
    priceRange: [0, 1000000],
    bedrooms: 0,
    bathrooms: 0,
    areaRange: [0, 1000],
    operation: "",
  });

  // تطبيق معاملات البحث من URL عند تحميل الصفحة
  useEffect(() => {
    const newFilters: FilterState = {
      search: searchParams.get("search") || "",
      propertyType: searchParams.get("propertyType") || "",
      priceRange: [
        parseInt(searchParams.get("minPrice") || "0"),
        parseInt(searchParams.get("maxPrice") || "1000000"),
      ],
      bedrooms: parseInt(searchParams.get("bedrooms") || "0"),
      bathrooms: parseInt(searchParams.get("bathrooms") || "0"),
      areaRange: [
        parseInt(searchParams.get("minArea") || "0"),
        parseInt(searchParams.get("maxArea") || "1000"),
      ],
      operation: searchParams.get("operation") || "",
    };

    setFilters(newFilters);
  }, [searchParams]);

  // Filter properties based on search criteria
  const filteredProperties = useMemo(() => {
    if (!properties) return [];

    return properties.filter((property: PropertyHomes) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const nameEn = property.name_en.toLowerCase();
        const nameAr = property.name_ar.toLowerCase();
        const addressEn = property.address_en.toLowerCase();
        const addressAr = property.address_ar.toLowerCase();

        if (
          !nameEn.includes(searchLower) &&
          !nameAr.includes(searchLower) &&
          !addressEn.includes(searchLower) &&
          !addressAr.includes(searchLower)
        ) {
          return false;
        }
      }

      // Property type filter
      if (filters.propertyType && property.type !== filters.propertyType) {
        return false;
      }

      // Operation filter
      if (filters.operation && property.operation !== filters.operation) {
        return false;
      }

      // Bedrooms filter
      if (filters.bedrooms > 0 && property.bedrooms < filters.bedrooms) {
        return false;
      }

      // Bathrooms filter
      if (filters.bathrooms > 0 && property.bathrooms < filters.bathrooms) {
        return false;
      }

      // Price range filter
      if (
        property.price < filters.priceRange[0] ||
        property.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Area range filter
      if (
        property.area < filters.areaRange[0] ||
        property.area > filters.areaRange[1]
      ) {
        return false;
      }

      return true;
    });
  }, [properties, filters]);

  const handleSearch = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters({
      search: "",
      propertyType: "",
      priceRange: [0, 1000000],
      bedrooms: 0,
      bathrooms: 0,
      areaRange: [0, 1000],
      operation: "",
    });
  };

  return (
    <section className="pt-0!">
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        {/* Search and Filters */}
        <SearchFilters
          onSearch={handleSearch}
          onReset={handleReset}
          isLoading={isLoading}
          initialFilters={filters}
        />

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredProperties.length}{" "}
            {filteredProperties.length === 1
              ? locale === "ar"
                ? "عقار"
                : "property"
              : locale === "ar"
              ? "عقارات"
              : "properties"}{" "}
            {locale === "ar" ? "تم العثور عليها" : "found"}
          </p>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {filteredProperties.map((item, index) => (
              <div key={index} className="">
                <PropertyCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 dark:text-gray-600 mb-4">
              <Icon
                icon="ph:house-simple"
                width={64}
                height={64}
                className="mx-auto"
              />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              {locale === "ar"
                ? "لم يتم العثور على عقارات"
                : "No properties found"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {locale === "ar"
                ? "جرب تعديل معايير البحث أو الفلاتر"
                : "Try adjusting your search criteria or filters"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesListing;
