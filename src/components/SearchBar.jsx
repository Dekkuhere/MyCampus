import { useEffect, useRef, useState } from 'react'
import { COMMANDS } from '../data/content.js'

export default function SearchBar({ onRun }) {
  const [v, setV] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const matches = COMMANDS.filter((c) => c.startsWith(v.trim().toLowerCase().replace(/^\//, '')))

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  const run = (t) => { onRun(t); setOpen(false) }

  return (
    <div ref={ref} className={'combo' + (open && matches.length ? ' open' : '')}>
      <input id="q2" value={v} placeholder="/takewhatuneed" autoComplete="off"
        onFocus={() => setOpen(true)} onChange={(e) => { setV(e.target.value); setOpen(true) }}
        onKeyDown={(e) => e.key === 'Enter' && run(v)} />
      <ul id="sg">
        {matches.map((c) => <li key={c} onClick={() => { setV('/' + c); run('/' + c) }}>/{c}</li>)}
      </ul>
    </div>
  )
}
