import { useState } from "react"
import { partidos } from "../data/data"
import CandidateDetail from "../components/CandidateDetail"

const Screen2: React.FC = () => {
  const [partidoSeleccionado, setPartidoSeleccionado] =
    useState<typeof partidos[number] | null>(null)

  return (
    <div style={{ display: "flex", padding: "2rem" }}>
      
      {/* LADO IZQUIERDO (bolitas simuladas) */}
      <div style={{ width: "30%" }}>
        {partidos.map((p) => (
          <button
            key={p.id}
            onClick={() => setPartidoSeleccionado(p)}
            style={{ display: "block", marginBottom: "10px" }}
          >
            {p.nombre}
          </button>
        ))}
      </div>

      {/* CENTRO */}
      <div style={{ width: "70%" }}>
        <CandidateDetail partido={partidoSeleccionado} />
      </div>
    </div>
  )
}

export default Screen2
