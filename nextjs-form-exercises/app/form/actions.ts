"use server";

export async function submitForm(formData: FormData) {
  const email = formData.get("email");

  console.log("Email:", email);
}