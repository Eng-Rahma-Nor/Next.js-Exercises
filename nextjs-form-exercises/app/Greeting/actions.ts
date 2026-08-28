"use server";

export async function greetUser(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  return {
    message: `Hello, ${firstName} ${lastName}!`,
  };
}