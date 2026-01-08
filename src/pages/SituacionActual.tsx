import React, { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Link } from "react-router-dom"
import { DollarSign, HeartPulse, GraduationCap, Shield } from "lucide-react"
import { ReferenceDot, ReferenceArea } from "recharts"


import { DATA_ACTUALIDAD } from "../data/situacion.data"
import { HITOS } from "../data/hitos.data"


import "swiper/css"
import "../styles/Panorama.css"

const slides = [
  { img: "/Images/situacion_actual/poblacion.jpg", text: "Inflación histórica" },
  { img: "/Images/situacion_actual/salud.jpg", text: "Crisis sanitaria" },
  { img: "/Images/situacion_actual/vendedor.jpg", text: "Inseguridad ciudadana" }
]

/* Componente principal de la página de Situación Actual */
const SituacionActual: React.FC = () => {
  const [tema, setTema] = useState<keyof typeof DATA_ACTUALIDAD>("economia")
  const currentData = DATA_ACTUALIDAD[tema]
  const minYear = Math.min(...currentData.map((d: { year: number }) => d.year))
  const maxYear = Math.max(...currentData.map((d: { year: number }) => d.year))
  const [year, setYear] = useState(maxYear)


  const [cursor, setCursor] = useState({ x: 0, y: 0, show: false })


  useEffect(() => {
    setYear(maxYear)
  }, [tema])

  const chartData = DATA_ACTUALIDAD[tema].filter((d: any) => d.year <= year)


  const TEMAS = [
    { key: "economia", label: "Economía", icon: <DollarSign size={18} /> },
    { key: "salud", label: "Salud", icon: <HeartPulse size={18} /> },
    { key: "educacion", label: "Educación", icon: <GraduationCap size={18} /> },
    { key: "seguridad", label: "Seguridad", icon: <Shield size={18} /> }
  ]

  /* Ranges for ReferenceArea */
  const [rangeA, setRangeA] = useState<[number, number]>([minYear, minYear + 5])
  const [rangeB, setRangeB] = useState<[number, number]>([maxYear - 5, maxYear])


  return (
    <div className="situacion-actual">
      {/* FONDO GENERAL */}
      <div className="globalBackground" />

      {/* CARRUSEL */}
      <Swiper className="carousel" loop modules={[Autoplay]} autoplay={{ delay: 3000 }}>
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="slide soft">
              <img src={s.img} alt={s.text} />
              <div className="slideText">{s.text}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* PANEL DE GRÁFICOS */}
      <div className="panelZone horizontal">
        <div className="sideControls soft">
          <div className="temas">
            {TEMAS.map(t => (
              <button
                key={t.key}
                onClick={() => setTema(t.key as keyof typeof DATA_ACTUALIDAD)}
                className={`temaBtn ${tema === t.key ? "activo" : ""}`}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* LÍNEA DE TIEMPO */}
          <div className="timeline">
            <span>{minYear}</span>
            <input
              type="range"
              min={minYear}
              max={maxYear}
              value={year}
              onChange={e => setYear(+e.target.value)}
            />
            <span>{year}</span>
          </div>
        </div>

        <div
          className="panel soft"
          onMouseMove={e => setCursor({ x: e.clientX, y: e.clientY, show: true })}
          onMouseLeave={() => setCursor(c => ({ ...c, show: false }))}
        >
          {cursor.show && (
            <div
              className="cursorGlow"
              style={{ left: cursor.x, top: cursor.y }}
            />
          )}

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chartData}>
              <defs>
                <linearGradient id="blueGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00e5ff" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#00e5ff" stopOpacity={0.15} />
                </linearGradient>
              </defs>

              <XAxis dataKey="year" stroke="#aaa" />
              <YAxis stroke="#aaa" />


              <Tooltip
                content={({ label, payload }) => {
                  if (!payload || !payload.length) return null

                  const hito =
                    HITOS[tema][label as keyof typeof HITOS[typeof tema]]

                  return (
                    <div className="tooltipBox">
                      <strong>{label}</strong><br />
                      Valor: {payload[0].value}%<br />
                      {hito && <span className="hitoText">📌 {hito}</span>}
                    </div>
                  )
                }}
              />



              <Line
                type="monotone"
                dataKey="value"
                stroke="#00e5ff"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
                fill="url(#blueGlow)"
                isAnimationActive
              />

              {Object.entries(HITOS[tema])
                .filter(([y]) => +y <= year)
                .map(([y, text]) => {
                  const point = chartData.find(d => d.year === +y)
                  if (!point) return null
                  return (
                    <ReferenceDot
                      key={y}
                      x={+y}
                      y={point.value}
                      r={7}
                      fill="#ff3b3b"
                      stroke="white"
                      strokeWidth={2}
                    />
                  )
                })}


              <ReferenceArea x1={rangeA[0]} x2={rangeA[1]} fill="#00ffcc" fillOpacity={0.12} />
              <ReferenceArea x1={rangeB[0]} x2={rangeB[1]} fill="#ff0066" fillOpacity={0.12} />


            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BOTÓN PARA IR A CANDIDATOS */}
      <div className="nav-to-candidatos">
        <Link to="/home" className="nav-button">
          <span>Ver Partidos en Contienda</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default SituacionActual