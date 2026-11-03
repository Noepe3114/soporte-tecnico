import { Button } from "@/components/ui/button"
import type { FiltroEstado } from "@/types"

interface Props {
  filtroActual: FiltroEstado
  conteos: Record<FiltroEstado, number>
  onCambiarFiltro: (filtro: FiltroEstado) => void
}

const opciones: { valor: FiltroEstado; etiqueta: string }[] = [
  { valor: "todas", etiqueta: "Todas" },
  { valor: "pendiente", etiqueta: "Pendientes" },
  { valor: "en proceso", etiqueta: "En proceso" },
  { valor: "resuelta", etiqueta: "Resueltas" },
]

export default function FiltrosSolicitudes({
  filtroActual,
  conteos,
  onCambiarFiltro,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2 border-2 border-slate-800 bg-white p-2 shadow-[4px_4px_0_0_#1e293b]">
      {opciones.map(({ valor, etiqueta }) => {
        const activo = filtroActual === valor
        return (
          <Button
            key={valor}
            variant="outline"
            aria-pressed={activo}
            onClick={() => onCambiarFiltro(valor)}
            className={`rounded-sm border-2 text-xs font-bold uppercase tracking-wider ${
              activo
                ? "border-slate-800 bg-slate-800 text-white hover:bg-slate-800 hover:text-white"
                : "border-transparent bg-transparent text-slate-700 hover:bg-slate-100"
            }`}
          >
            {etiqueta}
            <span className="ml-1 opacity-70">{conteos[valor]}</span>
          </Button>
        )
      })}
    </div>
  )
}