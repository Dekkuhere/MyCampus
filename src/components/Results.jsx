export default function Results({ items, empty, onAct }) {
  if (empty) return <div className="list" id="res"><div className="row"><span>{empty}</span></div></div>
  return (
    <div className="list" id="res">
      {items.map((it, i) => (
        <ResultRow key={i} it={it} onAct={onAct} />
      ))}
    </div>
  )
}

import { useState } from 'react'
function ResultRow({ it, onAct }) {
  const [done, setDone] = useState(false)
  return (
    <div className="row">{it.title}<span>{it.sub}</span>
      <b className="act" onClick={() => { setDone(true); onAct(it) }}>{done ? (it.kind === 'd' ? 'Downloaded ✓' : 'Opened ✓') : it.action}</b>
    </div>
  )
}
