import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-10">
      <div className="container mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 dark:text-gray-400 gap-3 sm:gap-0 text-center sm:text-left">
        {/* ✅ Copyright */}
        <div>
          © {new Date().getFullYear()} <span className="font-semibold text-indigo-600">Tap n’ Shop</span> — Mock E-Commerce Demo
        </div>

        {/* ✅ Footer links (optional / can add later) */}
        <div className="flex gap-4 text-gray-500 dark:text-gray-400">
          <a href="https://krishna-k19.github.io/my-shop/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">
            GitHub
          </a>
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  )
}
