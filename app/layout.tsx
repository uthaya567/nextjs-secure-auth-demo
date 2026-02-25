import type { Metadata } from "next"
import "./globals.css"
import { K2D } from "next/font/google"

const k2d = K2D({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "CRISPA Auth Demo",
  description: "Next.js authentication demo using HttpOnly cookies & middleware",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={k2d.className}>
        {children}
      </body>
    </html>
  )
}