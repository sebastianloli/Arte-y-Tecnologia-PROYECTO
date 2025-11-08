"use client"

import type { StressEntry } from "@/lib/stress-data"
import type { SelectedBlock } from "@/app/page"

interface MuralGridProps {
  data: StressEntry[]
  selectedMajor: string | null
  onBlockClick: (block: SelectedBlock) => void
  selectedBlock: SelectedBlock | null
}

export function MuralGrid({ data, selectedMajor, onBlockClick, selectedBlock }: MuralGridProps) {
  const filteredData = selectedMajor ? data.filter((entry) => entry.major === selectedMajor) : data

  const weeks = Array.from({ length: 16 }, (_, i) => i + 1)

  // Each week contains all blocks (from all majors/responses) for that week
  const weekGroups = weeks.map((week) => {
    const blocksForWeek: Array<{
      major: string
      week: number
      stressLevel: "low" | "medium" | "high"
    }> = []

    filteredData.forEach((entry) => {
      if (entry.lowestStressWeek === week) {
        blocksForWeek.push({
          major: entry.major,
          week,
          stressLevel: "low",
        })
      }
      if (entry.beginStressWeek === week) {
        blocksForWeek.push({
          major: entry.major,
          week,
          stressLevel: "medium",
        })
      }
      if (entry.highestStressWeek === week) {
        blocksForWeek.push({
          major: entry.major,
          week,
          stressLevel: "high",
        })
      }
    })

    return { week, blocks: blocksForWeek }
  })

  const getBlockColor = (stressLevel: "low" | "medium" | "high") => {
    if (stressLevel === "low") return "bg-blue-300"
    if (stressLevel === "medium") return "bg-purple-400"
    return "bg-red-400"
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-2">
        {weekGroups.map(({ week, blocks }) => (
          <div key={`week-${week}`} className="flex flex-col">
            {/* Week header */}
            <div className="mb-2 h-8 w-16 flex-shrink-0 flex items-center justify-center text-center text-xs font-semibold text-foreground border-b border-border">
              Semana {week}
            </div>

            {/* Blocks stacked vertically */}
            <div className="flex flex-col gap-0.5 flex-wrap content-start h-fit">
              {blocks.map((block, idx) => (
                <button
                  key={`block-${week}-${idx}-${block.stressLevel}`}
                  onClick={() => onBlockClick(block)}
                  className={`h-2 w-3 rounded-sm transition-all hover:scale-125 ${getBlockColor(block.stressLevel)} ${
                    selectedBlock?.week === week &&
                    selectedBlock?.major === block.major &&
                    selectedBlock?.stressLevel === block.stressLevel
                      ? "ring-2 ring-ring"
                      : ""
                  }`}
                  title={`${block.major} - Semana ${week} - Nivel: ${
                    block.stressLevel === "low" ? "Bajo" : block.stressLevel === "medium" ? "Medio" : "Alto"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
