import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  useEffect(() => {
    logout()
    navigate('/')
  }, [logout, navigate])

  return null
}
