import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import LogoutButton from "../components/LogoutButton"

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
        <LogoutButton/>
      </div>
    </div>
  )
}