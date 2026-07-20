import { useState, type FormEvent } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { signIn } from "../api/auth"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const { session, loading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (!loading && session) return <Navigate to="/" replace />

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await signIn(email, password)
      navigate("/", { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="login-wrap">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1 className="login-logo">PlotDevice</h1>
        <p className="login-sub">Sign in to your library</p>
        <label className="login-field">
          Email
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            required
            autoFocus
          />
        </label>
        <label className="login-field">
          Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {error && (
          <p className="login-error" role="alert">
            {error}
          </p>
        )}
        <button className="login-submit" type="submit" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  )
}
