"use client"

import type { SelectedBlock } from "@/app/page"

interface BlockDetailsProps {
  block: SelectedBlock
  onClose: () => void
}

export function BlockDetails({ block, onClose }: BlockDetailsProps) {
  const stressLevelLabel =
    block.stressLevel === "low"
      ? "Semana con menor estrés"
      : block.stressLevel === "medium"
        ? "Semana en que comenzó el estrés"
        : "Semana con estrés máximo"

  const stressLevelDescription =
    block.stressLevel === "low"
      ? "Esta semana representa el período de menor estrés"
      : block.stressLevel === "medium"
        ? "Esta semana representa cuando el estrés comenzó a aumentar"
        : "Esta semana representa el nivel máximo de estrés"

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{block.major}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            <strong>Semana:</strong> Semana {block.week}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            <strong>Tipo:</strong> {stressLevelLabel}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div
              className={`h-4 w-4 rounded ${
                block.stressLevel === "low"
                  ? "bg-blue-400"
                  : block.stressLevel === "medium"
                    ? "bg-purple-400"
                    : "bg-red-400"
              }`}
            />
            <span className="text-sm font-medium">{stressLevelDescription}</span>
          </div>
        </div>
        <button onClick={onClose} className="text-2xl text-muted-foreground hover:text-foreground">
          ×
        </button>
      </div>
    </div>
  )
}
