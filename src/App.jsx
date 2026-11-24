import { useEffect, useState } from 'react'
import DotBackground from './components/DotBackground.jsx'
import Landing from './components/Landing.jsx'
import CampusFlow from './components/CampusFlow.jsx'
import Dashboard from './components/Dashboard.jsx'

export default function App() {
  const [mode, setMode] = useState('landing') // landing | flow | app
  const [student, setStudent] = useState(null)

  // styles.css switches layouts via body.flow / body.app
  useEffect(() => {
    document.body.classList.toggle('flow', mode === 'flow')
    document.body.classList.toggle('app', mode === 'app')
    scrollTo(0, 0)
  }, [mode])

  return (
    <>
      <DotBackground />
      {mode === 'landing' && <Landing onStart={() => setMode('flow')} />}
      {mode === 'flow' && <CampusFlow onExit={() => setMode('landing')} onComplete={(s) => { setStudent(s); setMode('app') }} />}
      {mode === 'app' && <Dashboard student={student} onLogout={() => { setStudent(null); setMode('landing') }} />}
    </>
  )
}
