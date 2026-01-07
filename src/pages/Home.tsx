import React, { useState, useMemo } from 'react';
import '../styles/Home.css';
import { motion } from 'framer-motion';
import { partidos } from '../data/data'; 
import AddCandidateBubble from "../components/AddCandidateBubble"
import CandidateDetail from "../components/CandidateDetail"
import ComparisonModal from "../components/ComparisonModal"
import { Link } from "react-router-dom"



// --- CONFIGURACIÓN DE POSICIONES (COLUMNAS LATERALES) ---
const positions = [
  { x: -380, y: 0 }, { x: -460, y: 100 }, { x: -380, y: 200 },
  { x: -460, y: 300 }, { x: -380, y: 400 }, { x: -460, y: 500 },
  { x: 380, y: 0 }, { x: 460, y: 100 }, { x: 380, y: 200 },
  { x: 460, y: 300 }, { x: 380, y: 400 }, { x: 460, y: 500 },
];

// Combinamos posiciones con partidos
const bubbleItems = positions.map((pos, i) => {
  const partido = partidos[i % partidos.length];
  return { ...pos, label: partido.nombre, logo: partido.logo };
});

// --- NOMBRES DE LAS 5 SUB-BOLAS ---
const subBolas = ["Redes", "Futuro", "Propuestas", "Noticias", "Visión"];

const WindyBubble: React.FC<{ 
  item: typeof bubbleItems[0]; 
  delay: number;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ item, delay, isSelected, onSelect }) => {

  const windParams = useMemo(() => {
    const direction = Math.random() > 0.5 ? 1 : -1;
    return {
      xSway: (15 + Math.random() * 10) * direction, 
      yBob: 15 + Math.random() * 10,
      rotate: (5 + Math.random() * 5) * direction, 
      duration: 3 + Math.random() * 2,
    };
  }, []);

  const variants = {
    hidden: { y: -900, x: item.x, opacity: 0, scale: 0.5, rotate: 0 },
    falling: { y: item.y, x: item.x, opacity: 1, scale: 1, rotate: 0 },
    floating: (i: number) => {
      const yOffset = i * 22;
      const scaleFactor = i === 0 ? 1 : 1 - i * 0.18;
      return {
        opacity: 1 - i * 0.15,
        scale: scaleFactor,
        x: [item.x, item.x - windParams.xSway, item.x + windParams.xSway * 0.5, item.x],
        y: [item.y - yOffset, item.y - windParams.yBob - yOffset, item.y - yOffset],
        rotate: [0, -windParams.rotate, windParams.rotate / 2, 0],
        transition: { duration: windParams.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: i * 0.05 }
      };
    },
    selected: {
      x: 0,
      y: 80, // candidato sube, pero no tapa sub-bolas
      scale: 1.5,
      rotate: 0,
      opacity: 1,
      zIndex: 100,
      transition: { type: "spring", stiffness: 60, damping: 12 }
    }
  };

  const [animationState, setAnimationState] = useState<"falling" | "floating">("falling");
  const trailIndices = [1, 2, 3, 4]; 
  const currentAnimation = isSelected ? "selected" : animationState;

  return (
    <>
      {!isSelected && trailIndices.map((i) => (
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
            background: 'transparent',
            boxShadow: 'none',
            border: '2px solid rgba(148, 163, 184, 0.35)',
            position: 'absolute',
          }}
          transition={animationState === "falling" ? { type: "spring", stiffness: 80, damping: 15, delay: delay } : undefined}
        />
      ))}

      <motion.div
        className="bubble circle"
        initial="hidden"
        animate={currentAnimation}
        variants={variants}
        custom={0}
        onClick={onSelect}
        style={{
          zIndex: 50,
          background: 'white',
          padding: '6px',
          overflow: 'visible',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isSelected ? '0 0 50px rgba(0,0,0,0.3)' : '0 0 15px rgba(148, 163, 184, 0.35)',
          position: 'absolute',
          cursor: 'pointer',
          pointerEvents: 'auto',
        }}
        transition={animationState === "falling" ? { type: "spring", stiffness: 80, damping: 15, delay: delay } : undefined}
        onAnimationComplete={(definition) => { if (definition === "falling") setAnimationState("floating"); }}
        whileHover={!isSelected ? { scale: 1.25, zIndex: 100, rotate: 0 } : {}}
      >
        <img 
          src={item.logo} 
          alt={item.label}
          style={{ width: '80%', height: '80%', objectFit: 'contain', pointerEvents: 'none' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        {!item.logo && <span className="text-[9px] text-black font-bold text-center leading-tight">{item.label}</span>}
      </motion.div>
    </>
  );
};

