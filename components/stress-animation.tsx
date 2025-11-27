"use client"

import { useState } from "react"
import { calculatePredominantColors, getWeekMajors } from "@/lib/calculate-week-colors"

const WEEKS = 16
const DURATION_PER_WEEK = 1.25

interface StressAnimationProps {
  selectedMajor?: string | null
}

export function StressAnimation({ selectedMajor }: StressAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentWeek, setCurrentWeek] = useState(0)
  const [backgroundColor, setBackgroundColor] = useState("transparent")

  const weekColors = calculatePredominantColors(selectedMajor)
  const weekMajors = getWeekMajors(selectedMajor)
  const displayMajor = selectedMajor || "Todas las Carreras"

  const handleStressClick = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentWeek(0)

    let weekIndex = 0
    const interval = setInterval(() => {
      if (weekIndex < WEEKS) {
        setCurrentWeek(weekIndex + 1)
        setBackgroundColor(weekColors[weekIndex])
        weekIndex++
      } else if (weekIndex === WEEKS) {
        setBackgroundColor("white")
        weekIndex++
      } else {
        // Animation complete
        clearInterval(interval)
        setIsAnimating(false)
        setCurrentWeek(0)
        setBackgroundColor("transparent")
      }
    }, DURATION_PER_WEEK * 1000)
  }

  return (
    <>
      <button
        onClick={handleStressClick}
        disabled={isAnimating}
        className="mb-6 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        ESTRÉS
      </button>

      {isAnimating && (
        <div
          className="fixed inset-0 z-50 w-screen h-screen transition-colors"
          style={{ backgroundColor, transitionDuration: `${DURATION_PER_WEEK}s` }}
        >
          {currentWeek > 0 && currentWeek <= WEEKS && (
            <div className="absolute top-6 right-6 text-right">
              <h2
                className="text-2xl font-bold mb-2"
                style={{ color: backgroundColor === "white" ? "black" : "white" }}
              >
                SEMANA {currentWeek}
              </h2>
              <p className="text-lg font-semibold" style={{ color: backgroundColor === "white" ? "black" : "white" }}>
                {displayMajor}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  )
}
