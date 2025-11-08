"use client"

import { useState } from "react"
import { MuralGrid } from "@/components/mural-grid"
import { Legend } from "@/components/legend"
import { MajorFilter } from "@/components/major-filter"
import { BlockDetails } from "@/components/block-details"
import { stressData } from "@/lib/stress-data"

export interface SelectedBlock {
  major: string
  week: number
  stressLevel: "low" | "medium" | "high"
}

export default function Home() {
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null)
  const [selectedBlock, setSelectedBlock] = useState<SelectedBlock | null>(null)

  const majors = stressData.map((entry) => entry.major)
  const uniqueMajors = Array.from(new Set(majors))

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card p-6">
        <h1 className="text-3xl font-bold text-pretty">SEMESTRE BAJO PRESIÓN: MURAL PARTICIPATIVO</h1>
        <p className="mt-2 text-muted-foreground">Visualizando niveles de estrés a lo largo del semestre</p>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full border-b border-border bg-card p-6 lg:w-64 lg:border-b-0 lg:border-r lg:min-h-[calc(100vh-100px)] lg:overflow-y-auto">
          <div className="space-y-6">
            {/* Legend */}
            <div>
              <h2 className="mb-4 text-lg font-semibold">Niveles de Estrés</h2>
              <Legend />
            </div>

            {/* Filter */}
            <div>
              <h2 className="mb-4 text-lg font-semibold">Filtrar por Carrera</h2>
              <MajorFilter majors={uniqueMajors} selectedMajor={selectedMajor} onSelectMajor={setSelectedMajor} />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Mural Grid */}
            <div className="rounded-lg border border-border bg-card p-6">
              <MuralGrid
                data={stressData}
                selectedMajor={selectedMajor}
                onBlockClick={setSelectedBlock}
                selectedBlock={selectedBlock}
              />
            </div>

            {/* Block Details */}
            {selectedBlock && <BlockDetails block={selectedBlock} onClose={() => setSelectedBlock(null)} />}
          </div>
        </main>
      </div>
    </div>
  )
}
