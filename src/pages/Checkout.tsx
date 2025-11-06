import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCartStore } from '../store/useCartStore'
import { formatINR } from '../utils/currency'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'
import successAnimation from '../assets/animations/Add To Cart Success.json'

const CheckoutSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  city: z.string().min(2, 'City is required'),
  pincode: z.string().min(4, 'Invalid pincode'),
  paymentMethod: z.enum(['COD', 'UPI', 'CARD'], { required_error: 'Select a payment method' }),
})

type CheckoutData = z.infer<typeof CheckoutSchema>

export default function Checkout() {
  const { items, subtotal, clearCart } = useCartStore()
  const navigate = useNavigate()
  const { register, handleSubmit, formState } = useForm<CheckoutData>({
    resolver: zodResolver(CheckoutSchema),
  })
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const onSubmit = async (data: CheckoutData) => {
    try {
      setIsProcessing(true)
      await new Promise((resolve) => setTimeout(resolve, 1500)) // simulate API
      clearCart()
      setIsSuccess(true)
      toast.success('Order placed successfully!')
      setTimeout(() => navigate('/order-success'), 3000)
    } catch {
      toast.error('Failed to place order. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-center px-4">
        <Lottie animationData={successAnimation} loop={false} style={{ width: 240, height: 240 }} />
        <h2 className="text-2xl font-semibold text-green-600 mt-4">Order Placed Successfully!</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Redirecting to confirmation...</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300">🛒 Your cart is empty.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h3 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-white text-center">
        Checkout
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 📝 Form Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
        >
          <h4 className="font-semibold mb-5 text-lg text-gray-700 dark:text-gray-200">
            Shipping Details
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[{ name: 'name', label: 'Full Name' },
              { name: 'email', label: 'Email' },
              { name: 'phone', label: 'Phone' },
              { name: 'city', label: 'City' }].map(({ name, label }) => (
              <div key={name}>
                <label className="text-sm text-gray-600 dark:text-gray-300">{label}</label>
                <input
                  {...register(name as keyof CheckoutData)}
                  className="w-full border px-3 py-2 rounded mt-1 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <p className="text-red-500 text-xs mt-1">
                  {formState.errors[name as keyof CheckoutData]?.message as string}
                </p>
              </div>
            ))}

            <div className="md:col-span-2">
              <label className="text-sm text-gray-600 dark:text-gray-300">Address</label>
              <textarea
                {...register('address')}
                rows={3}
                className="w-full border px-3 py-2 rounded mt-1 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <p className="text-red-500 text-xs mt-1">{formState.errors.address?.message}</p>
            </div>

            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">Pincode</label>
              <input
                {...register('pincode')}
                className="w-full border px-3 py-2 rounded mt-1 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <p className="text-red-500 text-xs mt-1">{formState.errors.pincode?.message}</p>
            </div>

            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">Payment Method</label>
              <select
                {...register('paymentMethod')}
                className="w-full border px-3 py-2 rounded mt-1 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">Select</option>
                <option value="COD">Cash on Delivery</option>
                <option value="UPI">UPI</option>
                <option value="CARD">Card</option>
              </select>
              <p className="text-red-500 text-xs mt-1">
                {formState.errors.paymentMethod?.message}
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full px-4 py-3 mt-8 rounded-lg font-semibold flex items-center justify-center gap-2 text-white transition-all duration-300 ${
              isProcessing
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 shadow-md'
            }`}
          >
            {isProcessing ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4zm2 5.3A8 8 0 014 12H0c0 3 1.1 5.8 3 7.9l3-2.6z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              'Place Order'
            )}
          </button>
        </form>

        {/* 💰 Order Summary Section */}
        <aside className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 h-fit">
          <h4 className="font-semibold mb-5 text-lg text-gray-700 dark:text-gray-200">
            Order Summary
          </h4>

          <div className="space-y-4 max-h-72 overflow-auto">
            {items.map((it) => (
              <div key={it.id} className="flex items-center gap-4">
                <img
                  src={it.images?.[0] || 'https://via.placeholder.com/64'}
                  alt={it.title}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm sm:text-base truncate">{it.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Qty: {it.qty}</div>
                </div>
                <div className="font-semibold text-sm sm:text-base">
                  {formatINR(it.price * it.qty)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-gray-700 dark:text-gray-200 font-medium">
              <span>Subtotal</span>
              <span>{formatINR(subtotal())}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
