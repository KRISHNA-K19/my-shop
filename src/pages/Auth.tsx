import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

const AuthSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email(),
  password: z.string().min(6)
})

type AuthForm = z.infer<typeof AuthSchema>

export default function Auth() {
  const { register, handleSubmit, formState } = useForm<AuthForm>({ resolver: zodResolver(AuthSchema) })
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  const onSubmit = (data: AuthForm) => {
    // For demo: accept signup/login and store a fake token
    login({ id: data.email, name: data.name || data.email.split('@')[0], email: data.email })
    navigate('/')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Login / Signup</h3>
        <input placeholder="Name (optional for login)" {...register('name')} className="w-full border px-3 py-2 rounded mb-3" />
        <input placeholder="Email" {...register('email')} className="w-full border px-3 py-2 rounded mb-3" />
        <div className="text-red-500 text-xs">{formState.errors.email?.message as string}</div>
        <input placeholder="Password" type="password" {...register('password')} className="w-full border px-3 py-2 rounded mb-3" />
        <div className="text-red-500 text-xs">{formState.errors.password?.message as string}</div>
        <button className="w-full px-3 py-2 bg-brand text-white rounded">Continue</button>
      </form>
    </div>
  )
}
