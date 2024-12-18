"use client"
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export default function Page() {
  const { isLoaded, isSignedIn } = useUser()
  const router = useRouter()

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <main className="max-w-md mx-auto mt-20 p-6 bg-white rounded-md shadow-md flex flex-col items-center gap-6">
      <h1 className="text-2xl font-semibold">Welcome to the Todo App</h1>
      <p className="text-center text-gray-700">
        Keep track of your tasks in a clean, modern interface.  
        Sign in to create, view, and manage your todos.
      </p>
      {isSignedIn ? (
        <button
          onClick={() => router.push("/todos")}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2 border border-gray-300 bg-white text-black hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f9fa]"
        >
          Go to Todos
        </button>
      ) : (
        <div className="flex gap-4">
          <SignInButton mode="redirect">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2 border border-gray-300 bg-white text-black hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f9fa]">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="redirect">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2 border border-gray-300 bg-white text-black hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f9fa]">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      )}
    </main>
  )
}
