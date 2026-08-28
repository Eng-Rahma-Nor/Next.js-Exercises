"use client";

import { useState } from "react";
import {
  deleteTodosAction,
  markAllAction,
  toggleTodoAction,
  type Priority,
} from "./actions";
import RelativeTime from "./RelativeTime";

type Todo = {
  _id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  initialTodos: Todo[];
};

export default function TodoList({
  initialTodos,
}: Props) {
  const [todos, setTodos] =
    useState<Todo[]>(initialTodos);

  const [selected, setSelected] =
    useState<string[]>([]);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("all");

  const priorityOrder = {
    high: 1,
    medium: 2,
    low: 3,
  };

  const filteredTodos = todos
    .filter((todo) => {
      const matchesSearch =
        todo.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "all" ||
        (status === "active" &&
          !todo.completed) ||
        (status === "completed" &&
          todo.completed);

      return (
        matchesSearch &&
        matchesStatus
      );
    })
    .sort(
      (a, b) =>
        priorityOrder[a.priority] -
        priorityOrder[b.priority]
    );

  function selectTodo(id: string) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter(
            (item) => item !== id
          )
        : [...current, id]
    );
  }

  async function toggleTodo(id: string) {
    await toggleTodoAction(id);

    setTodos((current) =>
      current.map((todo) =>
        todo._id === id
          ? {
              ...todo,
              completed:
                !todo.completed,
              updatedAt:
                new Date().toISOString(),
            }
          : todo
      )
    );
  }

  async function deleteSelected() {
    if (selected.length === 0) {
      return;
    }

    await deleteTodosAction(selected);

    setTodos((current) =>
      current.filter(
        (todo) =>
          !selected.includes(todo._id)
      )
    );

    setSelected([]);
  }

  async function markAll(
    completed: boolean
  ) {
    await markAllAction(completed);

    setTodos((current) =>
      current.map((todo) => ({
        ...todo,
        completed,
        updatedAt:
          new Date().toISOString(),
      }))
    );
  }

  return (
    <div className="todo-list">
      <div className="filters">
        <input
          type="search"
          placeholder="Search todos..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value)
          }
        >
          <option value="all">
            All
          </option>

          <option value="active">
            Active
          </option>

          <option value="completed">
            Completed
          </option>
        </select>
      </div>

      <div className="bulk-actions">
        <button
          onClick={deleteSelected}
          disabled={selected.length === 0}
        >
          Delete Selected
        </button>

        <button
          onClick={() => markAll(true)}
        >
          Mark All Complete
        </button>

        <button
          onClick={() => markAll(false)}
        >
          Mark All Incomplete
        </button>
      </div>

      <div>
        {filteredTodos.length === 0 ? (
          <p>
            No todos found.
          </p>
        ) : (
          <ul>
            {filteredTodos.map(
              (todo) => (
                <li
                  key={todo._id}
                  className="todo-item"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(
                      todo._id
                    )}
                    onChange={() =>
                      selectTodo(
                        todo._id
                      )
                    }
                  />

                  <button
                    onClick={() =>
                      toggleTodo(
                        todo._id
                      )
                    }
                  >
                    {todo.completed
                      ? "✅"
                      : "⬜"}
                  </button>

                  <div>
                    <h3
                      style={{
                        textDecoration:
                          todo.completed
                            ? "line-through"
                            : "none",
                      }}
                    >
                      {todo.title}
                    </h3>

                    <p>
                      Priority:{" "}
                      <strong>
                        {todo.priority}
                      </strong>
                    </p>

                    <small>
                      Created{" "}
                      <RelativeTime
                        date={
                          todo.createdAt
                        }
                      />
                    </small>

                    <br />

                    <small>
                      Updated{" "}
                      <RelativeTime
                        date={
                          todo.updatedAt
                        }
                      />
                    </small>
                  </div>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
}