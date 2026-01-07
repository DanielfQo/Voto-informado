import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"

import "swiper/css"

import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts"

import "../styles/Home.css"

const slides = [
  { img: "/public/Images/situacion_actual/poblacion.jpg", text: "Inflacion historica" },
  { img: "/public/Images/situacion_actual/salud.jpg", text: "Crisis sanitaria" },
  { img: "/public/Images/situacion_actual/vendedor.jpg", text: "Inseguridad ciudadana" }
]

const DATA: any = {
  economia: [
    { year: 2010, value: 5 },
    { year: 2015, value: 3 },
    { year: 2020, value: 1 },
    { year: 2025, value: -2 }
  ],
  salud: [
    { year: 2010, value: 60 },
    { year: 2015, value: 55 },
    { year: 2020, value: 40 },
    { year: 2025, value: 35 }
  ],
  seguridad: [
    { year: 2010, value: 20 },
    { year: 2015, value: 30 },
    { year: 2020, value: 55 },
    { year: 2025, value: 70 }
  ]
}

export default function Home() {
  const [tema, setTema] = useState("economia")
  const [year, setYear] = useState(2025)

  const chartData = DATA[tema].filter((d: any) => d.year <= year)

  return (
    <div className="home">

      {/* CARRUSEL */}
      <Swiper
        className="carousel"
        loop
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="slide">
              <img src={s.img} />
              <div className="slideText">{s.text}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* TEMAS */}
      <div className="temas">
        {["economia", "salud", "seguridad"].map(t => (
          <button
            key={t}
            onClick={() => setTema(t)}
            className={tema === t ? "activo" : ""}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* TIMELINE */}
      <div className="timeline">
        <span>ANTES</span>
        <input
          type="range"
          min={2010}
          max={2025}
          value={year}
          onChange={e => setYear(+e.target.value)}
        />
        <span>HOY {year}</span>
      </div>

      {/* PANEL DE GRAFICOS */}
      <div className="panel">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line dataKey="value" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* CTA */}
      <button className="cta">
        QUIERES CAMBIAR ESTO?
      </button>

    </div>
  )
}