export default function Logo(props) {
  return (
    <svg viewBox="0 0 100 90" aria-label="For1 logo" {...props}>
      <path fill="#5C56D6" d="M4 86V30C4 14 14 4 28 4c12 0 19 8 22 22 3-14 10-22 22-22 14 0 24 10 24 26v56c0 0-14 0-14-14V40c0-8-8-8-8 0v20c-4 6-14 6-18 0V40c0-8-8-8-8 0v32c0 14-14 14-14 14z" />
      <circle cx="36" cy="76" r="5" fill="var(--bg)" />
      <circle cx="64" cy="76" r="5" fill="var(--bg)" />
    </svg>
  )
}
