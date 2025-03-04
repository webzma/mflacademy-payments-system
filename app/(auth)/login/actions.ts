"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

async function handleLogin(
  formData: FormData,
  expectedRole: string,
  redirectPath: string
) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    redirect(
      "/error?message=" +
        encodeURIComponent("Email y contraseña son requeridos")
    );
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/error?message=" + encodeURIComponent(error.message));
  }

  const { data: userRole } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", data.user?.id)
    .single();

  if (userRole?.role === expectedRole) {
    revalidatePath("/", "layout");
    redirect(redirectPath);
  } else {
    redirect("/error?message=" + encodeURIComponent("Acceso denegado"));
  }
}

export async function loginLikeAdmin(formData: FormData) {
  await handleLogin(formData, "admin", "/dashboard/admin");
}

export async function loginLikeRepresentative(formData: FormData) {
  await handleLogin(formData, "representante", "/dashboard/representative");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    redirect(
      "/error?message=" +
        encodeURIComponent("Email y contraseña son requeridos")
    );
  }

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect("/error?message=" + encodeURIComponent(error.message));
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
