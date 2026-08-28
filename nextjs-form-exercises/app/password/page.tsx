"use client";

import { useActionState } from "react";
import { submitPassword } from "./actions";

const initialState = {
  error: "",
  success: "",
};

export default function PasswordPage() {
  const [state, formAction] = useActionState(
    submitPassword,
    initialState
  );

  return (
    <main>
      <h1>Password Form</h1>

      <form action={formAction}>
        <label htmlFor="password">Password:</label>

        <input
          type="password"
          id="password"
          name="password"
        />

        <button type="submit">Submit</button>
      </form>

      {state.error && <p>{state.error}</p>}

      {state.success && <p>{state.success}</p>}
    </main>
  );
}