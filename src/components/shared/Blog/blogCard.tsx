import React, { FC } from "react";
import Image from "next/image";
import { Blog } from "@/types/blog";

import Link from "next/link";
import { useLocale } from "next-intl";

const BlogCard: FC<{ blog: Blog }> = ({ blog }) => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <Link
      href={`/blogs/${blog.id}`}
      aria-label="blog cover 5xl:h-full 5xl:inline-block"
      className="gap-4 group"
    >
      <div className="overflow-hidden rounded-2xl flex-shrink-0">
        <Image
          src={blog.images?.[0] || ""}
          alt="image"
          className="transition group-hover:scale-110"
          width={190}
          height={163}
          style={{ width: "100%", height: "100%" }}
          unoptimized={true}
        />
      </div>
      <div
        className={`flex justify-center items-center ${
          isArabic ? "flex-row-reverse" : ""
        }`}
      >
        <div>
          <h3 className="mt-2 text-xl font-medium text-dark dark:text-white group-hover:text-primary">
            {locale === "ar" ? blog.title_ar : blog.title_en}
          </h3>
          {/* <span className="text-base font-medium dark:text-white/50 text-dark/50 leading-loose">
              {format(new Date(blog.created_at), "MMM dd, yyyy")}
            </span> */}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
