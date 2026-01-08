import React, { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot, ReferenceArea } from "recharts"
import { Link } from "react-router-dom"
import { DollarSign, HeartPulse, GraduationCap, Shield } from "lucide-react"
import { DATA_ACTUALIDAD } from "../data/situacion.data"
import { HITOS } from "../data/hitos.data"
import "swiper/css"
import "../styles/Panorama.css"

const slides = [
  { img: "/Images/situacion_actual/poblacion.jpg", text: "Inflación histórica" },
  { img: "/Images/situacion_actual/salud.jpg", text: "Crisis sanitaria" },
  { img: "/Images/situacion_actual/vendedor.jpg", text: "Inseguridad ciudadana" }
]

const TEMAS = [
  { key: "economia", label: "Economía", icon: <DollarSign size={18} /> },
  { key: "salud", label: "Salud", icon: <HeartPulse size={18} /> },
  { key: "educacion", label: "Educación", icon: <GraduationCap size={18} /> },
  { key: "seguridad", label: "Seguridad", icon: <Shield size={18} /> }
]

/* Componente principal de la página de Situación Actual */
const SituacionActual: React.FC = () => {
  const [tema, setTema] = useState<keyof typeof DATA_ACTUALIDAD>("economia")
  const [year, setYear] = useState<number>(0)
  const [cursor, setCursor] = useState({ x: 0, y: 0, show: false })

  const currentData = DATA_ACTUALIDAD[tema]
  const minYear = Math.min(...currentData.map((d) => d.year))
  const maxYear = Math.max(...currentData.map((d) => d.year))

  useEffect(() => {
    setYear(maxYear)
  }, [tema, maxYear])

  const chartData = DATA_ACTUALIDAD[tema].filter((d) => d.year <= year)

  // Stats para el panel izquierdo
  const lastPoint = chartData[chartData.length - 1]
  const firstPoint = chartData[0]
  const delta = firstPoint && lastPoint ? (lastPoint.value - firstPoint.value) : null

  // Hito del año seleccionado
  const hitoActual = HITOS[tema][year as keyof typeof HITOS[typeof tema]] as string | undefined

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

      {/* PANEL ZONE (layout 3 filas) */}
      <div className="panelZone layout3 soft">
        {/* Fila 1: Tabs + slider en una sola fila */}
        <div className="topRow">
          <div className="temasRow">
            {TEMAS.map((t) => (
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

          <div className="timelineRow">
            <span className="yearMin">{minYear}</span>
            <input
              type="range"
              min={minYear}
              max={maxYear}
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            />
            <span className="yearMax">{maxYear}</span>
            <span className="yearNow">{year}</span>
          </div>
        </div>

        {/* Fila 2: Resumen + 4 stats en una sola fila */}
        <div className="summaryRow">
          <div className="summaryTitle">
            <h3 style={{ margin: 0 }}>
              Resumen de {TEMAS.find((t) => t.key === tema)?.label}
            </h3>
            <p style={{ margin: "6px 0 0", opacity: 0.85 }}>
              Selecciona un año o un hito para ver el contexto.
            </p>
          </div>

          <div className="statsRow">
            <div className="statCard">
              <div className="k">Año</div>
              <div className="v">{year}</div>
            </div>

            <div className="statCard">
              <div className="k">Valor</div>
              <div className="v">{lastPoint?.value ?? "-"}%</div>
            </div>

            <div className="statCard">
              <div className="k">Desde {firstPoint?.year ?? "-"}</div>
              <div className="v">{delta !== null ? `${delta.toFixed(1)}%` : "-"}</div>
            </div>

            <div className="statCard">
              <div className="k">Datos</div>
              <div className="v">{chartData.length}</div>
            </div>
          </div>
        </div>

        {/* Fila 3: izquierda hitos / derecha gráfico */}
        <div className="bottomRow">
          {/* Hitos (izquierda) */}
          <div className="hitosPanel">
            <div className="hitoBox">
              <div className="title">📌 Hito del año</div>
              <div style={{ opacity: 0.95 }}>
                {hitoActual ? hitoActual : "No hay hito registrado para este año."}
              </div>
            </div>

            <div className="hitosList">
              {Object.entries(HITOS[tema])
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([y, text]) => (
                  <div
                    key={y}
                    className={`hitoItem ${Number(y) === year ? "active" : ""}`}
                    onClick={() => setYear(Number(y))}
                    title="Click para saltar a este año"
                  >
                    <div className="hitoYear">{y}</div>
                    <div style={{ lineHeight: 1.2 }}>{text as string}</div>
                  </div>
                ))}
            </div>
          </div>

          {/* Gráfico (derecha) */}
          <div
            className="chartPanel"
            onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY, show: true })}
            onMouseLeave={() => setCursor((c) => ({ ...c, show: false }))}
          >
            {cursor.show && <div className="cursorGlow" style={{ left: cursor.x, top: cursor.y }} />}

            <ResponsiveContainer width="100%" height={300}>
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
                    const hito = HITOS[tema][label as keyof typeof HITOS[typeof tema]]
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

                {/* Highlight del año seleccionado */}
                <ReferenceArea x1={year - 0.4} x2={year + 0.4} fill="#00e5ff" fillOpacity={0.12} />

                {(() => {
                  const point = chartData.find((d) => d.year === year)
                  if (!point) return null
                  return <ReferenceDot x={year} y={point.value} r={9} fill="#00e5ff" stroke="white" strokeWidth={2} />
                })()}

                {/* Hitos */}
                {Object.entries(HITOS[tema])
                  .filter(([y]) => Number(y) <= year)
                  .map(([y]) => {
                    const p = chartData.find((d) => d.year === Number(y))
                    if (!p) return null
                    return <ReferenceDot key={y} x={Number(y)} y={p.value} r={7} fill="#ff3b3b" stroke="white" strokeWidth={2} />
                  })}
              </LineChart>
            </ResponsiveContainer>
          </div>
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