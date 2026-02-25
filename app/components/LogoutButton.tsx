"use client"

import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    })

    router.push("/LoginPage") // or "/login"
  }

  return (
    <button
      onClick={handleLogout}
      className="mt-5 px-6 py-2 bg-red-500 text-white rounded-lg"
    >
      Logout
    </button>
  )
}