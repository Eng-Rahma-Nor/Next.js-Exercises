"use client";

import { useActionState } from "react";
import { greetUser } from "./actions";

const initialState = {
  message: "",
};

export default function GreetingPage() {
  const [state, formAction] = useActionState(
    greetUser,
    initialState
  );

  return (
    <main>
      <h1>Full Name Greeting</h1>

      <form action={formAction}>
        <div>
          <label htmlFor="firstName">First Name:</label>

          <input
            type="text"
            id="firstName"
            name="firstName"
            required
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>

          <input
            type="text"
            id="lastName"
            name="lastName"
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {state.message && <h2>{state.message}</h2>}
    </main>
  );
}