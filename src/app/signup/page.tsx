"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { SignupForm } from "@/components/SignupForm"

export default function SignupPage() {
  const router = useRouter()
  
  const handleSignupSuccess = () => {
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center bg-gray-50 py-12">
        <SignupForm onSuccess={handleSignupSuccess} />
      </main>
      <Footer />
    </div>
  )
}
