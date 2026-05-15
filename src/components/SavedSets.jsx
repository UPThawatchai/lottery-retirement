const STRATEGY_LABELS = { stat: '📊 อิงสถิติ', lucky: '🍀 เลขมงคล', random: '🎲 สุ่มเต็ม' }

export default function SavedSets({ savedSets, onLoad, onDelete }) {
  if (savedSets.length === 0) {
    return (
      <div className="bg-white/10 rounded-2xl p-6 text-center text-white/40">
        <div className="text-4xl mb-2">📂</div>
        <p className="text-sm">ยังไม่มีชุดที่บันทึกไว้<br />กดสุ่มแล้วกด "บันทึกชุดนี้" เพื่อเก็บ</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {savedSets.map(set => (
        <div key={set.id} className="bg-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-yellow-300 font-bold text-sm">{set.date}</span>
              <span className="ml-2 text-white/50 text-xs">{STRATEGY_LABELS[set.strategy] || set.strategy}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onLoad(set)}
                className="text-xs px-3 py-1 bg-yellow-400/20 hover:bg-yellow-400/40 text-yellow-300 rounded-lg transition-colors"
              >
                โหลด
              </button>
              <button
                onClick={() => onDelete(set.id)}
                className="text-xs px-3 py-1 bg-red-400/20 hover:bg-red-400/40 text-red-300 rounded-lg transition-colors"
              >
                ลบ
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {set.tickets.slice(0, 12).map((t, i) => (
              <span key={i} className="text-xs font-mono bg-black/30 text-white/70 px-2 py-0.5 rounded">
                {t}
              </span>
            ))}
            {set.tickets.length > 12 && (
              <span className="text-xs text-white/40">+{set.tickets.length - 12} ใบ</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
