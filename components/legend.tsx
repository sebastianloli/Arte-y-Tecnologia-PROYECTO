export function Legend() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 rounded bg-blue-400" />
        <span className="text-sm text-foreground">
          <strong>Blue:</strong> Lowest stress level
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 rounded bg-purple-400" />
        <span className="text-sm text-foreground">
          <strong>Purple:</strong> Medium stress level
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 rounded bg-red-400" />
        <span className="text-sm text-foreground">
          <strong>Red:</strong> Highest stress level
        </span>
      </div>
    </div>
  )
}
