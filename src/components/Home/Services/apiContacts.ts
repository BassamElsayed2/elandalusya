import supabase from "./supabase";

export interface Contact {
  id: string;
  phone: string | null;
  email: string | null;
  facebook_url: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
  created_at: string;
}

export async function getContacts(): Promise<Contact[]> {
  try {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("فشل في جلب بيانات الاتصال:", error.message);
      throw new Error("فشل في تحميل بيانات الاتصال");
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
}
