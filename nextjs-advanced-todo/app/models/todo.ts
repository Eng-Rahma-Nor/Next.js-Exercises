import mongoose, { Schema, models } from "mongoose";

export type Priority = "low" | "medium" | "high";

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  {
    timestamps: true,
  }
);

const Todo = models.Todo || mongoose.model("Todo", TodoSchema);

export default Todo;