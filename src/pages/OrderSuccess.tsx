import React from 'react'
import { Link } from 'react-router-dom'
import Lottie from 'lottie-react'
import successAnimation from '../assets/animations/Add To Cart Success.json'

export default function OrderSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 text-center transform transition-all hover:scale-[1.01]">
        {/* ✅ Animation */}
        <div className="flex justify-center mb-6">
          <Lottie
            animationData={successAnimation}
            loop={false}
            autoplay
            style={{ width: 200, height: 200 }}
          />
        </div>

        <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
          🎉 Thank you — your order is placed!
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We’ve received your order and will send a confirmation email shortly.
        </p>

        <Link
          to="/shop"
          className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all shadow-md"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
