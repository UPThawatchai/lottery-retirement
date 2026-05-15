export default function PrintableTickets({ tickets, onClose }) {
  const handlePrint = () => window.print()

  const today = new Date().toLocaleDateString('th-TH', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  // Next draw date
  const now = new Date()
  const day = now.getDate()
  const month = now.getMonth()
  const year = now.getFullYear()
  let next
  if (day < 16) {
    next = new Date(year, month, 16)
  } else {
    next = new Date(year, month + 1, 1)
  }
  const nextDraw = next.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <>
      {/* Screen UI */}
      <div className="no-print fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full p-6 text-gray-900">
          <h2 className="text-xl font-black text-center mb-2">🖨️ พรีวิวการพิมพ์</h2>
          <p className="text-sm text-gray-500 text-center mb-4">ตั๋วหวย {tickets.length} ใบ งวด {nextDraw}</p>
          <div className="grid grid-cols-4 gap-2 mb-6 max-h-72 overflow-y-auto">
            {tickets.map((num, i) => (
              <div key={i} className="border-2 border-dashed border-yellow-500 rounded-lg p-2 text-center bg-yellow-50">
                <div className="text-xs text-gray-400">ใบที่ {i + 1}</div>
                <div className="font-black text-lg tracking-widest font-mono">{num}</div>
                <div className="text-xs text-gray-500">฿50</div>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              onClick={handlePrint}
              className="flex-1 py-3 rounded-xl font-black bg-yellow-400 hover:bg-yellow-300 text-yellow-900 transition-colors shadow-lg"
            >
              🖨️ พิมพ์เลย
            </button>
          </div>
        </div>
      </div>

      {/* Print layout (hidden on screen) */}
      <div className="print-only hidden">
        <div className="print-header">
          <h1>🎰 สุ่มหวยเกษียณ</h1>
          <p>วันที่สุ่ม: {today} · งวด: {nextDraw} · {tickets.length} ใบ · รวม {tickets.length * 50} บาท</p>
        </div>
        <div className="print-ticket-grid">
          {tickets.map((num, i) => (
            <div key={i} className="print-ticket">
              <div className="ticket-label">ใบที่ {i + 1}</div>
              <div className="ticket-num">{num}</div>
              <div className="ticket-price">฿50</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
