export default function TicketGrid({ tickets, onRegenerate }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {tickets.map((num, i) => (
        <div key={i} className="ticket group cursor-pointer" onClick={() => onRegenerate(i)}>
          <div className="text-xs text-yellow-700 mb-1 font-semibold">ใบที่ {i + 1}</div>
          <div className="lottery-number">{num}</div>
          <div className="text-xs text-gray-400 mt-1">50 บาท</div>
          <div className="absolute inset-0 bg-yellow-100 opacity-0 group-hover:opacity-30 rounded-xl transition-opacity flex items-center justify-center">
            <span className="text-xs text-yellow-800 font-bold opacity-0 group-hover:opacity-100">🔄 สุ่มใหม่</span>
          </div>
        </div>
      ))}
    </div>
  )
}
