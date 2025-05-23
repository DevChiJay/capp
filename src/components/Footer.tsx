import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Capp</h3>
            <p className="text-sm text-gray-600">
              A modern URL shortener with powerful features for tracking, managing, and optimizing your links.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/features" className="text-gray-600 hover:text-gray-900">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-gray-600 hover:text-gray-900">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-gray-900">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-600 hover:text-gray-900">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Capp. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="https://twitter.com" className="text-gray-600 hover:text-gray-900">
                Twitter
              </Link>
              <Link href="https://github.com" className="text-gray-600 hover:text-gray-900">
                GitHub
              </Link>
              <Link href="https://linkedin.com" className="text-gray-600 hover:text-gray-900">
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
