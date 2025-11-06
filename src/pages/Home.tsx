import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-10">
      {/* ✅ Hero Section */}
      <section className="bg-white dark:bg-gray-900 p-6 sm:p-10 rounded-2xl shadow-md text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white leading-tight">
          Welcome to <span className="text-indigo-600">Tap n’ Shop</span>
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-6 max-w-2xl mx-auto px-2 sm:px-0">
          Shop smarter — discover trendy fashion, essentials & more. Just tap and shop!
        </p>

        <Link
          to="/shop"
          className="inline-block bg-indigo-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-indigo-700 transition-all font-medium text-sm sm:text-base"
        >
          🛍️ Shop Now
        </Link>
      </section>

      {/* ✅ Info Section */}
      <section className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* About Card */}
        <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-semibold text-indigo-600 mb-3">
            About
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            Tap n’ Shop brings you a smooth, fast, and secure shopping experience. Explore quality products, save your favorites, and checkout effortlessly.
          </p>
        </div>

        {/* Promise Card */}
        <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-semibold text-indigo-600 mb-3">
            Our Promise
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            <li>🛍️ Premium products, fair prices.</li>
            <li>⚡ Fast, seamless experience.</li>
            <li>💬 Honest, transparent service.</li>
            <li>❤️ Your satisfaction first.</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
