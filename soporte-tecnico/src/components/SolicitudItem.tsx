import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { claseEstado, clasePrioridad } from "@/lib/estilos"
import type { Estado, Solicitud } from "@/types"
interface Props {
  solicitud: Solicitud
  onCambiarEstado: (id: number, estado: Estado) => void
  onEliminar: (id: number) => void
}
export default function SolicitudItem({ solicitud, onCambiarEstado, onEliminar }: Props) {
  return (
    <Card className="gap-0 rounded-md border-2 border-slate-800 bg-white py-0 shadow-[4px_4px_0_0_#1e293b]">
      <div className="space-y-3 p-5">
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className={`rounded-sm border-2 font-bold uppercase tracking-wide ${clasePrioridad[solicitud.prioridad]}`}
          >
            Prioridad {solicitud.prioridad}
          </Badge>
          <Badge
            variant="outline"
            className={`rounded-sm border-2 font-bold uppercase tracking-wide ${claseEstado[solicitud.estado]}`}
          >
            {solicitud.estado}
          </Badge>
        </div>
        <h3 className="text-lg font-bold text-slate-900">{solicitud.titulo}</h3>
        <p className="text-sm text-slate-700">{solicitud.descripcion}</p>
        <p className="border-t-2 border-dashed border-slate-300 pt-3 text-xs font-medium uppercase tracking-wider text-slate-500">
          Solicitante: {solicitud.solicitante}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3 border-t-2 border-slate-800 bg-slate-50 px-5 py-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Estado
        </span>
        <Select
          value={solicitud.estado}
          onValueChange={(v) => onCambiarEstado(solicitud.id, v as Estado)}
        >
          <SelectTrigger className="w-40 rounded-sm border-2 border-slate-800 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pendiente">Pendiente</SelectItem>
            <SelectItem value="en proceso">En proceso</SelectItem>
            <SelectItem value="resuelta">Resuelta</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => onEliminar(solicitud.id)}
          className="ml-auto rounded-sm border-2 border-rose-800 bg-white font-bold text-rose-900 hover:bg-rose-50 hover:text-rose-900"
        >
          Eliminar
        </Button>
      </div>
    </Card>
  )
}