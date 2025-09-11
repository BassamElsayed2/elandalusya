import supabase from "./supabase";

export interface Faq {
  id: string;
  question: string;
  answer: string;
  created_at: string;
}

export async function getFaqs(): Promise<Faq[]> {
  try {
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("فشل في جلب الأسئلة الشائعة:", error.message);
      throw new Error("فشل في تحميل الأسئلة الشائعة");
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    throw error;
  }
}
