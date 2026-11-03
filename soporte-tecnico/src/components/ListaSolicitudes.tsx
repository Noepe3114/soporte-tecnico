import SolicitudItem from "@/components/SolicitudItem"
import type { Estado, Solicitud } from "@/types"

interface Props {
  solicitudes: Solicitud[]
  onCambiarEstado: (id: number, estado: Estado) => void
  onEliminar: (id: number) => void
}

export default function ListaSolicitudes({
  solicitudes,
  onCambiarEstado,
  onEliminar,
}: Props) {
  if (solicitudes.length === 0) {
    return (
      <div className="border-2 border-dashed border-slate-500 bg-white/60 p-8 text-center text-sm font-medium text-slate-600">
        No hay solicitudes para mostrar.
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {solicitudes.map((s) => (
        <SolicitudItem
          key={s.id}
          solicitud={s}
          onCambiarEstado={onCambiarEstado}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  )
}