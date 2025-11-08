"use client"

interface MajorFilterProps {
  majors: string[]
  selectedMajor: string | null
  onSelectMajor: (major: string | null) => void
}

export function MajorFilter({ majors, selectedMajor, onSelectMajor }: MajorFilterProps) {
  return (
    <div className="space-y-2">
      <button
        onClick={() => onSelectMajor(null)}
        className={`block w-full rounded-md px-4 py-2 text-left text-sm font-medium transition-colors ${selectedMajor === null ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"
          }`}
      >
        Todas las carreras
      </button>
      {majors.map((major) => (
        <button
          key={major}
          onClick={() => onSelectMajor(major)}
          className={`block w-full rounded-md px-4 py-2 text-left text-sm font-medium transition-colors ${selectedMajor === major ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"
            }`}
        >
          {major}
        </button>
      ))}
    </div>
  )
}
