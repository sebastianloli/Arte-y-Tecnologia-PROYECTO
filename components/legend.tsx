export function Legend() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 rounded bg-blue-400" />
        <span className="text-sm text-foreground">
          <strong>Azul:</strong> Menor nivel de estrés
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 rounded bg-purple-400" />
        <span className="text-sm text-foreground">
          <strong>Morado:</strong> Mediano nivel de estrés
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 rounded bg-red-400" />
        <span className="text-sm text-foreground">
          <strong>Rojo:</strong> Mayor nivel de estrés
        </span>
      </div>
    </div>
  )
}
