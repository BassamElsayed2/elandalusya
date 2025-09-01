"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";

interface SearchFiltersProps {
  onSearch: (filters: FilterState) => void;
  onReset: () => void;
  isLoading?: boolean;
  initialFilters?: FilterState;
}

export interface FilterState {
  search: string;
  propertyType: string;
  priceRange: [number, number];
  bedrooms: number;
  bathrooms: number;
  areaRange: [number, number];
  operation: string;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearch,
  onReset,
  isLoading = false,
  initialFilters,
}) => {
  const locale = useLocale();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    propertyType: "",
    priceRange: [0, 1000000],
    bedrooms: 0,
    bathrooms: 0,
    areaRange: [0, 1000],
    operation: "",
  });

  // تطبيق الفلاتر الأولية عند تغيير initialFilters
  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  const propertyTypes = [
    { value: "apartment", label_en: "Apartment", label_ar: "شقة" },
    { value: "villa", label_en: "Villa", label_ar: "فيلا" },
    { value: "house", label_en: "House", label_ar: "منزل" },
    { value: "office", label_en: "Office", label_ar: "مكتب" },
  ];

  const operations = [
    { value: "sale", label_en: "For Sale", label_ar: "للبيع" },
    { value: "rent", label_en: "For Rent", label_ar: "للإيجار" },
  ];

  const handleFilterChange = (key: keyof FilterState, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      search: "",
      propertyType: "",
      priceRange: [0, 1000000] as [number, number],
      bedrooms: 0,
      bathrooms: 0,
      areaRange: [0, 1000] as [number, number],
      operation: "",
    };
    setFilters(resetFilters);
    onReset();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 mb-8 backdrop-blur-md">
      {/* Main Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative group">
          <Icon
            icon="ph:magnifying-glass"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors duration-200"
            width={20}
            height={20}
          />
          <input
            type="text"
            placeholder={
              locale === "ar"
                ? "البحث عن موقع أو عنوان..."
                : "Search by location or address..."
            }
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full pl-12 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 group-hover:border-gray-300 dark:group-hover:border-gray-600"
          />
        </div>

        <Button
          onClick={handleSearch}
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Icon
              icon="ph:spinner"
              className="animate-spin"
              width={20}
              height={20}
            />
          ) : (
            <Icon icon="ph:magnifying-glass" width={20} height={20} />
          )}
          {isLoading
            ? locale === "ar"
              ? "جاري البحث..."
              : "Searching..."
            : locale === "ar"
            ? "بحث"
            : "Search"}
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={filters.propertyType}
          onChange={(e) => handleFilterChange("propertyType", e.target.value)}
          className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
        >
          <option value="">
            {locale === "ar" ? "نوع العقار" : "Property Type"}
          </option>
          {propertyTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {locale === "ar" ? type.label_ar : type.label_en}
            </option>
          ))}
        </select>

        <select
          value={filters.operation}
          onChange={(e) => handleFilterChange("operation", e.target.value)}
          className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
        >
          <option value="">{locale === "ar" ? "العملية" : "Operation"}</option>
          {operations.map((op) => (
            <option key={op.value} value={op.value}>
              {locale === "ar" ? op.label_ar : op.label_en}
            </option>
          ))}
        </select>

        <select
          value={filters.bedrooms}
          onChange={(e) =>
            handleFilterChange("bedrooms", parseInt(e.target.value))
          }
          className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
        >
          <option value={0}>
            {locale === "ar" ? "غرف النوم" : "Bedrooms"}
          </option>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <option key={num} value={num}>
              {num}+
            </option>
          ))}
        </select>

        <select
          value={filters.bathrooms}
          onChange={(e) =>
            handleFilterChange("bathrooms", parseInt(e.target.value))
          }
          className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
        >
          <option value={0}>
            {locale === "ar" ? "الحمامات" : "Bathrooms"}
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}+
            </option>
          ))}
        </select>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-200 group"
        >
          <Icon
            icon={showAdvanced ? "ph:caret-up" : "ph:caret-down"}
            width={16}
            height={16}
            className="transition-transform duration-200 group-hover:scale-110"
          />
          <span className="font-medium">
            {locale === "ar" ? "فلاتر متقدمة" : "Advanced Filters"}
          </span>
        </button>

        <button
          onClick={handleReset}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200 flex items-center gap-2"
        >
          <Icon icon="ph:arrow-clockwise" width={16} height={16} />
          {locale === "ar" ? "إعادة تعيين" : "Reset"}
        </button>
      </div>

      {/* Advanced Filters */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          showAdvanced ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {locale === "ar" ? "نطاق السعر" : "Price Range"}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder={locale === "ar" ? "من" : "From"}
                value={filters.priceRange[0]}
                onChange={(e) =>
                  handleFilterChange("priceRange", [
                    parseInt(e.target.value) || 0,
                    filters.priceRange[1],
                  ])
                }
                className="flex-1 w-[100px] px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
              />
              <input
                type="number"
                placeholder={locale === "ar" ? "إلى" : "To"}
                value={filters.priceRange[1]}
                onChange={(e) =>
                  handleFilterChange("priceRange", [
                    filters.priceRange[0],
                    parseInt(e.target.value) || 1000000,
                  ])
                }
                className="flex-1 w-[100px]   px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
              />
            </div>
          </div>

          {/* Area Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {locale === "ar" ? "نطاق المساحة (م²)" : "Area Range (m²)"}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder={locale === "ar" ? "من" : "From"}
                value={filters.areaRange[0]}
                onChange={(e) =>
                  handleFilterChange("areaRange", [
                    parseInt(e.target.value) || 0,
                    filters.areaRange[1],
                  ])
                }
                className="flex-1 w-[100px] px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
              />
              <input
                type="number"
                placeholder={locale === "ar" ? "إلى" : "To"}
                value={filters.areaRange[1]}
                onChange={(e) =>
                  handleFilterChange("areaRange", [
                    filters.areaRange[0],
                    parseInt(e.target.value) || 1000,
                  ])
                }
                className="flex-1 w-[100px] px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
