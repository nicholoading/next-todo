"use client"
import { TodoItem } from "./TodoItem"

interface Todo {
  _id: string
  title: string
  completed: boolean
}

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <div className="border border-gray-300 rounded-md divide-y">
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          id={todo._id}
          title={todo.title}
          completed={todo.completed}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
