import { useState, useEffect } from 'react'
import './App.css'

const APPS = [
  {
    name: 'Nexus',
    tagline: 'AI-powered note-taking',
    description:
      'Local-first notes with AI writing, knowledge graph, public sharing and real-time collaboration.',
    url: 'https://mogul-notes.com',
    icon: '📝',
    color: '#7c6af7',
    category: 'Productivity',
    tags: ['AI', 'Notes', 'Supabase'],
    status: 'live',
  },
  {
    name: 'HomeVault',
    tagline: 'Home management system',
    description:
      'Track inventory, warranties, projects, utilities and contractors for your home.',
    url: 'https://chibohome.netlify.app',
    icon: '🏠',
    color: '#34c972',
    category: 'Lifestyle',
    tags: ['Firebase', 'Home', 'Tracker'],
    status: 'live',
  },
  {
    name: "Mogul's Studio",
    tagline: 'Personal learning platform',
    description:
      'Flashcards, quizzes, exam countdowns, grade tracker, mind maps and more.',
    url: 'https://mogulealey.com',
    icon: '🎓',
    color: '#f5a623',
    category: 'Education',
    tags: ['Firebase', 'Study', 'Flashcards'],
    status: 'live',
  },
  {
    name: 'Workout Tracker',
    tagline: 'Gym session logger',
    description:
      'Log workouts, track PRs, rest timer, rep counter, body stats and workout calendar.',
    url: 'https://mogul-fitness.netlify.app',
    icon: '💪',
    color: '#f56565',
    category: 'Health',
    tags: ['Fitness', 'Tracker', 'LocalStorage'],
    status: 'live',
  },
  {
    name: 'Event Countdown',
    tagline: 'Count down to what matters',
    description:
      'Live countdowns with categories, confetti, recurring events, reminders and shareable links.',
    url: 'https://mogul-countdown.netlify.app',
    icon: '⏳',
    color: '#63b3ed',
    category: 'Productivity',
    tags: ['Countdown', 'Reminders', 'LocalStorage'],
    status: 'live',
  },
  {
    name: 'Portfolio',
    tagline: 'Developer portfolio',
    description:
      'Personal portfolio showcasing projects, skills and contact links.',
    url: 'https://mogul-portfolio.netlify.app',
    icon: '🚀',
    color: '#c9a84c',
    category: 'Personal',
    tags: ['Portfolio', 'React', 'Vite'],
    status: 'live',
  },
]

const CATEGORIES = ['All', ...Array.from(new Set(APPS.map((a) => a.category)))]

const STATS = [
  { value: '6', label: 'Apps Built' },
  { value: '3', label: 'Stacks Used' },
  { value: '2', label: 'Platforms' },
  { value: '100%', label: 'Personal' },
]

function AppCard({ app, index }) {
  const isDisabled = app.url === '#'

  return (
    <article
      className="app-card"
      style={{
        '--card-color': app.color,
        animationDelay: `${index * 80}ms`,
      }}
    >
      <div className="card-accent" style={{ background: app.color }} />

      <div className="card-body">
        <div className="card-header">
          <div
            className="card-icon"
            style={{
              background: `${app.color}1f`,
              boxShadow: `0 0 20px ${app.color}2e`,
            }}
          >
            <span>{app.icon}</span>
          </div>

          <div className="card-title-group">
            <h3 className="card-name">{app.name}</h3>
            <p className="card-tagline">{app.tagline}</p>
          </div>

          <div className="card-status">
            <span className="status-dot" />
            <span className="status-label">Live</span>
          </div>
        </div>

        <p className="card-description">{app.description}</p>

        <div className="card-meta">
          <span
            className="category-badge"
            style={{
              color: app.color,
              borderColor: `${app.color}44`,
              background: `${app.color}14`,
            }}
          >
            {app.category}
          </span>
          <div className="tag-list">
            {app.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="card-footer">
        <a
          href={isDisabled ? undefined : app.url}
          target={isDisabled ? undefined : '_blank'}
          rel="noopener noreferrer"
          className={`open-btn${isDisabled ? ' open-btn--disabled' : ''}`}
          aria-disabled={isDisabled}
          tabIndex={isDisabled ? -1 : undefined}
        >
          {isDisabled ? 'Coming Soon' : 'Open App →'}
        </a>
      </div>
    </article>
  )
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filtered =
    activeCategory === 'All'
      ? APPS
      : APPS.filter((a) => a.category === activeCategory)

  return (
    <div className={`app-root${mounted ? ' app-root--mounted' : ''}`}>
      <div className="orb orb--purple" />
      <div className="orb orb--green" />

      <div className="layout">
        {/* Hero */}
        <header className="hero">
          <div className="hero-badge">
            <span className="badge-dot" />
            {APPS.length} Apps Available
          </div>
          <h1 className="hero-title">
            Mogulealey&apos;s
            <br />
            <span className="hero-gradient">App Suite</span>
          </h1>
          <p className="hero-subtitle">
            A collection of tools built for modern living
          </p>
        </header>

        {/* Stats bar */}
        <section className="stats-bar" aria-label="Quick stats">
          {STATS.map((s) => (
            <div key={s.label} className="stat-item">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </section>

        {/* Category filters */}
        <div
          className="filter-row"
          role="group"
          aria-label="Filter by category"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-chip${activeCategory === cat ? ' filter-chip--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* App grid */}
        <main className="app-grid" aria-label="Apps">
          {filtered.map((app, i) => (
            <AppCard key={app.name} app={app} index={i} />
          ))}
        </main>

        {/* Footer */}
        <footer className="footer">
          <p className="footer-text">
            Built by{' '}
            <a
              href="https://github.com/Mogulealey-dot"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Mogulealey
            </a>
          </p>
          <a
            href="https://github.com/Mogulealey-dot"
            target="_blank"
            rel="noopener noreferrer"
            className="github-btn"
            aria-label="GitHub profile"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </footer>
      </div>
    </div>
  )
}
