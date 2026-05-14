import { twoDigitFrequency } from '../data/statistics'

const maxFreq = Math.max(...Object.values(twoDigitFrequency))

export default function StatsBadge({ analysis }) {
  if (!analysis) return null

  return (
    <div className="bg-white/10 rounded-2xl p-4 text-white">
      <h3 className="font-bold text-yellow-300 mb-3 text-sm uppercase tracking-wider">
        เลขท้าย 2 ตัวที่ถูกเลือกบ่อย (จากชุดนี้)
      </h3>
      <div className="space-y-2">
        {analysis.topBack2.map(({ num, count, freq }) => (
          <div key={num} className="flex items-center gap-3">
            <span className="text-xl font-bold font-mono w-8 text-yellow-200">{num}</span>
            <div className="flex-1 bg-white/10 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all"
                style={{ width: `${(freq / maxFreq) * 100}%` }}
              />
            </div>
            <span className="text-xs text-white/60">ประวัติ {freq} ครั้ง</span>
            <span className="text-xs bg-yellow-500/30 px-2 py-0.5 rounded-full">{count} ใบ</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-white/40 mt-3">
        * สถิติจำลองจากรูปแบบหวยไทยย้อนหลัง 30 ปี (~720 งวด)
      </p>
    </div>
  )
}
