import { useState } from "react"
import FiltrosSolicitudes from "@/components/FiltrosSolicitudes"
import ListaSolicitudes from "@/components/ListaSolicitudes"
import SolicitudForm from "@/components/SolicitudForm"
import type {
  Estado,
  FiltroEstado,
  NuevaSolicitud,
  Solicitud,
} from "@/types"
const datosIniciales: Solicitud[] = [
  {
    id: 1,
    titulo: "Impresora del segundo piso sin conexión",
    descripcion: "No aparece en la red desde la mañana y nadie puede imprimir.",
    solicitante: "Carla Rojas",
    prioridad: "media",
    estado: "pendiente",
  },
  {
    id: 2,
    titulo: "Acceso al correo bloqueado",
    descripcion: "El correo institucional pide una contraseña que ya no funciona.",
    solicitante: "Luis Paredes",
    prioridad: "alta",
    estado: "en proceso",
  },
  {
    id: 3,
    titulo: "Instalar Office en laptop nueva",
    descripcion: "Se necesita Word y Excel en el equipo asignado a contabilidad.",
    solicitante: "Marta Quispe",
    prioridad: "baja",
    estado: "resuelta",
  },
]
export default function App() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>(datosIniciales)
  const [filtro, setFiltro] = useState<FiltroEstado>("todas")

  const agregarSolicitud = (nueva: NuevaSolicitud) => {
    setSolicitudes((prev) => [
      { ...nueva, id: Date.now(), estado: "pendiente" },
      ...prev,
    ])
  }
  const cambiarEstado = (id: number, estado: Estado) => {
    setSolicitudes((prev) => prev.map((s) => (s.id === id ? { ...s, estado } : s)))
  }
  const eliminarSolicitud = (id: number) => {
    setSolicitudes((prev) => prev.filter((s) => s.id !== id))
  }
  const visibles =
    filtro === "todas" ? solicitudes : solicitudes.filter((s) => s.estado === filtro)
  const conteos: Record<FiltroEstado, number> = {
    todas: solicitudes.length,
    pendiente: solicitudes.filter((s) => s.estado === "pendiente").length,
    "en proceso": solicitudes.filter((s) => s.estado === "en proceso").length,
    resuelta: solicitudes.filter((s) => s.estado === "resuelta").length,
  }
  return (
    <div className="min-h-screen bg-[#f4f1ea] px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 border-2 border-slate-800 bg-white p-6 shadow-[6px_6px_0_0_#1e293b]">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-800">
            Mesa de ayuda
          </p>
          <h1 className="mt-1 text-3xl font-extrabold">
            Solicitudes de soporte técnico
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Registro y seguimiento de incidencias de los colaboradores.
          </p>
        </header>
        <div className="grid items-start gap-8 lg:grid-cols-[360px_1fr]">
          <SolicitudForm onAgregar={agregarSolicitud} />

          <div className="space-y-5">
            <FiltrosSolicitudes
              filtroActual={filtro}
              conteos={conteos}
              onCambiarFiltro={setFiltro}
            />
            <ListaSolicitudes
              solicitudes={visibles}
              onCambiarEstado={cambiarEstado}
              onEliminar={eliminarSolicitud}
            />
          </div>
        </div>
      </div>
    </div>
  )
}