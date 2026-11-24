// Used for Library (history) and Downloads panes
export default function ActivityList({ entries, emptyText }) {
  if (!entries.length) return <div className="list"><div className="row"><span>{emptyText}</span></div></div>
  return (
    <div className="list">
      {entries.slice().reverse().map((e, i) => <div className="row" key={i}>{e[0]}<span>{e[1]}</span></div>)}
    </div>
  )
}
