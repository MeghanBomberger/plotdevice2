import { useState, type FormEvent } from "react"
import { Navigate } from "react-router-dom"
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
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (!loading && session) return <Navigate to="/" replace />

  async function runAnimationSequence() {
    const loginCard = document.querySelector<HTMLElement>(".login-card")
    const plantTopLeft = document.querySelector<HTMLElement>(".corner-plant.top-left")
    const plantTopRight = document.querySelector<HTMLElement>(".corner-plant.top-right")
    const plantBottomLeft = document.querySelector<HTMLElement>(".corner-plant.bottom-left")
    const plantBottomRight = document.querySelector<HTMLElement>(".corner-plant.bottom-right")

    if (!loginCard) return

    const loginCardAnimation = loginCard.animate(
      [
        {
          width: `${loginCard.offsetWidth}px`,
          maxWidth: `${loginCard.offsetWidth}px`,
          height: `${loginCard.offsetHeight}px`,
        },
        {
          width: "calc(100vw - 1rem)",
          maxWidth: "calc(100vw - 1rem)",
          height: "calc(100vh - 1rem)",
          maxHeight: "calc(100vh - 1rem)",
          borderRadius: "1rem",
          marginTop: "0px",     
        },
      ],
      {
        duration: 600,
        easing: "ease-in-out",
        fill: "forwards",
      },
    ).finished

    if (plantTopLeft && plantTopRight && plantBottomLeft && plantBottomRight) {
      await Promise.all([
        loginCardAnimation,
        plantTopLeft.animate(
          [
            { 
              scale: 1,
              translate: "0 0",
            },
            { 
              scale: 0.45,
              translate: "-35vw -35vh",
            },
          ],
          { duration: 1200, easing: "ease-in-out", fill: "forwards" },
        ).finished,
        plantTopRight.animate(
          [
            {
              scale: 1,
              translate: "0 0",
            },
            {
              scale: 0.45,
              translate: "35vw -35vh",
            },
          ],
          { duration: 1200, easing: "ease-in-out", fill: "forwards" },
        ).finished,
        plantBottomLeft.animate(
          [
            {
              scale: 1,
              translate: "0 0",
            },
            {
              scale: 0.45,
              translate: "-35vw 35vh",
            },
          ],
          { duration: 1200, easing: "ease-in-out", fill: "forwards" },
        ).finished,
        plantBottomRight.animate(
          [
            {
              scale: 1,
              translate: "0 0",
            },
            {
              scale: 0.45,
              translate: "35vw 35vh",
            },
          ],
          { duration: 1200, easing: "ease-in-out", fill: "forwards" },
        ).finished,
      ])
    } else {
      await loginCardAnimation
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await signIn(email, password).then(async () => {
        await runAnimationSequence() // Call the animation sequence function
      })
      // navigate("/", { replace: true })
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

      <form
        className="login-card"
        onSubmit={handleSubmit}
      >

        <div className="login-icon-background">
          <img
            className="login-icon"
            src={typewriter}
            alt=""
          />
        </div>

        <h1 className="login-logo">
          PlotDevice
        </h1>

        <p className="login-sub">
          Sign in to your library
        </p>

        <label className="login-field" style={{ marginTop: "-0.85rem" }}>
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
          <p
            className="login-error"
            role="alert"
          >
            {error}
          </p>
        )}

        <button
          className="login-submit"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>

    </main>
  )
}
