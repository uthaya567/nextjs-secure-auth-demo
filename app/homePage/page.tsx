import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")?.value

  if (!session) {
    redirect("/LoginPage")
  }

  const user = JSON.parse(session)

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div  className="p-10 text-center">
        <h1 className="text-3xl font-bold">
          Welcome <span className="text-4xl text-red-500"> {user.name}</span>
        </h1>

        <form action="/api/logout" method="POST">
          <button
            type="submit"
            className="mt-5 px-6 py-2 bg-red-500 text-white rounded-lg"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  )
}