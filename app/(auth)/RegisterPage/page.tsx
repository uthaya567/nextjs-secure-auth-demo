"use client"

import Image from "next/image"
import img1 from "@/assets/img1.jpg"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [cpass, setCpass] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")

    if (!email || !pass || !cpass) {
      setError("All fields are required")
      return
    }

    if (pass.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (pass !== cpass) {
      setError("Passwords do not match")
      return
    }

    try {
      setLoading(true)

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: pass,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message)
        setLoading(false)
        return
      }

      router.push("/LoginPage")
    } catch (err) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Image
        src={img1}
        alt="Background"
        fill
        priority
        className="object-cover -z-20"
      />

      <div className="absolute inset-0 backdrop-blur-2xl bg-white/10 -z-10" />

      <div className="flex items-center justify-center h-full px-4 py-12">
        <div className="w-full max-w-6xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl">
          <div className="bg-white/95 rounded-3xl p-6 md:p-10">
            <div className="flex flex-col md:flex-row gap-8">
              
              {/* Left Side Image */}
              <div className="hidden md:flex md:w-1/2 relative rounded-2xl overflow-hidden">
                <Image
                  src={img1}
                  alt="Side Image"
                  className="object-cover w-full h-full"
                />
                <div className="absolute left-5 top-5 text-2xl font-extrabold text-white">
                  CRISPA
                </div>
              </div>

              {/* Form */}
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="w-full max-w-md">
                  <h2 className="text-3xl font-bold text-gray-800">
                    Start Your Journey
                  </h2>
                  <p className="text-gray-500 mt-2">
                    Sign up to continue using{" "}
                    <span className="text-indigo-600 font-semibold">
                      CRISPA
                    </span>
                  </p>

                  <form onSubmit={handleRegister} className="mt-8 space-y-5">
                    
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    />

                    <input
                      type="password"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      placeholder="Password"
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    />

                    <input
                      type="password"
                      value={cpass}
                      onChange={(e) => setCpass(e.target.value)}
                      placeholder="Confirm Password"
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    />

                    {error && (
                      <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <button
                      disabled={loading}
                      className="w-full bg-indigo-600 text-white py-3 rounded-xl shadow-md hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
                    >
                      {loading ? "Creating account..." : "Sign Up"}
                    </button>

                    <div className="text-center text-sm mt-4">
                      Already have an account?{" "}
                      <Link
                        href="/LoginPage"
                        className="text-indigo-600 font-semibold"
                      >
                        Login
                      </Link>
                    </div>

                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}