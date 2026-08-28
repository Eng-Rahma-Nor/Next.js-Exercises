"use client";

import { useActionState } from "react";
import { createTodoAction } from "./actions";

const initialState = {
  error: "",
  success: "",
};

export default function TodoForm() {
  const [state, formAction, pending] = useActionState(
    createTodoAction,
    initialState
  );

  return (
    <div className="form-container">
      <h2>Create Todo</h2>

      <form action={formAction}>
        <div className="form-group">
          <label htmlFor="title">
            Todo Title
          </label>

          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter your todo..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">
            Priority
          </label>

          <select
            id="priority"
            name="priority"
            defaultValue="medium"
          >
            <option value="low">
              Low
            </option>

            <option value="medium">
              Medium
            </option>

            <option value="high">
              High
            </option>
          </select>
        </div>

        <button
          type="submit"
          disabled={pending}
        >
          {pending ? "Creating..." : "Create Todo"}
        </button>
      </form>

      {state.error && (
        <p className="error">
          {state.error}
        </p>
      )}

      {state.success && (
        <p className="success">
          {state.success}
        </p>
      )}
    </div>
  );
}