import { UrlForm } from "@/components/UrlForm"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-navyblue-50 via-white to-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-navyblue-500 to-indigo-600">
            Link Management Made Simple
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
            Shorten URLs, generate QR codes, and unlock detailed insights with capp.
          </p>

          <div className="mx-auto max-w-3xl rounded-xl border border-navyblue-100 bg-white p-8 shadow-lg">
            <UrlForm />
          </div>
        </div>
      </div>
    </section>
  )
}
