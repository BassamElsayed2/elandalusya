import BlogList from "@/components/Blog";
import HeroSub from "@/components/shared/HeroSub";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Grids | الاندلوسية للعقارات ",
};

const Blog = () => {
  return (
    <>
      <HeroSub
        title_en="Real estate insights."
        title_ar="رؤى عقارية."
        description_en="Stay ahead in the property market with expert advice and updates."
        description_ar="ابقَ متقدماً في سوق العقارات مع نصائح وتحديثات الخبراء."
        badge_en="Blog"
        badge_ar="مقالات"
      />
      <BlogList />
    </>
  );
};

export default Blog;
