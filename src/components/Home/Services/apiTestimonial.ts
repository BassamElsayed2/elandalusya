import supabase from "./supabase";

export interface Testemonial {
  name_ar: string;
  name_en: string;
  message_ar: string;
  message_en: string;
  image?: string;
  id?: string;
  created_at?: string;
}

export async function getTestemonial() {
  const { data, error } = await supabase.from("testemonial").select("*");

  if (error) {
    console.error("فشل في جلب المقالات:", error.message);
    throw new Error("فشل في تحميل المقالات");
  }

  return data;
}
