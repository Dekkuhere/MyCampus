import { useEffect, useRef, useState } from 'react'
import Logo from './Logo.jsx'
import pfp from '../assets/pfp.png'
import { CMDS, buildRows } from '../data.js'

const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
const norm = (t) => t.trim().toLowerCase().replace(/^\//, '')
const stroke = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' }

const LibIcon = () => (
  <svg viewBox="0 0 32 32" {...stroke} strokeWidth="2"><path d="M3 28h26M6 10l5-1.5 3 14-5 1.5zM16 6h5v17h-5zM23 4h5v19h-5z" /></svg>
)
const DlIcon = () => (
  <svg viewBox="0 0 32 32" {...stroke} strokeWidth="2.2"><path d="M16 5v16m0 0l-6-6m6 6l6-6M5 27h22" /></svg>
)
const TogglePanel = () => (
  <svg className="tg" viewBox="0 0 32 32" {...stroke} strokeWidth="2.2"><rect x="4" y="5" width="24" height="22" rx="5" /><path d="M12 5v22M18 12l4 4-4 4" /></svg>
)

function History({ items, empty }) {
  return (
    <>
      {items.length
        ? items.slice().reverse().map((x, i) => <div className="row" key={i}>{x[0]}<span>{x[1]}</span></div>)
        : <div className="row"><span>{empty}</span></div>}
    </>
  )
}

export default function AppShell({ student, onLogout }) {
  const [open, setOpen] = useState(false)
  const [view, setView] = useState('home')
  const [pOpen, setP] = useState(false)
  const [hist, setHist] = useState([])
  const [dls, setDls] = useState([])
  const [done, setDone] = useState({})
  const [q, setQ] = useState('')
  const [sug, setSug] = useState(false)
  const [res, setRes] = useState(null)
  const box = useRef(null)

  useEffect(() => {
    const h = (e) => { setP(false); if (box.current && !box.current.contains(e.target)) setSug(false) }
    document.addEventListener('click', h)
    return () => document.removeEventListener('click', h)
  }, [])

  const matches = CMDS.filter((c) => c.startsWith(norm(q)))
  const rows = res && res.cmd ? buildRows(res.cmd, student) : []

  function run(t) {
    const n = norm(t), k = n && CMDS.find((c) => c.startsWith(n))
    setSug(false)
    if (!k) { setRes({ none: n }); return }
    setRes({ cmd: k })
    setHist((h) => [...h, ['/' + k, now()]])
  }
  function act(r, key) {
    setDone((d) => ({ ...d, [key]: true }))
    if (r.kind === 'd') setDls((d) => [...d, [r.file, now()]])
    else setHist((h) => [...h, ['Opened: ' + r.file, now()]])
  }
  const toggleView = (v) => setView(view === v ? 'home' : v)

  return (
    <div id="app">
      <aside className={'sb' + (open ? ' open' : '')}>
        <div className="lrow">
          <div id="alogo" onClick={() => setOpen(!open)}><Logo className="lg2" /><TogglePanel /></div>
          <b className="lt">MyCampus</b>
        </div>
        <button className={'si' + (view === 'lib' ? ' on' : '')} onClick={() => toggleView('lib')}><LibIcon /><span>Library</span></button>
        <button className={'si' + (view === 'dl' ? ' on' : '')} onClick={() => toggleView('dl')}><DlIcon /><span>Downloads</span></button>
        <div className="sp" />
        <div className={'pf' + (pOpen ? ' open' : '')} id="pf">
          <div id="pm">
            <button id="lo" onClick={onLogout}>log out</button>
            <button id="cn">cancel</button>
          </div>
          <div className="prow" id="prow" onClick={(e) => { e.stopPropagation(); setP(!pOpen) }}>
            <img id="pfp" alt="profile" src={pfp} />
            <b className="pn" id="pn">{student.name}</b>
          </div>
        </div>
      </aside>

      <main className="main">
        <div className={'pane' + (view === 'home' ? ' on' : '')} id="v-home">
          <h2>Hello,<br />need something??</h2>
          <div className="ul wide" />
          <div className={'combo' + (sug && matches.length ? ' open' : '')} id="sb" ref={box}>
            <input id="q2" placeholder="/takewhatuneed" autoComplete="off" value={q}
              onFocus={() => setSug(true)} onChange={(e) => { setQ(e.target.value); setSug(true) }}
              onKeyDown={(e) => { if (e.key === 'Enter') run(q) }} />
            <ul id="sg">
              {matches.map((c) => <li key={c} onClick={() => { setQ('/' + c); run('/' + c) }}>/{c}</li>)}
            </ul>
          </div>
          <p className="who" id="who">{student.name} · {student.course} · {student.roll} · {student.campus}</p>
          <div className="list" id="res">
            {res && res.none !== undefined && (
              <div className="row"><span>no results for /{res.none} · try /assignments, /gradecard, /forms or /ebooks</span></div>
            )}
            {rows.map((r) => {
              const key = res.cmd + r.title
              return (
                <div className="row" key={key}>
                  {r.title}<span>{r.sub}</span>
                  <b className="act" onClick={() => act(r, key)}>{done[key] ? (r.kind === 'd' ? 'Downloaded ✓' : 'Opened ✓') : r.act}</b>
                </div>
              )
            })}
          </div>
        </div>

        <div className={'pane' + (view === 'lib' ? ' on' : '')} id="v-lib">
          <h2>library</h2><div className="ul" />
          <div className="list"><History items={hist} empty="Nothing here yet. Search something to start." /></div>
        </div>
        <div className={'pane' + (view === 'dl' ? ' on' : '')} id="v-dl">
          <h2>downloads</h2><div className="ul" />
          <div className="list"><History items={dls} empty="No downloads yet." /></div>
        </div>
      </main>
    </div>
  )
}
