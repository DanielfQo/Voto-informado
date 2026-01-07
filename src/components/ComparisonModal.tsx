import React from "react"
import { motion } from "framer-motion"
import CandidateDetail from "./CandidateDetail"
import { partidos } from "../data/data"

type Partido = typeof partidos[number]

type Props = {
  open: boolean
  left: Partido | null
  right: Partido | null
  onClose: () => void
}

const ComparisonModal: React.FC<Props> = ({ open, left, right, onClose }) => {
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
          width: "min(900px, 95vw)",
          height: "min(700px, 85vh)", // ✅ tamaño fijo (alto)
          overflow: "hidden",          // ✅ para que el scroll sea interno
          background: "rgba(255,255,255,0.98)",
          borderRadius: "20px",
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
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 1.5rem",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            background: "rgba(255,255,255,0.98)",
          }}
        >
          <h3 style={{ margin: 0 }}>Comparación</h3>

          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "#ef4444",
              color: "white",
              padding: "8px 12px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Cerrar
          </button>
        </div>

        {/* BODY SCROLLEABLE */}
        <div
          style={{
            flex: "1 1 auto",
            overflowY: "auto",         // ✅ scroll interno aquí
            padding: "1.5rem",
          }}
        >
          <div style={{ display: "flex", gap: "40px" }}>
            <div style={{ flex: 1 }}>
              <CandidateDetail partido={left} />
            </div>
            <div style={{ flex: 1 }}>
              <CandidateDetail partido={right} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ComparisonModal
