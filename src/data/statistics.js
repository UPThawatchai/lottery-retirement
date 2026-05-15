import { historyTwoDigitFrequency, historyThreeDigitFrequency } from './lotteryHistory'

// ความถี่เลขท้าย 2 ตัว — คำนวณจากประวัติ 30 ปี (~720 งวด)
export const twoDigitFrequency = historyTwoDigitFrequency

// ความถี่เลขท้าย 3 ตัว — คำนวณจากประวัติ 30 ปี
export const threeDigitFrequency = historyThreeDigitFrequency

export const PRIZE_TYPES = {
  FIRST: { label: 'รางวัลที่ 1', prize: 6000000, digits: 6 },
  FRONT3: { label: 'รางวัลเลขหน้า 3 ตัว', prize: 4000, digits: 3 },
  BACK3: { label: 'รางวัลเลขท้าย 3 ตัว', prize: 4000, digits: 3 },
  BACK2: { label: 'รางวัลเลขท้าย 2 ตัว', prize: 2000, digits: 2 },
}

export function buildWeightedPool(frequencyMap) {
  const pool = []
  for (const [num, freq] of Object.entries(frequencyMap)) {
    const weight = Math.max(freq, 1)
    for (let i = 0; i < weight; i++) {
      pool.push(num)
    }
  }
  return pool
}
