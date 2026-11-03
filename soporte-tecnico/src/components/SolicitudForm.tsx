import { useState } from "react"
import type { FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { NuevaSolicitud, Prioridad } from "@/types"

interface Props {
  onAgregar: (solicitud: NuevaSolicitud) => void
}

interface Errores {
  titulo?: string
  descripcion?: string
}

const campo = "rounded-sm border-2 border-slate-800 bg-white"
const mensajeError = "text-sm font-semibold text-rose-800"

export default function SolicitudForm({ onAgregar }: Props) {
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [solicitante, setSolicitante] = useState("")
  const [prioridad, setPrioridad] = useState<Prioridad>("media")
  const [errores, setErrores] = useState<Errores>({})

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const nuevos: Errores = {}
    if (titulo.trim() === "") {
      nuevos.titulo = "El título es obligatorio."
    } else if (titulo.trim().length < 5) {
      nuevos.titulo = "El título debe tener al menos 5 caracteres."
    }
    if (descripcion.trim() === "") {
      nuevos.descripcion = "La descripción es obligatoria."
    } else if (descripcion.trim().length < 10) {
      nuevos.descripcion = "La descripción debe tener al menos 10 caracteres."
    }

    setErrores(nuevos)
    if (Object.keys(nuevos).length > 0) return

    onAgregar({
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      solicitante: solicitante.trim() || "No indicado",
      prioridad,
    })

    setTitulo("")
    setDescripcion("")
    setSolicitante("")
    setPrioridad("media")
  }

  return (
    <Card className="gap-0 rounded-md border-2 border-slate-800 bg-white py-0 shadow-[4px_4px_0_0_#1e293b]">
      <div className="border-b-2 border-slate-800 bg-slate-100 px-5 py-3">
        <h2 className="text-sm font-bold uppercase tracking-widest">
          Nueva solicitud
        </h2>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4 p-5">
        <div className="space-y-1.5">
          <Label htmlFor="titulo" className="text-xs font-bold uppercase tracking-wider">
            Título
          </Label>
          <Input
            id="titulo"
            className={campo}
            value={titulo}
            aria-invalid={Boolean(errores.titulo)}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Resumen del problema"
          />
          {errores.titulo && (
            <p role="alert" className={mensajeError}>
              {errores.titulo}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="descripcion" className="text-xs font-bold uppercase tracking-wider">
            Descripción
          </Label>
          <Textarea
            id="descripcion"
            className={campo}
            rows={4}
            value={descripcion}
            aria-invalid={Boolean(errores.descripcion)}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Detalla qué sucede y desde cuándo"
          />
          {errores.descripcion && (
            <p role="alert" className={mensajeError}>
              {errores.descripcion}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="solicitante" className="text-xs font-bold uppercase tracking-wider">
            Solicitante
          </Label>
          <Input
            id="solicitante"
            className={campo}
            value={solicitante}
            onChange={(e) => setSolicitante(e.target.value)}
            placeholder="Nombre del colaborador"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="prioridad" className="text-xs font-bold uppercase tracking-wider">
            Prioridad
          </Label>
          <Select value={prioridad} onValueChange={(v) => setPrioridad(v as Prioridad)}>
            <SelectTrigger id="prioridad" className={`w-full ${campo}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="baja">Baja</SelectItem>
              <SelectItem value="media">Media</SelectItem>
              <SelectItem value="alta">Alta</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          className="w-full rounded-sm border-2 border-slate-800 bg-blue-800 font-bold uppercase tracking-wider text-white shadow-[3px_3px_0_0_#1e293b] hover:bg-blue-900 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          Registrar solicitud
        </Button>
      </form>
    </Card>
  )
}