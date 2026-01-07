import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'
import { motion } from 'framer-motion'


interface Candidate {
  name: string
  party: string
  symbol: string
}

const candidates: Candidate[] = [
  { name: 'Candidato A', party: 'Partido X', symbol: '🟦' },
  { name: 'Candidato B', party: 'Partido Y', symbol: '🟥' },
  { name: 'Candidato C', party: 'Partido Z', symbol: '🟩' },
]
const topics = [
  // Fila 1: Arriba y muy abiertas
  { emoji: '📰', label: 'Noticias',   x: -220, y: 0 },
  { emoji: '📱', label: 'Redes',      x: 220,  y: 0 },
  
  // Fila 2: En medio y más cerradas
  { emoji: '📜', label: 'Propuestas', x: -130,  y: 100 },
  { emoji: '🔮', label: 'Futuro',     x: 130,   y: 100 },
  
  // Fila 3: Abajo al centro (Punta de la V)
  { emoji: '👁️', label: 'Visión',     x: 0,    y: 200 },
];


const Home: React.FC = () => {
  const [index, setIndex] = useState(0)

  const next = () => {
    setIndex((prev) => (prev + 1) % candidates.length)
  }

  const prev = () => {
    setIndex((prev) => (prev - 1 + candidates.length) % candidates.length)
  }

  const candidate = candidates[index]

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Voto Informado</h1>
        <p>
          Una visión general del escenario político para comenzar a formar
          una decisión de voto informada.
        </p>
      </header>

      <section className="section">
        <h2>Panorama electoral</h2>
        <p>
          Diversos partidos y candidatos compiten presentando propuestas
          sobre los principales problemas del país.
        </p>
      </section>

      


      <section className="section">
        <h2>Candidatos y partidos</h2>

        <div className="v-layout">
            {topics.map((item, i) => (
            <motion.div
                key={i}
                className="bubble circle"
                
                // ESTADO INICIAL:
                // Empiezan arriba del todo (y: -200) y transparentes.
                // Mantenemos su 'x' para que caigan en línea recta.
                initial={{ x: item.x, y: -200, opacity: 0, scale: 0.5 }}
                
                // ANIMACIÓN FINAL:
                // Van a su posición 'y' final definida en el array.
                animate={{ x: item.x, y: item.y, opacity: 1, scale: 1 }}
                
                // HOVER:
                whileHover={{ scale: 1.1, zIndex: 50 }}
                
                // TRANSICIÓN (Rebote)
                transition={{
                type: "spring",
                stiffness: 100,
                damping: 12,
                delay: i * 0.1, // Efecto cascada
                }}
            >
                <span className="emoji">{item.emoji}</span>
                <span className="label">{item.label}</span>
            </motion.div>
            ))}
        </div>


        <div className="carousel">
          <button onClick={prev} className="carousel-btn">◀</button>

          <div className="candidate-card">
            <div className="symbol">{candidate.symbol}</div>
            <h3>{candidate.name}</h3>
            <p>{candidate.party}</p>
          </div>

          <button onClick={next} className="carousel-btn">▶</button>
        </div>
      </section>

      <section className="section">
        <h2>Temas clave del país</h2>
        <div className="topics">
          <div className="topic">💰 Economía</div>
          <div className="topic">🏥 Salud</div>
          <div className="topic">🛡️ Seguridad</div>
          <div className="topic">🎓 Educación</div>
        </div>
      </section>

      <section className="section center">
        <h2>¿Quieres profundizar?</h2>
        <Link to="/screen1" className="primary-btn">
          Explorar propuestas políticas
        </Link>
      </section>
    </div>
  )
}

export default Home
