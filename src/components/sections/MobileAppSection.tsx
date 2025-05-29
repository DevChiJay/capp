import Image from "next/image"
import { Button } from "@/components/ui/button"
import { QrCode } from "lucide-react"

export function MobileAppSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="flex justify-center">
            <div className="relative h-[500px] w-[250px] rounded-3xl border-8 border-gray-800 bg-gray-800 shadow-xl">
              <div className="absolute inset-x-0 top-0 z-10 h-6 rounded-t-xl bg-gray-800"></div>
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <Image
                  src="/placeholder.svg?height=500&width=250"
                  alt="Mobile App"
                  width={250}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">Shorten URLs on the go</h2>
            <p className="mb-6 text-lg text-gray-600">
              Download our mobile app to create and manage shortened links from anywhere. Track analytics and
              generate QR codes directly from your phone.
            </p>
            <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button variant="outline" size="lg" className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 border-none">
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.9 19.9l-5.4-5.4 5.4-5.4c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0l-5.4 5.4-5.4-5.4c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41l5.4 5.4-5.4 5.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l5.4-5.4 5.4 5.4c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z" />
                </svg>
                Download for Android
              </Button>
              <div className="flex items-center justify-center rounded-lg border border-blue-100 p-4 shadow-md">
                <QrCode className="h-24 w-24 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Scan the QR code or click the button to download our mobile app.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
