"use client"
import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

interface AddTodoFormProps {
  onAdd: (title: string) => void
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [title, setTitle] = useState("")

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!title.trim()) return
        onAdd(title.trim())
        setTitle("")
      }}
      className="flex gap-2 mb-4"
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Todo..."
      />
      <Button type="submit">Add</Button>
    </form>
  )
}
