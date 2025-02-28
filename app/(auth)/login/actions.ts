"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function loginLikeAdmin(formData: FormData) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const { data: userRole } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", data.user?.id)
    .single();

  const signInWithPasswordData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(
    signInWithPasswordData
  );

  if (error) {
    redirect("/error");
  }

  if (userRole?.role === "admin") {
    revalidatePath("/", "layout");
    redirect("/dashboard/admin");
  } else {
    redirect("/error");
  }
}

export async function loginLikeRepresentative(formData: FormData) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const { data: userRole } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", data.user?.id)
    .single();

  if (userRole) {
    console.log("User role:", userRole.role);
  }

  const signInWithPasswordData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(
    signInWithPasswordData
  );

  if (error) {
    redirect("/error");
  }

  if (userRole?.role === "representante") {
    revalidatePath("/", "layout");
    redirect("/dashboard/representative");
  } else {
    redirect("/error");
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/login");
}
