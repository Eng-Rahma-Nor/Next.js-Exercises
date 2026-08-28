"use server";

export default function FormPage() {
  async function submitForm(formData: FormData) {
    const email = formData.get("email");

    console.log("Email:", email);
  }

  return (
    <main>
      <h1>Basic Form</h1>

      <form action={submitForm}>
        <label htmlFor="email">Email:</label>

        <input
          type="email"
          id="email"
          name="email"
          required
        />

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}