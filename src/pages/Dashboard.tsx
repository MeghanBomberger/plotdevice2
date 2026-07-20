import { useEffect, useMemo, useState } from "react"
import { getUniverses } from "../api/universes"
import { getSeries } from "../api/series"
import { getProjects } from "../api/projects"
import type { Project, Series, UniverseWithSeries } from "../types"
import "./Dashboard.css"

const WIDGET_PREFS_KEY = "pd-dashboard-widgets"

type WidgetPrefs = {
  continue: boolean
  stats: boolean
}

const defaultPrefs: WidgetPrefs = { continue: true, stats: true }

function loadPrefs(): WidgetPrefs {
  try {
    const raw = localStorage.getItem(WIDGET_PREFS_KEY)
    return raw ? { ...defaultPrefs, ...JSON.parse(raw) } : defaultPrefs
  } catch {
    return defaultPrefs
  }
}

type LibraryCard = {
  id: string
  kind: "universe" | "series" | "project"
  name: string
  description: string | null
  updated_at: string
}

export default function Dashboard() {
  const [universes, setUniverses] = useState<UniverseWithSeries[]>([])
  const [series, setSeries] = useState<Series[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [prefs, setPrefs] = useState<WidgetPrefs>(loadPrefs)
  const [customizing, setCustomizing] = useState(false)

  useEffect(() => {
    Promise.all([getUniverses(), getSeries(), getProjects()])
      .then(([u, s, p]) => {
        setUniverses(u)
        setSeries(s)
        setProjects(p)
      })
      .catch(e => setError(e instanceof Error ? e.message : "Failed to load your library"))
      .finally(() => setLoading(false))
  }, [])

  function togglePref(key: keyof WidgetPrefs) {
    setPrefs(prev => {
      const next = { ...prev, [key]: !prev[key] }
      localStorage.setItem(WIDGET_PREFS_KEY, JSON.stringify(next))
      return next
    })
  }

  const active = useMemo(() => {
    const notArchived = <T extends { archived_at: string | null }>(rows: T[]) =>
      rows.filter(r => !r.archived_at)
    return {
      universes: notArchived(universes),
      series: notArchived(series),
      projects: notArchived(projects),
    }
  }, [universes, series, projects])

  const lastTouched = useMemo(() => {
    if (active.projects.length === 0) return null
    return [...active.projects].sort((a, b) => b.updated_at.localeCompare(a.updated_at))[0]
  }, [active.projects])

  const library = useMemo<LibraryCard[]>(() => {
    const cards: LibraryCard[] = [
      ...active.universes.map(u => ({
        id: u.id,
        kind: "universe" as const,
        name: u.name,
        description: u.description,
        updated_at: u.updated_at,
      })),
      ...active.series
        .filter(s => !s.universe_id)
        .map(s => ({
          id: s.id,
          kind: "series" as const,
          name: s.name,
          description: s.description,
          updated_at: s.updated_at,
        })),
      ...active.projects
        .filter(p => !p.series_id && !p.universe_id)
        .map(p => ({
          id: p.id,
          kind: "project" as const,
          name: p.name,
          description: p.description,
          updated_at: p.updated_at,
        })),
    ]
    return cards.sort((a, b) => b.updated_at.localeCompare(a.updated_at))
  }, [active])

  if (loading) return <p className="dash-status">Opening your library…</p>
  if (error)
    return (
      <p className="dash-status dash-error" role="alert">
        {error}
      </p>
    )

  return (
    <div className="dash">
      <div className="dash-tools">
        <button className="dash-customize" onClick={() => setCustomizing(c => !c)}>
          {customizing ? "Done" : "Customize"}
        </button>
        {customizing && (
          <div className="dash-customize-panel">
            <label>
              <input
                type="checkbox"
                checked={prefs.continue}
                onChange={() => togglePref("continue")}
              />
              Pick up where you left off
            </label>
            <label>
              <input type="checkbox" checked={prefs.stats} onChange={() => togglePref("stats")} />
              Stats
            </label>
          </div>
        )}
      </div>

      {prefs.continue && lastTouched && (
        <section className="dash-section">
          <h2 className="dash-heading">Pick up where you left off</h2>
          <div className="dash-continue-card">
            <span className="dash-continue-name">{lastTouched.name}</span>
            {lastTouched.description && (
              <span className="dash-continue-desc">{lastTouched.description}</span>
            )}
            <span className="dash-continue-when">
              last touched {new Date(lastTouched.updated_at).toLocaleDateString()}
            </span>
          </div>
        </section>
      )}

      <section className="dash-section">
        <div className="dash-heading-row">
          <h2 className="dash-heading">Library</h2>
          <button className="dash-new" title="Coming soon" disabled>
            + New
          </button>
        </div>
        {library.length === 0 ? (
          <p className="dash-empty">Nothing here yet — your first story awaits.</p>
        ) : (
          <div className="dash-grid">
            {library.map(card => (
              <button key={`${card.kind}-${card.id}`} className="dash-card" type="button">
                <span className={`dash-card-icon dash-card-icon--${card.kind}`} aria-hidden="true" />
                <span className="dash-card-name">{card.name}</span>
                <span className="dash-card-kind">{card.kind}</span>
                {card.description && <span className="dash-card-desc">{card.description}</span>}
              </button>
            ))}
          </div>
        )}
      </section>

      {prefs.stats && (
        <section className="dash-section">
          <h2 className="dash-heading">Stats</h2>
          <div className="dash-stats">
            <div className="dash-stat">
              <span className="dash-stat-value">{active.universes.length}</span>
              <span className="dash-stat-label">universes</span>
            </div>
            <div className="dash-stat">
              <span className="dash-stat-value">{active.series.length}</span>
              <span className="dash-stat-label">series</span>
            </div>
            <div className="dash-stat">
              <span className="dash-stat-value">{active.projects.length}</span>
              <span className="dash-stat-label">projects</span>
            </div>
            {lastTouched && (
              <div className="dash-stat">
                <span className="dash-stat-value">
                  {new Date(lastTouched.updated_at).toLocaleDateString()}
                </span>
                <span className="dash-stat-label">last writing day</span>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
