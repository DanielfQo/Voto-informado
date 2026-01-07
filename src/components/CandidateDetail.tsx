import React from "react"
import { partidos } from "../data/data"

type Props = {
  partido: typeof partidos[number] | null
}

const CandidateDetail: React.FC<Props> = ({ partido }) => {
  if (!partido) {
    return <p>Selecciona un candidato</p>
  }

  return (
    <div>
      <h2>{partido.nombre}</h2>

      <img
        src={partido.logo}
        alt={partido.nombre}
        width={140}
        style={{ marginBottom: "1rem" }}
      />

      <h3>Propuestas</h3>
      <ul>
        {partido.propuestas.map((prop) => (
          <li key={prop.id}>
            <strong>{prop.tema}</strong>: {prop.titulo}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CandidateDetail
