import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import { motion} from 'framer-motion';
import { partidos } from '../data/data'; 

// --- CONFIGURACIÓN DE POSICIONES (COLUMNAS LATERALES) ---
// Basado en tu boceto: Dos columnas verticales a los extremos.
const positions = [
  // --- COLUMNA IZQUIERDA (6 Partidos) ---
  // Alternamos un poco la X (-380 y -460) para que no se vea una fila india aburrida
  { x: -380, y: 0 },    // 1. Arriba
  { x: -460, y: 100 },  // 2.
  { x: -380, y: 200 },  // 3.
  { x: -460, y: 300 },  // 4.
  { x: -380, y: 400 },  // 5.
  { x: -460, y: 500 },  // 6. Abajo

  // --- COLUMNA DERECHA (6 Partidos) ---
  // Espejo del lado izquierdo (Valores positivos)
  { x: 380, y: 0 },     // 7. Arriba
  { x: 460, y: 100 },   // 8.
  { x: 380, y: 200 },   // 9.
  { x: 460, y: 300 },   // 10.
  { x: 380, y: 400 },   // 11.
  { x: 460, y: 500 },   // 12. Abajo
];

// Combinamos las posiciones con tus partidos
const bubbleItems = positions.map((pos, i) => {
  const partido = partidos[i % partidos.length];
  return { 
    ...pos, 
    label: partido.nombre, 
    logo: partido.logo 
  };
});

// --- COMPONENTE BURBUJA ---
const WindyBubble: React.FC<{ 
  item: typeof bubbleItems[0]; 
  delay: number;
  isSelected: boolean;     // Recibimos si está seleccionada
  onSelect: () => void;    // Función para activar/desactivar
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
    // 1. Estado inicial
    hidden: { y: -900, x: item.x, opacity: 0, scale: 0.5, rotate: 0 },
    
    // 2. Caída
    falling: { y: item.y, x: item.x, opacity: 1, scale: 1, rotate: 0 },
    
    // 3. Flotando (Viento)
    floating: (i: number) => {
      const yOffset = i * 22;
      const scaleFactor = i === 0 ? 1 : 1 - i * 0.18;
      return {
        opacity: 1 - i * 0.15,
        scale: scaleFactor,
        x: [item.x, item.x - windParams.xSway, item.x + windParams.xSway * 0.5, item.x],
        y: [item.y - yOffset, item.y - windParams.yBob - yOffset, item.y - yOffset],
        rotate: [0, -windParams.rotate, windParams.rotate / 2, 0],
        transition: {
          duration: windParams.duration,
          repeat: Infinity,
          repeatType: "mirror" as const,
          ease: "easeInOut" as const,
          delay: i * 0.05
        }
      };
    },

    // 4. ESTADO SELECCIONADO (Centro)
    selected: {
      x: 0,    // Centro Horizontal
      y: 150,  // Centro Vertical (Ajusta este valor según la altura de tu contenedor)
      scale: 1.5, // Se agranda
      rotate: 0,
      opacity: 1,
      zIndex: 100, // Se pone encima de todo
      transition: {
        type: "spring" as const,
        stiffness: 60,
        damping: 12
      }
    }
  };

  const [animationState, setAnimationState] = useState<"falling" | "floating">("falling");
  const trailIndices = [1, 2, 3, 4]; 

  // Lógica: Si está seleccionada forzamos "selected", si no, usamos el estado local (falling/floating)
  const currentAnimation = isSelected ? "selected" : animationState;

  return (
    <>
      {/* ESTELA: Solo se muestra si NO está seleccionada (!isSelected) */}
      {!isSelected && trailIndices.map((i) => (
        <motion.div
          key={`trail-${i}`}
          className="bubble circle"
          initial="hidden"
          animate={animationState} // La estela sigue su vida normal hasta desaparecer
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
        >
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', opacity: 0.6 / (i * 0.6 + 1), transform: `scale(${1 - (i * 0.2)})` }} />
        </motion.div>
      ))}

      {/* BURBUJA PRINCIPAL */}
      <motion.div
        className="bubble circle"
        initial="hidden"
        
        // AQUÍ ESTÁ LA MAGIA: Cambiamos la animación según la selección
        animate={currentAnimation}
        
        variants={variants}
        custom={0}
        onClick={onSelect} // Ejecuta la función del padre al hacer click
        
        style={{
          zIndex: isSelected ? 100 : 20, // Si está seleccionada, z-index alto
          background: 'white',
          padding: '6px',
          overflow: 'visible', // Visible para mostrar el nombre afuera
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isSelected ? '0 0 50px rgba(0,0,0,0.3)' : '0 0 15px rgba(148, 163, 184, 0.35)', // Sombra más fuerte al seleccionar
          position: 'absolute',
          cursor: 'pointer'
        }}
        
        // Transición suave para la caída inicial
        transition={animationState === "falling" 
          ? { type: "spring", stiffness: 80, damping: 15, delay: delay } 
          : undefined // Deja que la variante maneje las otras transiciones
        }
        
        onAnimationComplete={(definition) => {
          if (definition === "falling") setAnimationState("floating");
        }}
        
        // Hover solo si NO está seleccionada
        whileHover={!isSelected ? { scale: 1.25, zIndex: 100, rotate: 0 } : {}}
      >
        <img 
          src={item.logo} 
          alt={item.label}
          style={{ width: '80%', height: '80%', objectFit: 'contain', pointerEvents: 'none' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        {!item.logo && <span className="text-[9px] text-black font-bold text-center leading-tight">{item.label}</span>}

        {/* NOMBRE COMPLETO: Aparece solo si está seleccionado */}
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.5 }}
            animate={{ opacity: 1, y: 40, scale: 0.4 }} // Escala pequeña porque el padre es gigante (scale 2.5)
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: '100%',
              background: 'rgba(255,255,255,0.95)',
              padding: '8px 12px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none'
            }}
          >
            <span className="text-lg font-black text-black uppercase tracking-wider">{item.label}</span>
          </motion.div>
        )}

      </motion.div>
    </>
  );
};


const Home: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const particles = useMemo(() => Array.from({ length: 30 }).map(() => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${0.5 + Math.random()}s`,
  })), []);

  const handleBubbleClick = (i: number) => {
    // Toggle: si ya está seleccionado, lo deselecciona
    setSelectedIndex(prev => prev === i ? null : i);
  }

  return (
    <div className="home-container">
      <div className="falling-bg">
        {particles.map((p, i) => (
          <div key={i} className="particle" style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }} />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <header className="home-header" style={{ marginBottom: '2rem' }}>
          <h1>Voto Informado</h1>
          <p>Una visión general del escenario político.</p>
        </header>

        <section className="section" style={{ width: '100%', maxWidth: '1000px', position: 'relative' }}>
          
          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Partidos en contienda</h2>
          
          <div className="v-layout" style={{ position: 'relative', height: '600px', marginBottom: '-500px', zIndex: 50 }}>
            {bubbleItems.map((item, i) => (
              <WindyBubble 
                key={i} 
                item={item} 
                delay={i * 0.15} 
                isSelected={selectedIndex === i}
                
                // CORRECCIÓN AQUÍ:
                onSelect={() => handleBubbleClick(i)} 
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;