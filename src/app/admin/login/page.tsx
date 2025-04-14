"use client"

import { useState, FormEvent, JSX } from "react"
import { signIn, SignInResponse } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, User } from "lucide-react"

interface LoginFormData {
  username: string;
  password: string;
}

export default function AdminLogin(): JSX.Element {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  })
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result: SignInResponse | undefined = await signIn("credentials", {
        redirect: false,
        username: formData.username,
        password: formData.password,
      })

      if (result?.error) {
        setError("Invalid username or password")
        setLoading(false)
        return
      }

      if (result?.ok) {
        router.push("/admin/dashboard")
        router.refresh() // Refresh the page to update session data
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-white">
            Admin Login
          </h1>
          <p className="mt-2 text-center text-sm text-gray-400">
            Sign in to access the admin dashboard
          </p>
        </div>

        <form 
          className="mt-8 space-y-6" 
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="bg-gray-800 border-gray-700 pl-10 focus:ring-purple-500 focus:border-purple-500 block w-full"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="bg-gray-800 border-gray-700 pl-10 focus:ring-purple-500 focus:border-purple-500 block w-full"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center" role="alert">
              {error}
            </p>
          )}

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
