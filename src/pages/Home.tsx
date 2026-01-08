import React, { useState, useMemo, useEffect } from 'react';
import '../styles/Home.css';
import { motion } from 'framer-motion';
import { partidos } from '../data/data';
import AddCandidateBubble from "../components/AddCandidateBubble"
import CandidateDetail from "../components/CandidateDetail"
import ComparisonModal from "../components/ComparisonModal"
import { Link } from "react-router-dom"
import selectCandidateImg from "../assets/icn.png";
import TechnicalTooltip from '../components/TechnicalTooltip';

import {
  Share2,
  TrendingUp,
  FileText,
  Newspaper,
  Eye,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

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
  return {
    ...pos,
    label: partido.nombre,
    logo: partido.logo,
    candidatePhoto: partido.candidato?.foto,
    candidateName: partido.candidato?.nombre,
  };
});


// --- NOMBRES DE LAS 5 SUB-BOLAS ---
const subBolas = [
  { label: "Redes", icon: Share2 },
  { label: "Futuro", icon: TrendingUp },
  { label: "Propuestas", icon: FileText },
  { label: "Noticias", icon: Newspaper },
  { label: "Visión", icon: Eye },
];


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
  const [showCandidate, setShowCandidate] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setShowCandidate((v) => !v);
    }, 2000);
    return () => clearInterval(id);
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
        transition: { duration: windParams.duration, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" as const, delay: i * 0.05 }
      };
    },
    selected: {
      x: 0,
      y: 80, // candidato sube, pero no tapa sub-bolas
      scale: 1.5,
      rotate: 0,
      opacity: 1,
      zIndex: 100,
      transition: { type: "spring" as const, stiffness: 60, damping: 12 }
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
          flexDirection: 'column',     // 👈 CLAVE
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',                  // espacio imagen-texto
          boxShadow: isSelected
            ? '0 0 50px rgba(0,0,0,0.3)'
            : '0 0 15px rgba(148, 163, 184, 0.35)',
          position: 'absolute',
          cursor: 'pointer',
          pointerEvents: 'auto',
        }}
        transition={
          animationState === "falling"
            ? { type: "spring", stiffness: 80, damping: 15, delay: delay }
            : undefined
        }
        onAnimationComplete={(definition) => {
          if (definition === "falling") setAnimationState("floating");
        }}
        whileHover={!isSelected ? { scale: 1.25, zIndex: 100 } : {}}
      >
        {/* IMAGEN (logo ↔ candidato) */}
        <div
          style={{
            width: "70%",
            height: "70%",
            position: "relative",
            pointerEvents: "none",
          }}
        >
          {/* Logo del partido */}
          <motion.img
            src={item.logo}
            alt={item.label}
            animate={{ opacity: showCandidate ? 0 : 1 }}
            transition={{ duration: 0.35 }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              position: "absolute",
              inset: 0,
            }}
            onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
          />

          {/* Foto del candidato */}
          <motion.img
            src={item.candidatePhoto}
            alt={item.candidateName ?? "Candidato"}
            animate={{ opacity: showCandidate ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
              position: "absolute",
              inset: 0,
            }}
            onError={() => {
              // Si no hay foto, que nunca “gane” el candidato (se queda en logo)
              setShowCandidate(false);
            }}
          />
        </div>


        {/* NOMBRE DEL PARTIDO */}
        {isSelected && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 14 }}
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#111827',
              textAlign: 'center',
              lineHeight: 1.1,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            {showCandidate ? (item.candidateName ?? item.label) : item.label}
          </motion.span>
        )}
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
        <header className="home-header">
          <div className="home-header-content">
            <h1>Voto Informado</h1>
            <p>Una visión general del escenario político.</p>
          </div>
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
            {selectedIndex === null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "100px",   // 👈 AJUSTA ESTE VALOR
                  marginBottom: "2rem",
                  pointerEvents: "none",
                }}

              >
                {/* Bola gris */}
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    background: "linear-gradient(145deg, #e5e7eb, #d1d5db)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden", // importante para el círculo
                  }}
                >
                  <img
                    src={selectCandidateImg}
                    alt="Seleccione candidato"
                    style={{
                      width: "60%",
                      height: "60%",
                      objectFit: "contain",
                      opacity: 0.85,
                      pointerEvents: "none",
                    }}
                  />
                </div>


                {/* Texto */}
                <p
                  style={{
                    marginTop: "12px",
                    fontSize: "14px",
                    color: "#6b7280",
                    fontWeight: 600,
                    textAlign: "center",
                    maxWidth: "260px",
                  }}
                >
                  Seleccione al candidato de su preferencia
                </p>
              </motion.div>
            )}

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
                <motion.div
                  style={{
                    transform: "translate(150px, 20px)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <AddCandidateBubble
                    active={isAddingSecond}
                    onClick={() => {
                      if (selectedIndex !== null) setIsAddingSecond((v) => !v)
                    }}
                  />

                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: isAddingSecond ? "#dc2626" : "#4f46e5",
                      lineHeight: 1,
                      userSelect: "none",
                      textAlign: "center",
                    }}
                  >
                    {isAddingSecond ? "Seleccione otro candidato" : "Comparar"}
                  </span>

                </motion.div>

              </motion.div>
            )}
          </div>

          {/* Sub-bolas centrales */}
          {partidoSeleccionado && secondIndex === null && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "200px", gap: "20px", zIndex: 200, position: "relative" }}>
              {subBolas.map(({ label, icon: Icon }, idx) => (
                <motion.div
                  key={label}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 120 }}
                  style={{
                    background: selectedSubBola === label ? "#4f46e5" : "white",
                    color: selectedSubBola === label ? "white" : "#1f2937",
                    width: "70px",
                    height: "70px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    borderRadius: "9999px",
                    boxShadow: "0 0 15px rgba(148, 163, 184, 0.35)",
                    gap: "4px",
                    fontSize: "10px",
                    fontWeight: 600,
                    textAlign: "center",

                  }}
                  onClick={() => setSelectedSubBola(label)}
                  whileHover={{ scale: 1.2 }}

                >
                  <Icon size={20} strokeWidth={2.2} />
                  <span>{label}</span>
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "24px",
                      marginTop: "12px",
                    }}
                  >
                    {partidoSeleccionado.redes.facebook && (
                      <a
                        href={partidoSeleccionado.redes.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          textDecoration: "none",
                          color: "#1877F2",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        <Facebook size={28} />
                        <span>Facebook</span>
                      </a>
                    )}

                    {partidoSeleccionado.redes.twitter && (
                      <a
                        href={partidoSeleccionado.redes.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          textDecoration: "none",
                          color: "#1DA1F2",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        <Twitter size={28} />
                        <span>Twitter</span>
                      </a>
                    )}

                    {partidoSeleccionado.redes.instagram && (
                      <a
                        href={partidoSeleccionado.redes.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          textDecoration: "none",
                          color: "#E1306C",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        <Instagram size={28} />
                        <span>Instagram</span>
                      </a>
                    )}
                  </div>
                )}


                {selectedSubBola === "Futuro" && (
                  <TechnicalTooltip text={partidoSeleccionado.futuro} />
                )}


                {selectedSubBola === "Propuestas" && (
                  <ul>
                    {partidoSeleccionado.propuestas.map((p) => (
                      <li key={p.id}>
                        <strong>{p.tema}:</strong>{" "}
                        <TechnicalTooltip text={`${p.titulo} ${p.explicacion ?? ""}`} />
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

                {selectedSubBola === "Visión" && (
                  <TechnicalTooltip text={partidoSeleccionado.vision} />
                )}


              </div>
            </motion.div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Home;