import { useState } from "react"
import { partidos } from "../data/data"

const Screen2: React.FC = () => {
  const [partidoSeleccionado, setPartidoSeleccionado] = useState<
    typeof partidos[number] | null
  >(null)

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Información del candidato</h1>

      {/*simular las bolitas*/}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {partidos.map((p) => (
          <button key={p.id} onClick={() => setPartidoSeleccionado(p)}>
            {p.nombre}
          </button>
        ))}
      </div>

      {/*centro*/}
      {!partidoSeleccionado ? (
        <p>Selecciona un candidato</p>
      ) : (
        <div>
          <h2>{partidoSeleccionado.nombre}</h2>
          <img
            src={partidoSeleccionado.logo}
            alt={partidoSeleccionado.nombre}
            width={120}
          />

          <h3>Propuestas</h3>
          <ul>
            {partidoSeleccionado.propuestas.map((prop) => (
              <li key={prop.id}>
                <strong>{prop.tema}:</strong> {prop.titulo}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Screen2