const Home: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedSubBola, setSelectedSubBola] = useState<string | null>(null);
  const [isAddingSecond, setIsAddingSecond] = useState(false);
  const [secondIndex, setSecondIndex] = useState<number | null>(null);

  const partidoSeleccionado = selectedIndex !== null ? partidos[selectedIndex % partidos.length] : null;
  const partidoSegundo = secondIndex !== null ? partidos[secondIndex % partidos.length] : null;


  const particles = useMemo(() => Array.from({ length: 30 }).map(() => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${0.5 + Math.random()}s`,
  })), []);

  const handleBubbleClick = (i: number) => {
    if (isAddingSecond && selectedIndex !== null) {
      if (i !== selectedIndex) {
        setSecondIndex(i);
        setIsAddingSecond(false);
        setSelectedSubBola(null);
      }
      return;
    }
    setSelectedIndex(prev => (prev === i ? null : i));
    setSelectedSubBola(null);
    setSecondIndex(null); // si cambias principal, reinicia el segundo
    setIsAddingSecond(false);
  };


  return (
  <div className="home-container">
    {/* BOTÓN VOLVER */}
    <div style={{ position: "absolute", top: 20, left: 20, zIndex: 1000 }}>
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 16px",
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "8px",
          textDecoration: "none",
          color: "#4f46e5",
          fontWeight: 600,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>Volver a Situación Actual</span>
      </Link>
    </div>

    {/* Fondo */}
    <div className="falling-bg">
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }}
        />
      ))}
    </div>

    {/* Contenido principal */}
    <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <header className="home-header" style={{ marginBottom: "2rem" }}>
        <h1>Voto Informado</h1>
        <p>Una visión general del escenario político.</p>
      </header>

      <section className="section" style={{ width: "100%", maxWidth: "1000px", position: "relative" }}>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Partidos en contienda</h2>

        {/* Columnas de candidatos */}
        <div className="v-layout" style={{ position: "relative", height: "600px", marginBottom: "-500px", zIndex: 50 }}>
          {bubbleItems.map((item, i) => (
            <WindyBubble
              key={i}
              item={item}
              delay={i * 0.15}
              isSelected={selectedIndex === i}
              onSelect={() => handleBubbleClick(i)}
            />
          ))}

          {/* SOLO el botón + cuando hay seleccionado */}
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 160, damping: 14 }}
              style={{
                position: "absolute",
                left: "45%",
                top: 80,
                transform: "translateX(-50%)",
                zIndex: 200,
                pointerEvents: "auto",
              }}
            >
              <motion.div style={{ transform: "translate(150px, 20px)" }}>
                <AddCandidateBubble
                  active={isAddingSecond}
                  onClick={() => {
                    if (selectedIndex !== null) setIsAddingSecond((v) => !v)
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Sub-bolas centrales */}
        {partidoSeleccionado && secondIndex === null && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "200px", gap: "20px", zIndex: 200, position: "relative" }}>
            {subBolas.map((s, idx) => (
              <motion.div
                key={s}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.1, type: "spring", stiffness: 120 }}
                style={{
                  background: selectedSubBola === s ? "#4f46e5" : "white",
                  color: selectedSubBola === s ? "white" : "black",
                  width: "70px",
                  height: "70px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 0 15px rgba(148, 163, 184, 0.35)",
                  fontSize: "12px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                onClick={() => setSelectedSubBola(s)}
                whileHover={{ scale: 1.2 }}
              >
                {s}
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal Comparación */}
        <ComparisonModal
          open={!!(partidoSeleccionado && partidoSegundo)}
          left={partidoSeleccionado}
          right={partidoSegundo}
          onClose={() => {
            setSecondIndex(null)
            setIsAddingSecond(false)
          }}
        />

        {/* Información del candidato según sub-bola */}
        {partidoSeleccionado && secondIndex === null && selectedSubBola && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              marginTop: "20px",
              padding: "1.5rem",
              background: "rgba(255,255,255,0.95)",
              borderRadius: "20px",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
              position: "relative",
              zIndex: 100,
            }}
          >
            <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>{selectedSubBola}</h3>

            <div style={{ textAlign: "justify" }}>
              {selectedSubBola === "Redes" && (
                <p>
                  <a href={partidoSeleccionado.redes.facebook} target="_blank" rel="noopener noreferrer">Facebook</a> |{" "}
                  <a href={partidoSeleccionado.redes.twitter} target="_blank" rel="noopener noreferrer">Twitter</a> |{" "}
                  <a href={partidoSeleccionado.redes.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                </p>
              )}

              {selectedSubBola === "Futuro" && <p>{partidoSeleccionado.futuro}</p>}

              {selectedSubBola === "Propuestas" && (
                <ul>
                  {partidoSeleccionado.propuestas.map((p) => (
                    <li key={p.id}>
                      <strong>{p.tema}:</strong> {p.titulo} {p.explicacion && `- ${p.explicacion}`}
                    </li>
                  ))}
                </ul>
              )}

              {selectedSubBola === "Noticias" && (
                <ul>
                  {partidoSeleccionado.noticias.map((n) => (
                    <li key={n.id}>
                      <strong>{n.titulo}</strong> - {n.resumen} ({n.fuente})
                    </li>
                  ))}
                </ul>
              )}

              {selectedSubBola === "Visión" && <p>{partidoSeleccionado.vision}</p>}
            </div>
          </motion.div>
        )}
      </section>
    </div>
  </div>
)
}

export default Home;