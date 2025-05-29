"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { LoginForm } from "@/components/LoginForm"

export default function LoginPage() {
  const router = useRouter()
  
  const handleLoginSuccess = () => {
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center bg-gray-50 py-12">
        <LoginForm onSuccess={handleLoginSuccess} />
      </main>
      <Footer />
    </div>
  )
}
