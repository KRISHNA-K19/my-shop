import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

const AuthSchema = z.object({
  name: z.string().min(2, 'Name too short').optional(),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type AuthForm = z.infer<typeof AuthSchema>

export default function Auth() {
  const { register, handleSubmit, formState } = useForm<AuthForm>({
    resolver: zodResolver(AuthSchema),
  })
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  const onSubmit = (data: AuthForm) => {
    // ✅ Demo login/signup
    login({
      id: data.email,
      name: data.name || data.email.split('@')[0],
      email: data.email,
    })
    navigate('/')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
          Login / Signup
        </h3>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Name (optional)
          </label>
          <input
            {...register('name')}
            placeholder="Your name"
            className="w-full border px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="you@example.com"
            className="w-full border px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <p className="text-red-500 text-xs mt-1">{formState.errors.email?.message}</p>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            {...register('password')}
            type="password"
            placeholder="••••••••"
            className="w-full border px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <p className="text-red-500 text-xs mt-1">{formState.errors.password?.message}</p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full px-4 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-300 shadow-sm"
        >
          Continue
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-5">
          By continuing, you agree to our{' '}
          <span className="text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer hover:underline">
            Terms
          </span>{' '}
          and{' '}
          <span className="text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer hover:underline">
            Privacy Policy
          </span>.
        </p>
      </form>
    </div>
  )
}
