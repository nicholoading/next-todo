import { NextResponse } from 'next/server'
import { getAuth } from "@clerk/nextjs/server"
import { connectDB } from "./mongoose"
import { Todo } from "./todoModel"

export async function GET(req: Request) {
  const { userId } = getAuth(req)
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const todos = await Todo.find({ userId })
  return NextResponse.json(todos)
}

export async function POST(req: Request) {
  const { userId } = getAuth(req)
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { title } = await req.json()
  if (!title) {
    return NextResponse.json({ error: 'Title required' }, { status: 400 })
  }

  await connectDB()
  const newTodo = await Todo.create({ userId, title, completed: false })
  return NextResponse.json(newTodo, { status: 201 })
}

export async function PUT(req: Request) {
  const { userId } = getAuth(req)
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, completed } = await req.json()
  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 })
  }

  await connectDB()
  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: id, userId },
    { completed },
    { new: true }
  )
  if (!updatedTodo) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  }

  return NextResponse.json(updatedTodo)
}

export async function DELETE(req: Request) {
  const { userId } = getAuth(req)
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await req.json()
  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 })
  }

  await connectDB()
  await Todo.findOneAndDelete({ _id: id, userId })
  return NextResponse.json({ success: true })
}
