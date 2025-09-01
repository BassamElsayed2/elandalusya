"use client";

import React from "react";
import BlogCard from "@/components/shared/Blog/blogCard";

import { useQuery } from "@tanstack/react-query";
import { getBlog } from "../Home/Services/apiBlog";

const BlogList: React.FC = () => {
  const { data: blogs } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlog,
  });

  return (
    <section className="pt-0!">
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-12">
          {blogs?.map((blog, i) => (
            <div key={i} className="w-full">
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
