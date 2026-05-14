import { useState, useCallback } from 'react'
import { twoDigitFrequency, threeDigitFrequency, buildWeightedPool } from '../data/statistics'

const TICKET_PRICE = 50
const WEEKLY_TICKETS = 60
const WEEKLY_BUDGET = TICKET_PRICE * WEEKLY_TICKETS // 3000 บาท

function pickFromPool(pool) {
  return pool[Math.floor(Math.random() * pool.length)]
}

function generateSixDigitNumber(back2Pool, back3Pool) {
  // สร้างเลข 6 หลักโดยอิงจากสถิติ:
  // - เลข 3 ตัวหลัง อิงจาก back3Pool
  // - เลข 3 ตัวหน้า สุ่มอิสระ แต่ให้เลข back2 ตรงกับสถิติ
  const back3 = pickFromPool(back3Pool)
  const front3 = String(Math.floor(Math.random() * 1000)).padStart(3, '0')
  return front3 + back3
}

function generateTickets(count, strategy) {
  const back2Pool = buildWeightedPool(twoDigitFrequency)
  const back3Pool = buildWeightedPool(threeDigitFrequency)

  const tickets = new Set()
  let attempts = 0

  while (tickets.size < count && attempts < count * 10) {
    let num

    if (strategy === 'stat') {
      // อิงสถิติ: ให้เลขท้าย 2 ตัวมีน้ำหนักตามความถี่
      const back2 = pickFromPool(back2Pool)
      const front4 = String(Math.floor(Math.random() * 10000)).padStart(4, '0')
      num = front4 + back2
    } else if (strategy === 'lucky') {
      // เลขมงคล: เลขซ้ำ เลขกลม
      const patterns = [
        () => {
          const d = Math.floor(Math.random() * 10)
          return String(d).repeat(6)
        },
        () => {
          const base = Math.floor(Math.random() * 10)
          return (String(base) + String(9 - base)).repeat(3)
        },
        () => {
          const start = Math.floor(Math.random() * 4) + 1
          return Array.from({ length: 6 }, (_, i) => (start + i) % 10).join('')
        },
        () => {
          const d = Math.floor(Math.random() * 10)
          return (String(d).repeat(3)) + String(Math.floor(Math.random() * 1000)).padStart(3, '0')
        },
      ]
      const fn = patterns[Math.floor(Math.random() * patterns.length)]
      num = fn()
    } else {
      // สุ่มทั่วไปจากสถิติรวม
      num = generateSixDigitNumber(back2Pool, back3Pool)
    }

    tickets.add(num)
    attempts++
  }

  // ถ้ายังไม่ครบ เติมด้วยการสุ่มทั่วไป
  while (tickets.size < count) {
    tickets.add(String(Math.floor(Math.random() * 1000000)).padStart(6, '0'))
  }

  return Array.from(tickets)
}

function analyzeTickets(tickets) {
  const back2Count = {}
  const back3Count = {}

  for (const t of tickets) {
    const b2 = t.slice(-2)
    const b3 = t.slice(-3)
    back2Count[b2] = (back2Count[b2] || 0) + 1
    back3Count[b3] = (back3Count[b3] || 0) + 1
  }

  const topBack2 = Object.entries(back2Count)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([num, count]) => ({ num, count, freq: twoDigitFrequency[num] || 0 }))

  return { topBack2, totalTickets: tickets.length }
}

export function useLottery() {
  const [tickets, setTickets] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [strategy, setStrategy] = useState('stat')
  const [analysis, setAnalysis] = useState(null)

  const generate = useCallback(() => {
    setIsGenerating(true)
    setTimeout(() => {
      const newTickets = generateTickets(WEEKLY_TICKETS, strategy)
      setTickets(newTickets)
      setAnalysis(analyzeTickets(newTickets))
      setIsGenerating(false)
    }, 800)
  }, [strategy])

  const regenerateOne = useCallback((index) => {
    setTickets(prev => {
      const updated = [...prev]
      const back2Pool = buildWeightedPool(twoDigitFrequency)
      const back3Pool = buildWeightedPool(threeDigitFrequency)
      updated[index] = generateSixDigitNumber(back2Pool, back3Pool)
      return updated
    })
  }, [])

  return {
    tickets,
    isGenerating,
    strategy,
    setStrategy,
    analysis,
    generate,
    regenerateOne,
    budget: WEEKLY_BUDGET,
    ticketPrice: TICKET_PRICE,
    weeklyCount: WEEKLY_TICKETS,
  }
}
