import { useEffect, useState } from 'react'
import DotBackground from './components/DotBackground.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import { Dashboard, Prep } from './components/Slides.jsx'
import Updates from './components/Updates.jsx'
import Flow from './components/Flow.jsx'
import AppShell from './components/AppShell.jsx'
import useReveal from './hooks/useReveal.js'

// mode: 'site' (landing) -> 'flow' (campus + details) -> 'app' (workspace)
export default function App() {
  const [mode, setMode] = useState('site')
  const [student, setStudent] = useState(null)

  useEffect(() => {
    document.body.classList.toggle('flow', mode === 'flow')
    document.body.classList.toggle('app', mode === 'app')
    scrollTo(0, 0)
  }, [mode])
  useReveal(mode === 'site')

  const start = () => setMode('flow')
  return (
    <>
      <DotBackground />
      {mode === 'site' && (
        <>
          <Navbar onStart={start} />
          <Hero />
          <Dashboard onStart={start} />
          <Prep />
          <Updates onStart={start} />
        </>
      )}
      {mode === 'flow' && <Flow onExit={() => setMode('site')} onDone={(s) => { setStudent(s); setMode('app') }} />}
      {mode === 'app' && <AppShell student={student} onLogout={() => { setStudent(null); setMode('site') }} />}
    </>
  )
}
