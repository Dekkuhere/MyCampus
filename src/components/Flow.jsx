import { useEffect, useRef, useState } from 'react'
import Logo from './Logo.jsx'
import { CAMPUSES } from '../data.js'

export default function Flow({ onExit, onDone }) {
  const [step, setStep] = useState(1)
  const [q, setQ] = useState('')
  const [campus, setCampus] = useState(null)
  const [open, setOpen] = useState(false)
  const [f, setF] = useState({ name: '', roll: '', course: '' })
  const box = useRef(null)
  const refs = { name: useRef(null), roll: useRef(null), course: useRef(null) }

  useEffect(() => {
    const close = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false) }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  const list = CAMPUSES.filter((c) => c.toLowerCase().includes(q.trim().toLowerCase()))
  const valid = f.name.trim() && f.roll.trim() && f.course.trim()

  function pick(c) {
    setQ(c); setCampus(c); setOpen(false)
    setTimeout(() => setStep(2), 250) // auto-forward after choosing
  }
  function submit() { onDone({ campus, name: f.name.trim(), roll: f.roll.trim(), course: f.course.trim() }) }
  function onKey(e) {
    if (e.key !== 'Enter') return
    if (valid) submit()
    else { const k = ['name', 'roll', 'course'].find((n) => !f[n].trim()); refs[k].current?.focus() }
  }
  const field = (k, ph, id) => (
    <input id={id} ref={refs[k]} placeholder={ph} autoComplete="off" value={f[k]} onKeyDown={onKey} onChange={(e) => setF({ ...f, [k]: e.target.value })} />
  )

  return (
    <div id="flow">
      <div className="fh" id="fh"><Logo onClick={onExit} /></div>
      {step === 1 && (
        <div className="step on" id="s1">
          <h2>select ur campus</h2>
          <div className="ul" />
          <div className={'combo' + (open ? ' open' : '')} id="cb" ref={box}>
            <input id="cq" placeholder="Search or select ur campus" autoComplete="off" value={q}
              onFocus={() => setOpen(true)} onChange={(e) => { setQ(e.target.value); setCampus(null); setOpen(true) }} />
            <ul id="cl">
              {list.length
                ? list.map((c) => <li key={c} onClick={() => pick(c)}>{c}</li>)
                : <li className="none">ur campus isn’t listed yet</li>}
            </ul>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="step on" id="s2">
          <h2>about u</h2>
          <div className="ul" />
          <p className="who" id="cp" style={{ margin: '-8px 0 24px' }}>📍 {campus}</p>
          <div className="fcard">
            {field('name', '/name', 'nm')}
            {field('roll', '/rollno.', 'rl')}
            {field('course', '/course', 'cs')}
            <div className="arrows">
              <button className="arr" onClick={() => setStep(1)}>←</button>
              <button className="arr nx" disabled={!valid} onClick={submit}>Next</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
