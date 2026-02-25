# 🔐 CRISPA – Next.js Authentication Demo

A modern authentication system built with **Next.js App Router**, featuring secure session handling using **HttpOnly cookies**, API routes, and Middleware protection.

This project demonstrates a clean and secure authentication flow suitable for portfolio showcase.

---

## 🚀 Features

- ✅ Login & Register UI
- ✅ API-based authentication
- ✅ HttpOnly session cookies
- ✅ Protected routes using Middleware
- ✅ Server-side session validation
- ✅ Logout functionality
- ✅ Modern UI with Tailwind CSS
- ✅ Built with Next.js App Router

---

## 🛠️ Tech Stack

- **Next.js 15**
- **TypeScript**
- **App Router**
- **Middleware**
- **HttpOnly Cookies**
- **Tailwind CSS**

---

## 🔐 Authentication Flow

1. User logs in via `/api/login`
2. Server sets an **HttpOnly cookie**
3. Middleware protects `/homePage`
4. Server reads cookie using `next/headers`
5. Logout clears the session cookie

This ensures:
- No client-side token exposure
- Secure route protection
- Clean architecture

---

## 📂 Project Structure


app/
├── api/
│ ├── login/
│ ├── register/
│ └── logout/
│
├── homePage/
│ └── page.tsx
│
├── LoginPage/
│ └── page.tsx
│
├── RegisterPage/
│ └── page.tsx
│
middleware.ts


## 🧪 Run Locally

```bash
npm install
npm run dev
=======
# nextjs-secure-auth-demo
Modern authentication system built with Next.js featuring API-based login/register, HttpOnly session cookies, and protected routes using Middleware.
