import { useState, type FormEvent } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { signIn } from "../api/auth"
import { useAuth } from "../context/AuthContext"
import typewriter from "../assets/typewriter.svg"
import cornerPlant1 from "../assets/plant-1.png"
import cornerPlant2 from "../assets/plant-2.png"
import cornerPlant3 from "../assets/plant-3.png"
import cornerPlant4 from "../assets/plant-4.png"
import "./Login.css"

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
      <img
        className="corner-plant top-left"
        src={cornerPlant1} 
        alt=""
      />
      <img
        className="corner-plant top-right"
        src={cornerPlant2} 
        alt=""
      />
      <img
        className="corner-plant bottom-left"
        src={cornerPlant3} 
        alt=""
      />
      <img
        className="corner-plant bottom-right"
        src={cornerPlant4} 
        alt=""
      />
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-icon-background">
          <img className="login-icon" src={typewriter} alt="" />
        </div>
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
