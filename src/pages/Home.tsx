import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-md text-center">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">
          Welcome to <span className="text-indigo-600">Tap n’ Shop</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
          A premium, responsive mock e-commerce site — explore clothes, accessories & more with just a tap.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all font-medium"
        >
          Shop Now
        </Link>
      </section>

      {/* About & Promise Section */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* About */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all">
          <h3 className="text-2xl font-semibold text-indigo-600 mb-3">About Us</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Welcome to <strong>Tap n Shop</strong> — your one-stop destination for a seamless and stylish online
            shopping experience! We believe shopping should be simple, smart, and satisfying — just a tap away.
          </p>
          <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            Our platform brings together a wide range of quality products from trusted brands, designed to meet every
            lifestyle and budget. Whether you’re browsing the latest trends, exploring beauty essentials, or finding
            everyday must-haves, Tap n Shop ensures a smooth journey from discovery to checkout.
          </p>
          <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            Built with love and modern technology, Tap n Shop focuses on <strong>speed, simplicity, and
            personalization</strong> — helping every shopper find what they love with ease. With features like
            <strong> Favorites</strong>, <strong>Quick Add to Cart</strong>, and a <strong>secure checkout</strong>, we
            make your shopping journey effortless and enjoyable.
          </p>
          <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            At Tap n Shop, it’s not just about buying — it’s about <strong>experience, convenience, and
            connection</strong>. So go ahead… <em>Tap, Shop, and Smile!</em>
          </p>
        </div>

        {/* Our Promise */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all">
          <h3 className="text-2xl font-semibold text-indigo-600 mb-3">Our Promise</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            At <strong>Tap n Shop</strong>, our promise is simple — to make every shopping moment effortless, enjoyable,
            and trustworthy. We’re committed to bringing you quality products, transparent prices, and a smooth
            experience that makes you feel confident with every tap.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>🛍️ <strong>Deliver only the best</strong> — carefully selected products that match your lifestyle.</li>
            <li>⚡ <strong>Offer seamless performance</strong> — from browsing to checkout, fast and frustration-free.</li>
            <li>💬 <strong>Provide honest service</strong> — no hidden charges, no gimmicks, just genuine care.</li>
            <li>❤️ <strong>Keep you first</strong> — your satisfaction and trust guide everything we build.</li>
          </ul>
          <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            Because for us, Tap n Shop isn’t just a shopping platform — it’s a promise to make online shopping
            <strong> simple, secure, and special.</strong>
          </p>
        </div>
      </section>
    </div>
  )
}
