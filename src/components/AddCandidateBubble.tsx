import React from "react"
import { motion } from "framer-motion"

type Props = {
  onClick?: () => void
  active?: boolean
}

const AddCandidateBubble: React.FC<Props> = ({ onClick, active }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        scale: active ? 1.15 : 1,
        boxShadow: active
          ? "0 0 25px rgba(79,70,229,0.65)"
          : "0 0 12px rgba(0,0,0,0.15)",
      }}
      style={{
        width: 50,
        height: 50,
        borderRadius: "50%",
        background: "white",
        border: "2px dashed #4f46e5",
        color: "#4f46e5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 26,
        fontWeight: 900,
        cursor: "pointer",
        userSelect: "none",
      }}
      aria-label="Agregar candidato"
      title="Agregar candidato"
    >
      +
    </motion.div>
  )
}

export default AddCandidateBubble
