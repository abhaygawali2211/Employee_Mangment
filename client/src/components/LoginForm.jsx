import React, { useState } from 'react'
import { ArrowLeft, EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react'
import { Loginleftside } from './Loginleftside'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Authcontext'
import { toast } from 'react-hot-toast'

export const LoginForm = ({ role, title, subtitle }) => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    let newErrors = {}

    if (!form.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email'
    }

    if (!form.password) {
      newErrors.password = 'Password is required'
    } else if (form.password.length < 6) {
      newErrors.password = 'Minimum 6 characters required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrors({})
    setLoading(true)

    if (!validate()) {
      setLoading(false)
      return
    }

    try {
      await login(form.email, form.password, role)
      navigate("/dashboard")
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
        error.message ||
        "Login Failed"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <Loginleftside />

      <div className='flex-1 flex items-center justify-center p-6 sm:p-12 bg-white'>
        <div className='w-full max-w-md'>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm mb-10"
          >
            <ArrowLeft size={16} />
            Back to portals
          </Link>

          <div className='mb-8'>
            <h1 className='text-2xl font-medium text-zinc-800'>{title}</h1>
            <p className='text-slate-500 mt-2'>{subtitle}</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <div>
              <label className='block text-sm font-medium mb-2'>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full border rounded-lg px-3 py-2 ${
                  errors.email ? 'border-rose-500' : 'border-slate-300'
                }`}
              />
              {errors.email && (
                <p className='text-rose-600 text-sm mt-1'>{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className='block text-sm font-medium mb-2'>Password</label>

              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 pr-11 ${
                    errors.password ? 'border-rose-500' : 'border-slate-300'
                  }`}
                />

                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2'
                >
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className='text-rose-600 text-sm mt-1'>{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type='submit'
              disabled={loading}
              className='w-full bg-indigo-600 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 disabled:opacity-60'
            >
              {loading && <Loader2Icon className="animate-spin h-4 w-4" />}
              {loading ? 'Please wait...' : 'Sign in'}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}