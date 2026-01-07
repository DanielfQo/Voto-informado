import React, { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { partidos } from "../data/data"

type Partido = typeof partidos[number]

type Props = {
  open: boolean
  left: Partido | null
  right: Partido | null
  onClose: () => void
}

type Tema = "Todos" | "Economía" | "Salud" | "Educación" | "Gobernanza"
type Tipo = "Todos" | "Concreta" | "Promesa"

const TEMAS: Tema[] = ["Todos", "Economía", "Salud", "Educación", "Gobernanza"]
const TIPOS: Tipo[] = ["Todos", "Concreta", "Promesa"]

function filtrarPropuestas(partido: Partido, tema: Tema, tipo: Tipo) {
  return (partido.propuestas || []).filter((p) => {
    const okTema = tema === "Todos" ? true : p.tema === tema
    const okTipo = tipo === "Todos" ? true : p.tipo === tipo
    return okTema && okTipo
  })
}

function Chip({ children, variant }: { children: React.ReactNode; variant?: "green" | "red" }) {
  const bg = variant === "green" ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)"
  const bd = variant === "green" ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)"
  const tx = variant === "green" ? "#166534" : "#991b1b"

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 10px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 800,
        background: bg,
        border: `1px solid ${bd}`,
        color: tx,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  )
}

const ComparisonModal: React.FC<Props> = ({ open, left, right, onClose }) => {
  const [tema, setTema] = useState<Tema>("Todos")
  const [tipo, setTipo] = useState<Tipo>("Todos")

  const leftList = useMemo(() => (left ? filtrarPropuestas(left, tema, tipo) : []), [left, tema, tipo])
  const rightList = useMemo(() => (right ? filtrarPropuestas(right, tema, tipo) : []), [right, tema, tipo])

  if (!open || !left || !right) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 0.25 }}
        style={{
          width: "min(1000px, 95vw)",
          height: "min(720px, 85vh)",   // ✅ alto fijo
          overflow: "hidden",          // ✅ scroll interno
          background: "rgba(255,255,255,0.98)",
          borderRadius: "22px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER FIJO */}
        <div
          style={{
            flex: "0 0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 18px",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            background: "rgba(255,255,255,0.98)",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <h3 style={{ margin: 0, fontSize: 18 }}>Comparación</h3>
            <div style={{ color: "#6b7280", fontSize: 12, fontWeight: 600 }}>
              Filtra por tema y diferencia <b>Promesas</b> vs <b>Propuestas Concretas</b>.
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "#ef4444",
              color: "white",
              padding: "8px 12px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: 800,
            }}
          >
            Cerrar
          </button>
        </div>

        {/* FILTROS (fijos) */}
        <div
          style={{
            flex: "0 0 auto",
            padding: "12px 18px",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Tema */}
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: "#374151" }}>Tema:</span>
            {TEMAS.map((t) => (
              <button
                key={t}
                onClick={() => setTema(t)}
                style={{
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: tema === t ? "#111827" : "white",
                  color: tema === t ? "white" : "#111827",
                  padding: "7px 10px",
                  borderRadius: "999px",
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tipo */}
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: "#374151" }}>Tipo:</span>
            {TIPOS.map((x) => (
              <button
                key={x}
                onClick={() => setTipo(x)}
                style={{
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: tipo === x ? "#4f46e5" : "white",
                  color: tipo === x ? "white" : "#111827",
                  padding: "7px 10px",
                  borderRadius: "999px",
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                {x}
              </button>
            ))}
          </div>
        </div>

        {/* BODY SCROLLEABLE */}
        <div
          style={{
            flex: "1 1 auto",
            overflowY: "auto",
            padding: "16px 18px",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* COLUMNA IZQ */}
            <div
              style={{
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 16,
                overflow: "hidden",
                background: "white",
              }}
            >
              <div style={{ padding: 14, borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={left.logo} alt={left.nombre} style={{ width: 46, height: 46, objectFit: "contain" }} />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ fontWeight: 900, fontSize: 16 }}>{left.nombre}</div>
                    <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>
                      {leftList.length} propuestas en este filtro
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                {leftList.map((p) => {
                  const isConcreta = p.tipo === "Concreta"
                  return (
                    <div
                      key={p.id}
                      style={{
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: 14,
                        padding: 12,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "start" }}>
                        <div style={{ fontWeight: 900 }}>{p.titulo}</div>
                        <Chip variant={isConcreta ? "green" : "red"}>{p.tipo}</Chip>
                      </div>

                      <div style={{ marginTop: 6, fontSize: 12, color: "#6b7280", fontWeight: 700 }}>
                        {p.tema}
                      </div>

                      {/* lenguaje simple */}
                      {p.explicacion && (
                        <div style={{ marginTop: 8, fontSize: 13, color: "#111827" }}>{p.explicacion}</div>
                      )}

                      {/* problema real */}
                      {p.problema && (
                        <div style={{ marginTop: 8, fontSize: 12, color: "#374151" }}>
                          <b>Problema:</b> {p.problema}
                        </div>
                      )}
                    </div>
                  )
                })}

                {leftList.length === 0 && (
                  <div style={{ color: "#6b7280", fontWeight: 700, padding: 10 }}>
                    No hay propuestas para este filtro.
                  </div>
                )}
              </div>
            </div>

            {/* COLUMNA DER */}
            <div
              style={{
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 16,
                overflow: "hidden",
                background: "white",
              }}
            >
              <div style={{ padding: 14, borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={right.logo} alt={right.nombre} style={{ width: 46, height: 46, objectFit: "contain" }} />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ fontWeight: 900, fontSize: 16 }}>{right.nombre}</div>
                    <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>
                      {rightList.length} propuestas en este filtro
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                {rightList.map((p) => {
                  const isConcreta = p.tipo === "Concreta"
                  return (
                    <div
                      key={p.id}
                      style={{
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: 14,
                        padding: 12,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "start" }}>
                        <div style={{ fontWeight: 900 }}>{p.titulo}</div>
                        <Chip variant={isConcreta ? "green" : "red"}>{p.tipo}</Chip>
                      </div>

                      <div style={{ marginTop: 6, fontSize: 12, color: "#6b7280", fontWeight: 700 }}>
                        {p.tema}
                      </div>

                      {p.explicacion && (
                        <div style={{ marginTop: 8, fontSize: 13, color: "#111827" }}>{p.explicacion}</div>
                      )}

                      {p.problema && (
                        <div style={{ marginTop: 8, fontSize: 12, color: "#374151" }}>
                          <b>Problema:</b> {p.problema}
                        </div>
                      )}
                    </div>
                  )
                })}

                {rightList.length === 0 && (
                  <div style={{ color: "#6b7280", fontWeight: 700, padding: 10 }}>
                    No hay propuestas para este filtro.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER (opcional) */}
        <div
          style={{
            flex: "0 0 auto",
            padding: "10px 18px",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            background: "rgba(255,255,255,0.98)",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            color: "#6b7280",
            fontWeight: 700,
          }}
        >
          <span>
            Criterio: <b>{tema}</b> • Tipo: <b>{tipo}</b>
          </span>
          <span>
            Consejo: filtra por tema → mira chips (Concreta/Promesa) → compara enfoque.
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ComparisonModal
