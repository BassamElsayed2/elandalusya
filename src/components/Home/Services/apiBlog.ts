import supabase from "./supabase";

export interface blogs {
  title_ar: string;
  title_en: string;
  author?: string;
  content_ar: string;
  content_en: string;
  images?: string[];
  yt_code?: string;
  created_at?: string;
  id?: string;
  user_id?: string;
}

export async function getBlog() {
  const { data, error } = await supabase.from("blog").select("*");

  if (error) {
    console.error("فشل في جلب المقالات:", error.message);
    throw new Error("فشل في تحميل المقالات");
  }

  return data;
}

export async function getBlogsById(id: string) {
  const { data, error } = await supabase
    .from("blog")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  if (!data) throw new Error("الخبر غير موجود");

  return data;
}
