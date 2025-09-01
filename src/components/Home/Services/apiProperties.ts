import supabase from "./supabase";

export async function getPropertie() {
  const { data, error } = await supabase.from("properties").select(
    `
      *
    `
  );

  if (error) {
    console.error("فشل في جلب العقار:", error.message);
    throw new Error("فشل في تحميل العقار");
  }

  return data;
}

export async function getSpecialProperty() {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("isSpecial", true)
    .limit(1)
    .single();
  if (error) {
    console.error("فشل في جلب العقار المميز:", error.message);
    throw new Error("فشل في تحميل العقار المميز");
  }

  return data;
}

export async function getPropertyById(id: string) {
  const { data, error } = await supabase
    .from("properties")
    .select(
      `
      *,
      realtor_id:Realtor(id, name, number , email , image)
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("فشل في جلب العقار:", error.message);
    throw new Error("فشل في تحميل العقار");
  }

  return data;
}
