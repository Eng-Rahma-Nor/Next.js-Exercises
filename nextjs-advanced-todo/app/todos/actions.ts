"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "../lib/mongodb";
import Todo from "../../models/Todo";

export type Priority = "low" | "medium" | "high";

export async function createTodoAction(
  previousState: {
    error?: string;
    success?: string;
  },
  formData: FormData
) {
  const title = formData.get("title")?.toString().trim();
  const priority = formData.get("priority")?.toString() as Priority;

  if (!title) {
    return {
      error: "Todo title is required",
    };
  }

  if (!["low", "medium", "high"].includes(priority)) {
    return {
      error: "Invalid priority",
    };
  }

  try {
    await connectDB();

    await Todo.create({
      title,
      priority,
      completed: false,
    });

    revalidatePath("/todos");

    return {
      success: "Todo created successfully!",
    };
  } catch (error) {
    console.error(error);

    return {
      error: "Failed to create todo",
    };
  }
}

export async function toggleTodoAction(id: string) {
  try {
    await connectDB();

    const todo = await Todo.findById(id);

    if (!todo) {
      return;
    }

    todo.completed = !todo.completed;

    await todo.save();

    revalidatePath("/todos");
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTodoAction(id: string) {
  try {
    await connectDB();

    await Todo.findByIdAndDelete(id);

    revalidatePath("/todos");
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTodosAction(ids: string[]) {
  try {
    await connectDB();

    await Todo.deleteMany({
      _id: {
        $in: ids,
      },
    });

    revalidatePath("/todos");
  } catch (error) {
    console.error(error);
  }
}

export async function markAllAction(completed: boolean) {
  try {
    await connectDB();

    await Todo.updateMany(
      {},
      {
        $set: {
          completed,
        },
      }
    );

    revalidatePath("/todos");
  } catch (error) {
    console.error(error);
  }
}