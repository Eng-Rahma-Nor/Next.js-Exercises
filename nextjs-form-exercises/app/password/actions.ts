"use server";

export async function submitPassword(formData: FormData) {
  const password = formData.get("password") as string;

  if (password.length < 6) {
    return {
      error: "Password must be at least 6 characters",
    };
  }

  return {
    success: "Password accepted!",
  };
}