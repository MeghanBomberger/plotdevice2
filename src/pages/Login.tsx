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

  if (!loading && session && !submitting) return <Navigate to="/" replace />

  async function runAnimationSequence() {
    const loginCard = document.querySelector<HTMLElement>(".login-card")
    const plantTopLeft = document.querySelector<HTMLElement>(".corner-plant.top-left")
    const plantTopRight = document.querySelector<HTMLElement>(".corner-plant.top-right")
    const plantBottomLeft = document.querySelector<HTMLElement>(".corner-plant.bottom-left")
    const plantBottomRight = document.querySelector<HTMLElement>(".corner-plant.bottom-right")
    const loginFields = document.querySelectorAll<HTMLElement>(".login-field")
    const loginSubmit = document.querySelector<HTMLElement>(".login-submit")
    const loginLogoBackground = document.querySelector<HTMLElement>(".login-icon-background")
    const logoText = document.querySelector<HTMLElement>(".logo-text-container")
    const loginSubtitle = document.querySelector<HTMLElement>(".login-sub")

    if (!loginCard) return

    const mainTransitionDuration = 1200
    const logoMoveDuration = 1200
    const logoTransitionDuration = mainTransitionDuration + logoMoveDuration
    const plantExitDuration = 1800

    const loginFormAnimations = [
      ...Array.from(loginFields, loginField => loginField.animate(
        [
          {
            opacity: 1,
          },
          {
            opacity: 0,
          },
        ],
        {
          duration: mainTransitionDuration,
          easing: "ease-in-out",
          fill: "forwards",
        },
      ).finished),
      ...(loginSubmit ? [loginSubmit.animate(
        [
          {
            opacity: 1,
          },
          {
            opacity: 0,
          },
        ],
        {
          duration: mainTransitionDuration,
          easing: "ease-in-out",
          fill: "forwards",
        },
      ).finished] : []),
    ]

    await Promise.all(loginFormAnimations)

    let loginLogoBackgroundAnimation: Promise<Animation> | null = null
    let logoTextAnimation: Promise<Animation> | null = null
    let loginSubtitleAnimation: Promise<Animation> | null = null

    if (loginLogoBackground) {
      const cardBounds = loginCard.getBoundingClientRect()
      const logoBounds = loginLogoBackground.getBoundingClientRect()
      const logoTextBounds = logoText?.getBoundingClientRect()
      const logoTitleBounds = document.querySelector<HTMLElement>(".login-logo")?.getBoundingClientRect()
      const logoSubtitleBounds = document.querySelector<HTMLElement>(".login-sub")?.getBoundingClientRect()
      const finalLogoLeft = 10
      const finalLogoTop = 5
      const finalLogoScale = 0.25
      const finalCardOffset = parseFloat(getComputedStyle(document.documentElement).fontSize) / 2
      const logoHoldTranslate = `${cardBounds.left - finalCardOffset}px ${cardBounds.top - finalCardOffset}px`
      const finalLogoTextWidth = Math.max(
        logoTitleBounds?.width ?? 0,
        logoSubtitleBounds?.width ?? 0,
      )

      loginCard.style.position = "relative"
      Object.assign(loginLogoBackground.style, {
        position: "absolute",
        top: `${logoBounds.top - cardBounds.top}px`,
        left: `${logoBounds.left - cardBounds.left}px`,
        marginTop: "0px",
        transformOrigin: "top left",
      })

      loginLogoBackgroundAnimation = loginLogoBackground.animate(
        [
          {
            top: `${logoBounds.top - cardBounds.top}px`,
            left: `${logoBounds.left - cardBounds.left}px`,
            scale: 1,
            translate: "0 0",
            offset: 0,
            easing: "ease-in-out",
          },
          {
            top: `${logoBounds.top - cardBounds.top}px`,
            left: `${logoBounds.left - cardBounds.left}px`,
            scale: 1,
            translate: logoHoldTranslate,
            offset: mainTransitionDuration / logoTransitionDuration,
            easing: "ease-in-out",
          },
          {
            top: "5px",
            left: "10px",
            scale: 0.25,
            translate: "0 0",
            offset: 1,
          },
        ],
        {
          duration: logoTransitionDuration,
          easing: "linear",
          fill: "forwards",
        },
      ).finished

      if (logoText && logoTextBounds) {
        Object.assign(logoText.style, {
          position: "absolute",
          top: `${logoTextBounds.top - cardBounds.top}px`,
          left: `${logoTextBounds.left - cardBounds.left}px`,
          width: `${logoTextBounds.width}px`,
          transformOrigin: "left center",
        })

        logoTextAnimation = logoText.animate(
          [
            {
              top: `${logoTextBounds.top - cardBounds.top}px`,
              left: `${logoTextBounds.left - cardBounds.left}px`,
              scale: 1,
              translate: "0 0",
              width: `${logoTextBounds.width}px`,
              offset: 0,
              easing: "ease-in-out",
            },
            {
              top: `${logoTextBounds.top - cardBounds.top}px`,
              left: `${logoTextBounds.left - cardBounds.left}px`,
              scale: 1,
              translate: logoHoldTranslate,
              width: `${logoTextBounds.width}px`,
              offset: mainTransitionDuration / logoTransitionDuration,
              easing: "ease-in-out",
            },
            {
              top: `${finalLogoTop + ((logoBounds.height * finalLogoScale) - logoTextBounds.height) / 2}px`,
              left: `${finalLogoLeft + (logoBounds.width * finalLogoScale) + 8}px`,
              scale: 0.75,
              translate: "0 0",
              width: `${finalLogoTextWidth}px`,
              offset: 1,
            },
          ],
          {
            duration: logoTransitionDuration,
            easing: "linear",
            fill: "forwards",
          },
        ).finished
      }
    }

    if (loginSubtitle) {
      loginSubtitleAnimation = loginSubtitle.animate(
        [
          {
            opacity: 1,
          },
          {
            opacity: 0,
          },
        ],
        {
          delay: mainTransitionDuration,
          duration: logoMoveDuration / 2,
          easing: "ease-in-out",
          fill: "forwards",
        },
      ).finished.then(() => {
        loginSubtitle.textContent = "What should we write?"

        return loginSubtitle.animate(
          [
            {
              opacity: 0,
            },
            {
              opacity: 1,
            },
          ],
          {
            duration: logoMoveDuration / 2,
            easing: "ease-in-out",
            fill: "forwards",
          },
        ).finished
      })
    }

    const loginCardAnimation = loginCard.animate(
      [
        {
          width: `${loginCard.offsetWidth}px`,
          maxWidth: `${loginCard.offsetWidth}px`,
          height: `${loginCard.offsetHeight}px`,
          justifyContent: "center",
          alignItems: "center",
        },
        {
          width: "calc(100vw - 1rem)",
          maxWidth: "calc(100vw - 1rem)",
          height: "calc(100vh - 1rem)",
          maxHeight: "calc(100vh - 1rem)",
          borderRadius: "1rem",
          marginTop: "0px",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        },
      ],
      {
        duration: mainTransitionDuration,
        easing: "ease-in-out",
        fill: "forwards",
      },
    ).finished

    if (plantTopLeft && plantTopRight && plantBottomLeft && plantBottomRight) {
      await Promise.all([
        loginCardAnimation,
        ...(loginLogoBackgroundAnimation ? [loginLogoBackgroundAnimation] : []),
        ...(logoTextAnimation ? [logoTextAnimation] : []),
        ...(loginSubtitleAnimation ? [loginSubtitleAnimation] : []),
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
          { duration: plantExitDuration, easing: "ease-in-out", fill: "forwards" },
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
          { duration: plantExitDuration, easing: "ease-in-out", fill: "forwards" },
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
          { duration: plantExitDuration, easing: "ease-in-out", fill: "forwards" },
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
          { duration: plantExitDuration, easing: "ease-in-out", fill: "forwards" },
        ).finished,
      ])
    } else {
      await Promise.all([
        loginCardAnimation,
        ...(loginLogoBackgroundAnimation ? [loginLogoBackgroundAnimation] : []),
        ...(logoTextAnimation ? [logoTextAnimation] : []),
        ...(loginSubtitleAnimation ? [loginSubtitleAnimation] : []),
      ])
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await signIn(email, password)
      await runAnimationSequence()
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

        <div className="logo-text-container">
          <h1 className="login-logo">
            PlotDevice
          </h1>

          <p className="login-sub">
            Sign in to your library
          </p>
        </div>

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
