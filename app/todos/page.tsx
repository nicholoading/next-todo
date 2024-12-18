"use client"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { AddTodoForm } from "@/components/AddTodoForm"
import { TodoList } from "@/components/TodoList"

interface Todo {
  _id: string
  userId: string
  title: string
  completed: boolean
}

export default function TodosPage() {
  const { isLoaded, isSignedIn } = useUser()
  const router = useRouter()
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      // User not signed in, redirect to landing page
      router.push("/")
    } else if (isLoaded && isSignedIn) {
      // User signed in, fetch todos from API
      fetchTodos()
    }
  }, [isLoaded, isSignedIn, router])

  async function fetchTodos() {
    try {
      setLoading(true)
      const res = await fetch("/api/todos")
      if (res.ok) {
        const data = await res.json()
        setTodos(data)
      } else {
        console.error("Failed to fetch todos", await res.text())
      }
    } catch (error) {
      console.error("Error fetching todos:", error)
    } finally {
      setLoading(false)
    }
  }

  async function addTodo(title: string) {
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      })
      if (res.ok) {
        const newTodo = await res.json()
        setTodos(prev => [newTodo, ...prev])
      } else {
        console.error("Failed to add todo", await res.text())
      }
    } catch (error) {
      console.error("Error adding todo:", error)
    }
  }

  async function toggleTodo(id: string, completed: boolean) {
    try {
      const res = await fetch("/api/todos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, completed }),
      })
      if (res.ok) {
        const updatedTodo = await res.json()
        setTodos(prev => prev.map(t => t._id === updatedTodo._id ? updatedTodo : t))
      } else {
        console.error("Failed to update todo", await res.text())
      }
    } catch (error) {
      console.error("Error updating todo:", error)
    }
  }

  async function deleteTodo(id: string) {
    try {
      const res = await fetch("/api/todos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        setTodos(prev => prev.filter(t => t._id !== id))
      } else {
        console.error("Failed to delete todo", await res.text())
      }
    } catch (error) {
      console.error("Error deleting todo:", error)
    }
  }

  if (!isLoaded || !isSignedIn || loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <main className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4">My Todos</h1>
      <AddTodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </main>
  )
}
