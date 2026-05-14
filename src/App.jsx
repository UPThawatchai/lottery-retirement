import { useLottery } from './hooks/useLottery'
import TicketGrid from './components/TicketGrid'
import StatsBadge from './components/StatsBadge'
import './index.css'

const STRATEGIES = [
  { id: 'stat', label: '📊 อิงสถิติ', desc: 'เลขที่ออกบ่อยในอดีต' },
  { id: 'lucky', label: '🍀 เลขมงคล', desc: 'เลขซ้ำ เลขกลม สวยงาม' },
  { id: 'random', label: '🎲 สุ่มเต็ม', desc: 'สุ่มอิสระ 100%' },
]

export default function App() {
  const {
    tickets, isGenerating, strategy, setStrategy,
    analysis, generate, regenerateOne,
    budget, ticketPrice, weeklyCount,
  } = useLottery()

  const nextDrawDate = getNextDrawDate()

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <header className="text-center py-8 px-4">
        <div className="text-5xl mb-3">🎰</div>
        <h1 className="text-3xl font-black mb-1 text-yellow-300">สุ่มหวยเกษียณ</h1>
        <p className="text-white/60 text-sm">
          อิงสถิติหวยไทยย้อนหลัง 30 ปี · {weeklyCount} ใบ/สัปดาห์ · {budget.toLocaleString()} บาท
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-16 space-y-6">

        {/* Info cards */}
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { label: 'ราคา/ใบ', value: `${ticketPrice} บาท`, icon: '💵' },
            { label: 'จำนวนใบ', value: `${weeklyCount} ใบ`, icon: '🎟️' },
            { label: 'งวดถัดไป', value: nextDrawDate, icon: '📅' },
          ].map(card => (
            <div key={card.label} className="bg-white/10 rounded-2xl p-3">
              <div className="text-xl mb-1">{card.icon}</div>
              <div className="font-bold text-yellow-200 text-sm">{card.value}</div>
              <div className="text-white/50 text-xs">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Strategy selector */}
        <div className="bg-white/10 rounded-2xl p-4">
          <h2 className="text-sm font-bold text-white/70 uppercase tracking-wider mb-3">
            วิธีสุ่ม
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {STRATEGIES.map(s => (
              <button
                key={s.id}
                onClick={() => setStrategy(s.id)}
                className={`p-3 rounded-xl text-left transition-all ${
                  strategy === s.id
                    ? 'bg-yellow-400 text-yellow-900 shadow-lg scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <div className="font-bold text-sm">{s.label}</div>
                <div className={`text-xs mt-0.5 ${strategy === s.id ? 'text-yellow-800' : 'text-white/50'}`}>
                  {s.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={generate}
          disabled={isGenerating}
          className={`w-full py-5 rounded-2xl font-black text-xl transition-all shadow-2xl
            ${isGenerating
              ? 'bg-yellow-600 cursor-not-allowed'
              : 'bg-yellow-400 hover:bg-yellow-300 text-yellow-900 animate-pulse-gold active:scale-95'
            }`}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-3">
              <span className="inline-block w-5 h-5 border-3 border-yellow-900 border-t-transparent rounded-full animate-spin-slow" />
              กำลังสุ่ม...
            </span>
          ) : (
            `🎰 สุ่มเลข ${weeklyCount} ใบ (${budget.toLocaleString()} บาท)`
          )}
        </button>

        {/* Ticket grid */}
        {tickets.length > 0 && (
          <>
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold text-yellow-300">
                  เลขของคุณ ({tickets.length} ใบ)
                </h2>
                <span className="text-white/40 text-xs">กดที่ใบเพื่อสุ่มใบนั้นใหม่</span>
              </div>
              <TicketGrid tickets={tickets} onRegenerate={regenerateOne} />
            </div>

            {/* Analysis */}
            <StatsBadge analysis={analysis} />

            {/* Summary */}
            <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-2xl p-4 text-center">
              <p className="text-yellow-300 font-bold text-lg">
                งบรวม {budget.toLocaleString()} บาท/สัปดาห์
              </p>
              <p className="text-white/60 text-sm mt-1">
                เก็บออมแทนซื้อหวย 20 ปี = {(budget * 52 * 20).toLocaleString()} บาท (ก่อนดอกเบี้ย)
              </p>
            </div>
          </>
        )}

        {/* Empty state */}
        {tickets.length === 0 && (
          <div className="text-center text-white/30 py-16">
            <div className="text-6xl mb-4">🎟️</div>
            <p>กดปุ่มด้านบนเพื่อสุ่มเลขหวย</p>
          </div>
        )}
      </main>
    </div>
  )
}

function getNextDrawDate() {
  const now = new Date()
  const day = now.getDate()
  const month = now.getMonth()
  const year = now.getFullYear()

  let next
  if (day < 1) {
    next = new Date(year, month, 1)
  } else if (day < 16) {
    next = new Date(year, month, 16)
  } else {
    next = new Date(year, month + 1, 1)
  }

  return next.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' })
}
