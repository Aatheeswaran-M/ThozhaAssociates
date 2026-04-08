import { LogIn, ShieldCheck } from 'lucide-react'
import { useState } from 'react'

import { signInAdmin } from '@/services/supabase'

function AuthPanel({ loading, isConfigured }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })
  const [status, setStatus] = useState({
    type: 'idle',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    setSubmitting(true)
    setStatus({
      type: 'idle',
      message: '',
    })

    try {
      await signInAdmin(credentials)
      setStatus({
        type: 'success',
        message: 'Signed in successfully. Loading dashboard...',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message,
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (!isConfigured) {
    return (
      <div className="panel max-w-3xl p-8">
        <div className="flex items-center gap-3 text-accent">
          <ShieldCheck />
          <p className="font-display text-2xl font-semibold text-slate-900">
            Supabase setup required
          </p>
        </div>
        <p className="mt-4 text-slate-600">
          Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your `.env`
          file, run the SQL schema, and create your first admin user in
          Supabase Auth.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="panel max-w-3xl space-y-5 p-8">
      <div className="space-y-3">
        <span className="eyebrow">Admin Login</span>
        <h2 className="font-display text-4xl font-bold text-slate-900">
          Sign in to manage projects and testimonials
        </h2>
        <p className="text-slate-600">
          Use a Supabase Auth user with `profiles.is_admin = true` to access the
          dashboard.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Email
          </label>
          <input
            type="email"
            className="input-field"
            value={credentials.email}
            onChange={(event) =>
              setCredentials((current) => ({
                ...current,
                email: event.target.value,
              }))
            }
            placeholder="admin@example.com"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Password
          </label>
          <input
            type="password"
            className="input-field"
            value={credentials.password}
            onChange={(event) =>
              setCredentials((current) => ({
                ...current,
                password: event.target.value,
              }))
            }
            placeholder="••••••••"
          />
        </div>
      </div>

      {status.message ? (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            status.type === 'error'
              ? 'border-rose-300/30 bg-rose-300/10 text-rose-200'
              : 'border-mint/30 bg-mint/10 text-mint'
          }`}
        >
          {status.message}
        </div>
      ) : null}

      <button type="submit" className="cta-primary" disabled={submitting || loading}>
        {submitting || loading ? 'Signing in...' : 'Sign in'}
        <LogIn size={18} />
      </button>
    </form>
  )
}

export default AuthPanel
