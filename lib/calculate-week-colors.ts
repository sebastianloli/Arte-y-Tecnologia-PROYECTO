import { stressData } from "./stress-data"

export function calculatePredominantColors(selectedMajor?: string | null): string[] {
  const weekColors: Record<number, { lowest: number; begin: number; highest: number }> = {}

  // Initialize week counters
  for (let i = 1; i <= 16; i++) {
    weekColors[i] = { lowest: 0, begin: 0, highest: 0 }
  }

  // Count all stress responses for each week, filtered by major if provided
  stressData.forEach((entry) => {
    if (selectedMajor && entry.major !== selectedMajor) return

    if (weekColors[entry.lowestStressWeek]) {
      weekColors[entry.lowestStressWeek].lowest++
    }
    if (weekColors[entry.beginStressWeek]) {
      weekColors[entry.beginStressWeek].begin++
    }
    if (weekColors[entry.highestStressWeek]) {
      weekColors[entry.highestStressWeek].highest++
    }
  })

  const colors: string[] = []
  for (let i = 1; i <= 16; i++) {
    const counts = weekColors[i]
    const max = Math.max(counts.lowest, counts.begin, counts.highest)

    if (max === 0) {
      colors.push("rgb(96, 165, 250)") // blue
    } else if (max === counts.lowest) {
      colors.push("rgb(96, 165, 250)") // blue
    } else if (max === counts.begin) {
      colors.push("rgb(147, 112, 219)") // purple
    } else {
      colors.push("rgb(244, 63, 94)") // red
    }
  }

  return colors
}

export function getWeekMajors(selectedMajor?: string | null): string[] {
  if (selectedMajor) {
    return Array(16).fill(selectedMajor)
  }

  const weekMajors: Record<number, Record<string, number>> = {}

  // Initialize week counters
  for (let i = 1; i <= 16; i++) {
    weekMajors[i] = {}
  }

  // Count all majors for each week (combining all three stress response types)
  stressData.forEach((entry) => {
    for (const week of [entry.lowestStressWeek, entry.beginStressWeek, entry.highestStressWeek]) {
      if (weekMajors[week]) {
        weekMajors[week][entry.major] = (weekMajors[week][entry.major] || 0) + 1
      }
    }
  })

  // Get the major with most responses for each week
  const majors: string[] = []
  for (let i = 1; i <= 16; i++) {
    const majorCounts = weekMajors[i]
    let topMajor = "Art"
    let maxCount = 0

    Object.entries(majorCounts).forEach(([major, count]) => {
      if (count > maxCount) {
        maxCount = count
        topMajor = major
      }
    })

    majors.push(topMajor)
  }

  return majors
}
