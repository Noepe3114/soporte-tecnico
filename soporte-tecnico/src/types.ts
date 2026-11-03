export type Prioridad = "baja" | "media" | "alta"
export type Estado = "pendiente" | "en proceso" | "resuelta"
export type FiltroEstado = "todas" | Estado

export interface Solicitud {
  id: number
  titulo: string
  descripcion: string
  solicitante: string
  prioridad: Prioridad
  estado: Estado
}

export type NuevaSolicitud = Omit<Solicitud, "id" | "estado">