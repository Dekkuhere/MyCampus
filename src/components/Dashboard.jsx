import { useState } from 'react'
import Sidebar from './Sidebar.jsx'
import SearchBar from './SearchBar.jsx'
import Results from './Results.jsx'
import ActivityList from './ActivityList.jsx'
import { COMMANDS, resultsFor } from '../data/content.js'

const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

export default function Dashboard({ student, onLogout }) {
  const [view, setView] = useState('home')
  const [hist, setHist] = useState([])
  const [dls, setDls] = useState([])
  const [res, setRes] = useState({ items: [], empty: '' })

  const run = (text) => {
    const t = text.trim().toLowerCase().replace(/^\//, '')
    const k = t && COMMANDS.find((c) => c.startsWith(t))
    if (!k) return setRes({ items: [], empty: `no results for /${t.replace(/[<>&]/g, '')} · try /assignments, /gradecard, /forms or /ebooks` })
    setRes({ items: resultsFor(k, student.course), empty: '' })
    setHist((h) => [...h, ['/' + k, now()]])
  }
  const act = (it) => it.kind === 'd'
    ? setDls((d) => [...d, [it.file, now()]])
    : setHist((h) => [...h, ['Opened: ' + it.file, now()]])

  return (
    <div id="app">
      <Sidebar view={view} setView={setView} onLogout={onLogout} />
      <main className="main">
        <div className={'pane' + (view === 'home' ? ' on' : '')} id="v-home">
          <h2>Hello,<br />need something??</h2>
          <div className="ul wide"></div>
          <SearchBar onRun={run} />
          <p className="who">{student.name} · {student.course} · {student.roll} · {student.campus}</p>
          <Results key={res.items.length + res.empty} items={res.items} empty={res.empty} onAct={act} />
        </div>
        <div className={'pane' + (view === 'lib' ? ' on' : '')}>
          <h2>library</h2><div className="ul"></div>
          <ActivityList entries={hist} emptyText="Nothing here yet. Search something to start." />
        </div>
        <div className={'pane' + (view === 'dl' ? ' on' : '')}>
          <h2>downloads</h2><div className="ul"></div>
          <ActivityList entries={dls} emptyText="No downloads yet." />
        </div>
      </main>
    </div>
  )
}
