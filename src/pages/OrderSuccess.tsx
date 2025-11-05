import React from 'react'
import { Link } from 'react-router-dom'

export default function OrderSuccess() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-xl mx-auto bg-white p-8 rounded shadow text-center">
        <h3 className="text-2xl font-semibold mb-4">Thank you — your order is placed!</h3>
        <p className="text-gray-600 mb-6">We've received your order and will send a confirmation email shortly.</p>
        <Link to="/shop" className="px-4 py-2 bg-accent text-white rounded">Continue shopping</Link>
      </div>
    </div>
  )
}
