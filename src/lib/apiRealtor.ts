import supabase from "@/components/Home/Services/supabase";

export interface Realtor {
  id?: string;
  name: string;
  number: string;
  email: string;
  image: string;
  main?: boolean;
  created_at?: string;
}

// جلب الوكيل الرئيسي
export const getMainRealtor = async (): Promise<Realtor | null> => {
  const { data, error } = await supabase
    .from("Realtor")
    .select("*")
    .eq("main", true)
    .limit(1)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // لا يوجد وكيل رئيسي
      return null;
    }
    console.error("Error fetching main realtor:", error);
    throw new Error("فشل في جلب بيانات الوكيل الرئيسي");
  }

  return data;
};
