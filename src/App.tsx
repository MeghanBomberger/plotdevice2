import { NavLink, Outlet } from 'react-router-dom'
import { signOut } from './api/auth'
import { useAuth } from './context/AuthContext'

export default function App() {
  const { session } = useAuth()

  return (
    <div className="app">
      <nav className="app-nav">
        <span className="app-brand">PlotDevice</span>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/about">About</NavLink>
        <div className="app-nav-user">
          <span className="app-nav-email">{session?.user.email}</span>
          <button className="app-nav-signout" onClick={() => void signOut()}>
            Sign out
          </button>
        </div>
      </nav>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
