import Logo from './Logo.jsx'

export default function Navbar({ onStart }) {
  return (
    <nav>
      <Logo />
      <a className="gs" href="#dashboard" onClick={(e) => { e.preventDefault(); onStart() }}>Get started</a>
    </nav>
  )
}
