"use client"
import { Button } from "./ui/button"

interface TodoItemProps {
  id: string
  title: string
  completed: boolean
  onToggle: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
}

export function TodoItem({ id, title, completed, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-3 border-b border-gray-300">
      <div className={`flex-1 ${completed ? 'line-through text-gray-500' : ''}`}>
        {title}
      </div>
      <div className="flex gap-2">
        <Button onClick={() => onToggle(id, !completed)}>
          {completed ? "Undo" : "Complete"}
        </Button>
        <Button variant="destructive" onClick={() => onDelete(id)}>
          Delete
        </Button>
      </div>
    </div>
  )
}
