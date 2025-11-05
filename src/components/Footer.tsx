import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container mx-auto px-4 py-8 text-sm text-gray-600">
        <div>© {new Date().getFullYear()} Tap n Shop — mock e-commerce demo</div>
      </div>
    </footer>
  )
}
