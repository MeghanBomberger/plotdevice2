// import { Outlet } from 'react-router-dom'
import { signOut } from './api/auth'
// import { useAuth } from './context/AuthContext'
import typewriter from './assets/typewriter.svg'
import './App.css'

export default function App() {
  // const { session } = useAuth()

  return (
    <div className="shell">
      <div className="paper">
        <header className="paper-header">
          <div className="brand-icon">
            <img src={typewriter} alt="" />
          </div>
          <div className="brand-text">
            <span className="brand-title">PlotDevice</span>
            <span className="brand-sub">What should we write?</span>
          </div>
          <div className="paper-header-user">
            {/* <span className="paper-header-email">{session?.user.email}</span> */}
            <button className="paper-header-signout" onClick={() => void signOut()}>
              Sign out
            </button>
          </div>
        </header>
        {/* <main className="paper-content">
          <Outlet />
        </main> */}
      </div>
    </div>
  )
}
