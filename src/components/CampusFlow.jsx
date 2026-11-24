import { useState } from 'react'
import Logo from './Logo.jsx'
import { CAMPUSES } from '../data/campuses.js'

function CampusStep({ campus, setCampus, onBack, onNext }) {
  const [q, setQ] = useState(campus || '')
  const [open, setOpen] = useState(false)
  const list = CAMPUSES.filter((c) => c.toLowerCase().includes(q.trim().toLowerCase()))

  return (
    <div className="step on">
      <h2>select ur campus</h2><div className="ul"></div>
      <div className={'combo' + (open ? ' open' : '')} onBlur={() => setTimeout(() => setOpen(false), 150)}>
        <input id="cq" value={q} placeholder="Search or select ur campus" autoComplete="off"
          onFocus={() => setOpen(true)} onChange={(e) => { setQ(e.target.value); setCampus(null); setOpen(true) }} />
        <ul id="cl">
          {list.length
            ? list.map((c) => <li key={c} onMouseDown={() => { setQ(c); setCampus(c); setOpen(false) }}>{c}</li>)
            : <li className="none">ur campus isn’t listed yet</li>}
        </ul>
      </div>
      <div className="nav2">
        <button className="arr" onClick={onBack}>←</button>
        <button className="arr" disabled={!campus} onClick={onNext}>→</button>
      </div>
    </div>
  )
}

function DetailsStep({ onBack, onDone }) {
  const [f, setF] = useState({ name: '', roll: '', course: '' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const ok = f.name.trim() && f.roll.trim() && f.course.trim()
  return (
    <div className="step on">
      <div className="fcard">
        <input placeholder="/name" value={f.name} onChange={set('name')} autoComplete="off" />
        <input placeholder="/rollno." value={f.roll} onChange={set('roll')} autoComplete="off" />
        <input placeholder="/course" value={f.course} onChange={set('course')} autoComplete="off" />
        <div className="arrows">
          <button className="arr" onClick={onBack}>←</button>
          <button className="arr" disabled={!ok} onClick={() => onDone({ name: f.name.trim(), roll: f.roll.trim(), course: f.course.trim() })}>→</button>
        </div>
      </div>
    </div>
  )
}

export default function CampusFlow({ onExit, onComplete }) {
  const [step, setStep] = useState(1)
  const [campus, setCampus] = useState(null)
  return (
    <div id="flow">
      <div className="fh"><Logo /></div>
      {step === 1
        ? <CampusStep campus={campus} setCampus={setCampus} onBack={onExit} onNext={() => setStep(2)} />
        : <DetailsStep onBack={() => setStep(1)} onDone={(d) => onComplete({ ...d, campus })} />}
    </div>
  )
}
