import type { Estado, Prioridad } from "@/types"

export const clasePrioridad: Record<Prioridad, string> = {
  baja: "border-emerald-800 bg-emerald-50 text-emerald-900",
  media: "border-amber-800 bg-amber-50 text-amber-900",
  alta: "border-rose-800 bg-rose-50 text-rose-900",
}

export const claseEstado: Record<Estado, string> = {
  pendiente: "border-slate-800 bg-white text-slate-900",
  "en proceso": "border-blue-800 bg-blue-50 text-blue-900",
  resuelta: "border-slate-500 bg-slate-200 text-slate-600",
}