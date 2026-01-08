import React, { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { partidos } from "../data/data"

// Iconos para los temas
import { DollarSign, HeartPulse, GraduationCap, Shield, ListFilter, Award, Target } from "lucide-react"

type Partido = typeof partidos[number]

type Props = {
  open: boolean
  left: Partido | null
  right: Partido | null
  onClose: () => void
}

type Tema = "Todos" | "Economía" | "Salud" | "Educación" | "Gobernanza"
type Tipo = "Todos" | "Concreta" | "Promesa"

const TEMAS: { value: Tema; label: string; icon: React.ReactNode }[] = [
  { value: "Todos", label: "Todos", icon: <ListFilter size={16} /> },
  { value: "Economía", label: "Economía", icon: <DollarSign size={16} /> },
  { value: "Salud", label: "Salud", icon: <HeartPulse size={16} /> },
  { value: "Educación", label: "Educación", icon: <GraduationCap size={16} /> },
  { value: "Gobernanza", label: "Gobernanza", icon: <Shield size={16} /> }
]

const TIPOS: { value: Tipo; label: string; icon: React.ReactNode }[] = [
  { value: "Todos", label: "Todos", icon: <ListFilter size={16} /> },
  { value: "Concreta", label: "Con plan de acción", icon: <Target size={16} /> },
  { value: "Promesa", label: "Sin plan de acción", icon: <Award size={16} /> }
]

function filtrarPropuestas(partido: Partido, tema: Tema, tipo: Tipo) {
  return (partido.propuestas || []).filter((p) => {
    const okTema = tema === "Todos" ? true : p.tema === tema
    const okTipo = tipo === "Todos" ? true : p.tipo === tipo
    return okTema && okTipo
  })
}

function Chip({ children, variant }: { children: React.ReactNode; variant?: "green" | "red" }) {
  // Usando los colores de tu CSS
  const bg = variant === "green" ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)"
  const bd = variant === "green" ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)"
  const tx = variant === "green" ? "#166534" : "#991b1b"

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 12px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 700,
        background: bg,
        border: `1px solid ${bd}`,
        color: tx,
        whiteSpace: "nowrap",
        gap: "4px",
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
        background: "rgba(15, 23, 42, 0.7)",
        backdropFilter: "blur(8px)",
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
          width: "min(1200px, 95vw)",
          height: "min(720px, 85vh)",
          overflow: "hidden",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px) saturate(180%)",
          borderRadius: "28px",
          border: "1px solid rgba(18, 55, 90, 0.14)",
          boxShadow: "0 25px 70px rgba(0, 0, 0, 0.25)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Capa de fondo sutil */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "url('/Images/fondos/panel-bg.png') center/cover no-repeat",
            opacity: 0.08,
            borderRadius: "28px",
            zIndex: -1,
          }}
        />

        {/* HEADER FIJO */}
        <div
          style={{
            flex: "0 0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: "1px solid rgba(18, 55, 90, 0.08)",
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(10px)",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <h3 style={{ 
              margin: 0, 
              fontSize: "20px", 
              fontWeight: 700, 
              color: "#0f172a",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              Comparación de Propuestas
            </h3>
            <div style={{ 
              color: "rgba(15, 23, 42, 0.7)", 
              fontSize: "13px", 
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <span style={{ 
                background: "rgba(37, 99, 235, 0.1)", 
                padding: "4px 10px", 
                borderRadius: "6px",
                border: "1px solid rgba(37, 99, 235, 0.2)"
              }}>
                {left.nombre} vs {right.nombre}
              </span>
              <span>Filtra por tema y tipo para comparar</span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "rgba(239, 68, 68, 0.1)",
              color: "#ef4444",
              padding: "10px 16px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"
            }}
          >
            ✕ Cerrar
          </button>
        </div>

        {/* FILTROS (fijos) */}
        <div
          style={{
            flex: "0 0 auto",
            padding: "16px 24px",
            borderBottom: "1px solid rgba(18, 55, 90, 0.06)",
            display: "flex",
            gap: "24px",
            flexWrap: "wrap",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.62)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Tema */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#374151", display: "flex", alignItems: "center", gap: "6px" }}>
              <ListFilter size={14} /> Tema
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
              {TEMAS.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTema(t.value)}
                  style={{
                    border: "1px solid rgba(18, 55, 90, 0.14)",
                    background: tema === t.value ? "rgba(37, 99, 235, 0.18)" : "rgba(255, 255, 255, 0.8)",
                    color: tema === t.value ? "#0f172a" : "#0f172a",
                    padding: "10px 16px",
                    borderRadius: "16px",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s ease",
                    backdropFilter: "blur(10px)",
                  }}
                  onMouseEnter={(e) => {
                    if (tema !== t.value) {
                      e.currentTarget.style.background = "rgba(37, 99, 235, 0.1)"
                      e.currentTarget.style.borderColor = "rgba(37, 99, 235, 0.28)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (tema !== t.value) {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.8)"
                      e.currentTarget.style.borderColor = "rgba(18, 55, 90, 0.14)"
                    }
                  }}
                >
                  {t.icon}
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tipo */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#374151", display: "flex", alignItems: "center", gap: "6px" }}>
              <Target size={14} /> Tipo
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
              {TIPOS.map((x) => (
                <button
                  key={x.value}
                  onClick={() => setTipo(x.value)}
                  style={{
                    border: "1px solid rgba(18, 55, 90, 0.14)",
                    background: tipo === x.value ? "rgba(37, 99, 235, 0.18)" : "rgba(255, 255, 255, 0.8)",
                    color: tipo === x.value ? "#0f172a" : "#0f172a",
                    padding: "10px 16px",
                    borderRadius: "16px",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s ease",
                    backdropFilter: "blur(10px)",
                  }}
                  onMouseEnter={(e) => {
                    if (tipo !== x.value) {
                      e.currentTarget.style.background = "rgba(37, 99, 235, 0.1)"
                      e.currentTarget.style.borderColor = "rgba(37, 99, 235, 0.28)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (tipo !== x.value) {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.8)"
                      e.currentTarget.style.borderColor = "rgba(18, 55, 90, 0.14)"
                    }
                  }}
                >
                  {x.icon}
                  <span>{x.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* BODY SCROLLEABLE */}
        <div
          style={{
            flex: "1 1 auto",
            overflowY: "auto",
            padding: "24px",
            background: "rgba(255, 255, 255, 0.3)",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {/* COLUMNA IZQUIERDA */}
            <div
              style={{
                border: "1px solid rgba(18, 55, 90, 0.08)",
                borderRadius: "20px",
                overflow: "hidden",
                background: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 10px 30px rgba(10, 20, 40, 0.12)",
              }}
            >
              {/* Header columna izquierda */}
              <div style={{ 
                padding: "20px", 
                borderBottom: "1px solid rgba(18, 55, 90, 0.06)",
                background: "rgba(255, 255, 255, 0.9)",
                display: "flex",
                alignItems: "center",
                gap: "16px"
              }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "14px",
                  background: "white",
                  border: "1px solid rgba(18, 55, 90, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)"
                }}>
                  <img 
                    src={left.logo} 
                    alt={left.nombre} 
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "contain" 
                    }} 
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ 
                    fontWeight: 900, 
                    fontSize: "18px", 
                    color: "#0f172a",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    {left.nombre}
                    <span style={{
                      background: "rgba(37, 99, 235, 0.1)",
                      color: "#2563eb",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: 700,
                      border: "1px solid rgba(37, 99, 235, 0.2)"
                    }}>
                      {leftList.length} propuestas
                    </span>
                  </div>
                  <div style={{ 
                    fontSize: "13px", 
                    color: "rgba(15, 23, 42, 0.7)", 
                    fontWeight: 600 
                  }}>
                    {left.candidato?.nombre && `Candidato: ${left.candidato.nombre}`}
                  </div>
                </div>
              </div>

              {/* Lista de propuestas izquierda */}
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
                {leftList.map((p) => {
                  const isConcreta = p.tipo === "Concreta"
                  return (
                    <div
                      key={p.id}
                      style={{
                        border: "1px solid rgba(18, 55, 90, 0.08)",
                        borderRadius: "16px",
                        padding: "18px",
                        background: "white",
                        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
                        transition: "transform 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-4px)"
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.12)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)"
                        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.05)"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "start" }}>
                        <div style={{ 
                          fontWeight: 900, 
                          fontSize: "15px", 
                          color: "#0f172a",
                          flex: 1
                        }}>
                          {p.titulo}
                        </div>
                        <Chip variant={isConcreta ? "green" : "red"}>
                          {isConcreta ? "Con plan de acción" : "Sin plan de acción"}
                        </Chip>
                      </div>

                      <div style={{ 
                        marginTop: "8px", 
                        fontSize: "13px", 
                        color: "#374151", 
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                      }}>
                        <span style={{
                          background: "rgba(37, 99, 235, 0.1)",
                          padding: "4px 10px",
                          borderRadius: "12px",
                          border: "1px solid rgba(37, 99, 235, 0.2)"
                        }}>
                          {p.tema}
                        </span>
                      </div>

                      {/* Explicación */}
                      {p.explicacion && (
                        <div style={{ 
                          marginTop: "12px", 
                          fontSize: "14px", 
                          color: "#0f172a",
                          lineHeight: 1.5
                        }}>
                          {p.explicacion}
                        </div>
                      )}

                      {/* Problema */}
                      {p.problema && (
                        <div style={{ 
                          marginTop: "12px", 
                          padding: "12px",
                          background: "rgba(239, 68, 68, 0.05)",
                          border: "1px solid rgba(239, 68, 68, 0.1)",
                          borderRadius: "12px"
                        }}>
                          <div style={{ 
                            fontSize: "12px", 
                            color: "#ef4444", 
                            fontWeight: 700,
                            marginBottom: "4px"
                          }}>
                            Problema identificado:
                          </div>
                          <div style={{ 
                            fontSize: "13px", 
                            color: "#374151",
                            fontWeight: 600
                          }}>
                            {p.problema}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}

                {leftList.length === 0 && (
                  <div style={{ 
                    textAlign: "center", 
                    color: "rgba(15, 23, 42, 0.6)", 
                    fontWeight: 700, 
                    padding: "40px 20px",
                    background: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "16px",
                    border: "1px dashed rgba(18, 55, 90, 0.1)"
                  }}>
                    📭 No hay propuestas para este filtro
                  </div>
                )}
              </div>
            </div>

            {/* COLUMNA DERECHA */}
            <div
              style={{
                border: "1px solid rgba(18, 55, 90, 0.08)",
                borderRadius: "20px",
                overflow: "hidden",
                background: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 10px 30px rgba(10, 20, 40, 0.12)",
              }}
            >
              {/* Header columna derecha */}
              <div style={{ 
                padding: "20px", 
                borderBottom: "1px solid rgba(18, 55, 90, 0.06)",
                background: "rgba(255, 255, 255, 0.9)",
                display: "flex",
                alignItems: "center",
                gap: "16px"
              }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "14px",
                  background: "white",
                  border: "1px solid rgba(18, 55, 90, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)"
                }}>
                  <img 
                    src={right.logo} 
                    alt={right.nombre} 
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "contain" 
                    }} 
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ 
                    fontWeight: 900, 
                    fontSize: "18px", 
                    color: "#0f172a",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    {right.nombre}
                    <span style={{
                      background: "rgba(37, 99, 235, 0.1)",
                      color: "#2563eb",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: 700,
                      border: "1px solid rgba(37, 99, 235, 0.2)"
                    }}>
                      {rightList.length} propuestas
                    </span>
                  </div>
                  <div style={{ 
                    fontSize: "13px", 
                    color: "rgba(15, 23, 42, 0.7)", 
                    fontWeight: 600 
                  }}>
                    {right.candidato?.nombre && `Candidato: ${right.candidato.nombre}`}
                  </div>
                </div>
              </div>

              {/* Lista de propuestas derecha */}
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
                {rightList.map((p) => {
                  const isConcreta = p.tipo === "Concreta"
                  return (
                    <div
                      key={p.id}
                      style={{
                        border: "1px solid rgba(18, 55, 90, 0.08)",
                        borderRadius: "16px",
                        padding: "18px",
                        background: "white",
                        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
                        transition: "transform 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-4px)"
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.12)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)"
                        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.05)"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "start" }}>
                        <div style={{ 
                          fontWeight: 900, 
                          fontSize: "15px", 
                          color: "#0f172a",
                          flex: 1
                        }}>
                          {p.titulo}
                        </div>
                        <Chip variant={isConcreta ? "green" : "red"}>
                          {isConcreta ? "Con plan de acción" : "Sin plan de acción"}
                        </Chip>
                      </div>

                      <div style={{ 
                        marginTop: "8px", 
                        fontSize: "13px", 
                        color: "#374151", 
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                      }}>
                        <span style={{
                          background: "rgba(37, 99, 235, 0.1)",
                          padding: "4px 10px",
                          borderRadius: "12px",
                          border: "1px solid rgba(37, 99, 235, 0.2)"
                        }}>
                          {p.tema}
                        </span>
                      </div>

                      {/* Explicación */}
                      {p.explicacion && (
                        <div style={{ 
                          marginTop: "12px", 
                          fontSize: "14px", 
                          color: "#0f172a",
                          lineHeight: 1.5
                        }}>
                          {p.explicacion}
                        </div>
                      )}

                      {/* Problema */}
                      {p.problema && (
                        <div style={{ 
                          marginTop: "12px", 
                          padding: "12px",
                          background: "rgba(239, 68, 68, 0.05)",
                          border: "1px solid rgba(239, 68, 68, 0.1)",
                          borderRadius: "12px"
                        }}>
                          <div style={{ 
                            fontSize: "12px", 
                            color: "#ef4444", 
                            fontWeight: 700,
                            marginBottom: "4px"
                          }}>
                            Problema identificado:
                          </div>
                          <div style={{ 
                            fontSize: "13px", 
                            color: "#374151",
                            fontWeight: 600
                          }}>
                            {p.problema}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}

                {rightList.length === 0 && (
                  <div style={{ 
                    textAlign: "center", 
                    color: "rgba(15, 23, 42, 0.6)", 
                    fontWeight: 700, 
                    padding: "40px 20px",
                    background: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "16px",
                    border: "1px dashed rgba(18, 55, 90, 0.1)"
                  }}>
                    📭 No hay propuestas para este filtro
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div
          style={{
            flex: "0 0 auto",
            padding: "16px 24px",
            borderTop: "1px solid rgba(18, 55, 90, 0.06)",
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "13px",
            color: "rgba(15, 23, 42, 0.7)",
            fontWeight: 600,
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{
              background: "rgba(37, 99, 235, 0.1)",
              padding: "6px 12px",
              borderRadius: "12px",
              border: "1px solid rgba(37, 99, 235, 0.2)"
            }}>
              📋 Criterio: <b>{tema}</b> • Tipo: <b>{tipo}</b>
            </span>
          </span>
          <span style={{
            background: "rgba(56, 189, 248, 0.1)",
            padding: "6px 12px",
            borderRadius: "12px",
            border: "1px solid rgba(56, 189, 248, 0.2)"
          }}>
            💡 Consejo: Filtra por tema → Revisa promesas vs concretas → Compara enfoques
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ComparisonModal