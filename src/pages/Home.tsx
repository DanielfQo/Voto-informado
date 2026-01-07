import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import { motion} from 'framer-motion';

// --- INTERFACES Y DATOS ---

interface Candidate {
  name: string;
  party: string;
  symbol: string;
}

const candidates: Candidate[] = [
  { name: 'Candidato A', party: 'Partido X', symbol: '🟦' },
  { name: 'Candidato B', party: 'Partido Y', symbol: '🟥' },
  { name: 'Candidato C', party: 'Partido Z', symbol: '🟩' },
];

const topics = [
  { emoji: '📰', label: 'Noticias',   x: -180, y: 0 },
  { emoji: '📱', label: 'Redes',      x: 180,  y: 0 },
  { emoji: '📜', label: 'Propuestas', x: -90,  y: 100 },
  { emoji: '🔮', label: 'Futuro',     x: 90,   y: 100 },
  { emoji: '👁️', label: 'Visión',     x: 0,    y: 200 },
];

const WindyBubble: React.FC<{ 
  item: typeof topics[0]; 
  delay: number 
}> = ({ item, delay }) => {

  // Configuramos el viento
  const windParams = useMemo(() => {
    const direction = Math.random() > 0.5 ? 1 : -1;
    return {
      xSway: (25 + Math.random() * 15) * direction,
      yBob: 15 + Math.random() * 10,
      rotate: (10 + Math.random() * 10) * direction,
      duration: 2.5 + Math.random() * 2,
    };
  }, []);

  // Definimos variants dinámicas
  const variants = {
    hidden: { 
      y: -600, x: item.x, opacity: 0, scale: 0.5, rotate: 0 
    },
    falling: { 
      y: item.y, x: item.x, opacity: 1, scale: 1, rotate: 0 
    },
    floating: (i: number) => {
      // Offset vertical para la cola (hacia arriba)
      const yOffset = i * 22; 

      return {
        opacity: 1,
        x: [item.x, item.x - windParams.xSway, item.x + (windParams.xSway * 0.5), item.x],
        y: [
          item.y - yOffset, 
          (item.y - windParams.yBob) - yOffset, 
          item.y - yOffset
        ],
        rotate: [0, -windParams.rotate, windParams.rotate / 2, 0],
        transition: {
          duration: windParams.duration,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: i * 0.05 
        } as any
      };
    }
  };

  const [animationState, setAnimationState] = useState<"falling" | "floating">("falling");

  // Configuración de la estela
  const trailCount = 5; 
  const trailIndices = Array.from({ length: trailCount }, (_, i) => i + 1);

  return (
    <>
      {/* --- ESTELA (Wireframe / Solo Borde) --- */}
      {trailIndices.map((i) => (
        <motion.div
          key={`trail-${i}`}
          className="bubble circle"
          initial="hidden"
          animate={animationState}
          variants={variants}
          custom={i}
          style={{
            zIndex: 10 - i,
            pointerEvents: 'none',
            background: 'transparent', // IMPORTANTE: Quitamos el fondo azul de la clase CSS
            boxShadow: 'none', // Quitamos la sombra de la clase CSS
          }}
          transition={
            animationState === "falling"
              ? { type: "spring", stiffness: 120, damping: 12, delay: delay }
              : undefined
          }
        >
          {/* DIV INTERNO CON ESTILO DE BORDE Y ESCALA */}
          <div 
            style={{ 
              width: '100%', 
              height: '100%', 
              borderRadius: '50%',
              
              // 1. SOLO BORDE
              background: 'transparent', 
              border: '2px solid rgba(99, 164, 255, 0.6)', // Color azulito similar al tema
              
              // 2. OPACIDAD Y TAMAÑO
              // La opacidad baja más rápido y el tamaño se reduce más drásticamente (0.18)
              opacity: 0.8 / (i * 0.6 + 1), 
              transform: `scale(${1 - (i * 0.18)})` 
            }} 
          />
        </motion.div>
      ))}

      {/* --- BURBUJA PRINCIPAL (Rellena) --- */}
      <motion.div
        className="bubble circle"
        initial="hidden"
        animate={animationState}
        variants={variants}
        custom={0}
        style={{ zIndex: 20 }}
        
        transition={
          animationState === "falling"
            ? { type: "spring", stiffness: 120, damping: 12, delay: delay }
            : { duration: windParams.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
        }
        
        onAnimationComplete={(definition) => {
          if (definition === "falling") setAnimationState("floating");
        }}
        
        whileHover={{ scale: 1.15, zIndex: 50, rotate: 0 }}
      >
        <span className="emoji">{item.emoji}</span>
        <span className="label">{item.label}</span>
      </motion.div>
    </>
  );
};


// --- COMPONENTE PRINCIPAL (HOME) ---
const Home: React.FC = () => {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((prev) => (prev + 1) % candidates.length);
  const prev = () => setIndex((prev) => (prev - 1 + candidates.length) % candidates.length);
  const candidate = candidates[index];

  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map(() => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${0.6 + Math.random()}s`,
    }));
  }, []);

  return (
    <div className="home-container">
      {/* Fondo de lluvia */}
      <div className="falling-bg">
        {particles.map((p, i) => (
          <div key={i} className="particle" style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }} />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <header className="home-header">
          <h1>Voto Informado</h1>
          <p>Una visión general del escenario político para comenzar a formar una decisión de voto informada.</p>
        </header>

        <section className="section">
          <h2>Panorama electoral</h2>
          <p>Diversos partidos y candidatos compiten presentando propuestas sobre los principales problemas del país.</p>
        </section>

        <section className="section">
          <h2>Candidatos y partidos</h2>
          
          {/* Contenedor de burbujas */}
          <div className="v-layout" style={{ position: 'relative' }}>
            {topics.map((item, i) => (
              <WindyBubble key={i} item={item} delay={i * 0.15} />
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
          <Link to="/screen1" className="primary-btn">Explorar propuestas políticas</Link>
        </section>
      </div>
    </div>
  );
};

export default Home;