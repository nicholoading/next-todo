import { Schema, model, models } from "mongoose";

const TodoSchema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

export const Todo = models.Todo || model('Todo', TodoSchema);
