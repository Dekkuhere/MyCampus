import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import pfp from '../assets/pfp.png'

const LibraryIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><path d="M3 28h26M6 10l5-1.5 3 14-5 1.5zM16 6h5v17h-5zM23 4h5v19h-5z" /></svg>
)
const DownloadIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 5v16m0 0l-6-6m6 6l6-6M5 27h22" /></svg>
)

export default function Sidebar({ view, setView, onLogout }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const close = () => setOpen(false)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  return (
    <aside className="sb">
      <div id="alogo" style={{ cursor: 'pointer' }} onClick={() => setView('home')}><Logo /></div>
      <button className={'si' + (view === 'lib' ? ' on' : '')} onClick={() => setView('lib')}><LibraryIcon /><span>Library</span></button>
      <button className={'si' + (view === 'dl' ? ' on' : '')} onClick={() => setView('dl')}><DownloadIcon /><span>Downloads</span></button>
      <div className="sp"></div>
      <div className={'pf' + (open ? ' open' : '')}>
        <div id="pm"><button id="lo" onClick={onLogout}>Log out</button></div>
        <img id="pfp" alt="profile" src={pfp} onClick={(e) => { e.stopPropagation(); setOpen(!open) }} />
      </div>
    </aside>
  )
}
