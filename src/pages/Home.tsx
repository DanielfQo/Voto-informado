import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"


import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts"

import "../styles/Home.css"

const slides = [
  { img: "/public/Images/situacion_actual/poblacion.jpg", text: "Inflación histórica" },
  { img: "/public/Images/situacion_actual/salud.jpg", text: "Crisis sanitaria" },
  { img: "/public/Images/situacion_actual/vendedor.jpg", text: "Inseguridad ciudadana" }
]


const DATA_ACTUALIDAD: any = {
  economia: [ /* ECONOMÍA */
    { year: 1951, value: 9.3 }, { year: 1952, value: 5.9 }, { year: 1953, value: 5.8 }, { year: 1954, value: 5.3 },
    { year: 1955, value: 5.9 }, { year: 1956, value: 4.7 }, { year: 1957, value: 6.6 }, { year: 1958, value: -1.1 },
    { year: 1959, value: 3.2 }, { year: 1960, value: 9.9 }, { year: 1961, value: 7.3 }, { year: 1962, value: 10.0 },
    { year: 1963, value: 4.3 }, { year: 1964, value: 6.5 }, { year: 1965, value: 5.6 }, { year: 1966, value: 8.2 },
    { year: 1967, value: 3.9 }, { year: 1968, value: 0.2 }, { year: 1969, value: 3.5 }, { year: 1970, value: 3.4 },
    { year: 1971, value: 4.6 }, { year: 1972, value: 3.5 }, { year: 1973, value: 6.3 }, { year: 1974, value: 9.4 },
    { year: 1975, value: 4.3 }, { year: 1976, value: 1.4 }, { year: 1977, value: 0.3 }, { year: 1978, value: -2.6 },
    { year: 1979, value: 4.1 }, { year: 1980, value: 5.9 }, { year: 1981, value: 5.6 }, { year: 1982, value: -0.2 },
    { year: 1983, value: -10.4 }, { year: 1984, value: 3.6 }, { year: 1985, value: 2.1 }, { year: 1986, value: 9.4 },
    { year: 1987, value: 9.7 }, { year: 1988, value: -9.4 }, { year: 1989, value: -12.3 }, { year: 1990, value: -5.0 },
    { year: 1991, value: 2.2 }, { year: 1992, value: -0.5 }, { year: 1993, value: 5.2 }, { year: 1994, value: 12.3 },
    { year: 1995, value: 7.4 }, { year: 1996, value: 2.8 }, { year: 1997, value: 6.5 }, { year: 1998, value: -0.4 },
    { year: 1999, value: 1.5 }, { year: 2000, value: 2.7 }, { year: 2001, value: 0.6 }, { year: 2002, value: 5.5 },
    { year: 2003, value: 4.2 }, { year: 2004, value: 5.0 }, { year: 2005, value: 6.3 }, { year: 2006, value: 7.5 },
    { year: 2007, value: 8.5 }, { year: 2008, value: 9.1 }, { year: 2009, value: 1.1 }, { year: 2010, value: 8.3 },
    { year: 2011, value: 6.3 }, { year: 2012, value: 6.1 }, { year: 2013, value: 5.9 }, { year: 2014, value: 2.4 },
    { year: 2015, value: 3.3 }, { year: 2016, value: 4.0 }, { year: 2017, value: 2.5 }, { year: 2018, value: 4.0 },
    { year: 2019, value: 2.2 }, { year: 2020, value: -10.9 }, { year: 2021, value: 13.4 }, { year: 2022, value: 2.8 },
    { year: 2023, value: -0.4 }, { year: 2024, value: 3.5 }
  ],

  salud: [
    { year: 2016, value: 3.4 }, { year: 2017, value: 1.2 }, { year: 2018, value: 2.1 },
    { year: 2019, value: 4.8 }, { year: 2020, value: -2.9 }, { year: 2021, value: 2.6 },
    { year: 2022, value: 0.4 }, { year: 2023, value: 1.9 }
  ],

  educacion: [
    { year: 2015, value: 1.6 }, { year: 2016, value: 0.6 }, { year: 2017, value: 0.9 }, { year: 2018, value: 2.3 },
    { year: 2019, value: 1.2 }, { year: 2020, value: -4.6 }, { year: 2021, value: 2.1 },
    { year: 2022, value: 1.8 }, { year: 2023, value: 1.3 }, { year: 2024, value: 1.2 }
  ],

  seguridad: [
    { year: 2019, value: -11.1 }, { year: 2020, value: 21 }, { year: 2021, value: -2.7 },
    { year: 2022, value: -9.9 }, { year: 2023, value: -6.9 }, { year: 2024, value: 0.1 }
  ]
}




export default function Home() {
  const [tema, setTema] = useState<keyof typeof DATA_ACTUALIDAD>("economia")

  const currentData = DATA_ACTUALIDAD[tema]
  const minYear = Math.min(...currentData.map((d: { year: number }) => d.year))
  const maxYear = Math.max(...currentData.map((d: { year: number }) => d.year))

  const [year, setYear] = useState(maxYear)

  useEffect(() => {
    setYear(maxYear)
  }, [tema])

  const chartData = DATA_ACTUALIDAD[tema].filter((d: any) => d.year <= year)

  const [open, setOpen] = useState(false)

  return (
    <div className="home">

      {/* FONDO GENERAL */}
      <div className="globalBackground" />

      {/* CARRUSEL */}
      <Swiper className="carousel" loop modules={[Autoplay]} autoplay={{ delay: 3000 }}>
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="slide soft">
              <img src={s.img} />
              <div className="slideText">{s.text}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* PANEL */}
      <div className="panelZone horizontal">

        <div className="sideControls soft">
          <div className="temas">
            {["economia", "salud", "educacion", "seguridad"].map(t => (
              <button key={t} onClick={() => setTema(t)} className={tema === t ? "activo" : ""}>
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="timeline">
            <span>{minYear}</span>
            <input type="range" min={minYear} max={maxYear} value={year}
              onChange={e => setYear(+e.target.value)} />
            <span>{year}</span>
          </div>
        </div>

        <div className="panel soft">
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
                wrapperStyle={{ zIndex: 9999 }}
                content={({ payload, label }) => {
                  if (!payload || !payload.length) return null
                  const v = payload[0].value
                  const positive = v >= 0

                  return (
                    <div className={`tooltipBox ${positive ? "pos" : "neg"}`}>
                      {label}: {v}%
                    </div>
                  )
                }}
              />


              <Line type="monotone" dataKey="value" stroke="#00e5ff"
                strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }}
                fill="url(#blueGlow)" isAnimationActive />
            </LineChart>
          </ResponsiveContainer>

        </div>
      </div>


      {/* FLECHA DESBLOQUEO */}
      <div className={`unlockArrow ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
        <span />
      </div>


      {/* ZONA DE CANDIDATOS */}
      <div className={`candidatosZone ${open ? "show" : ""}`}>
        <h2>Zona de Candidatos</h2>
        <div className="cards">
          <div className="card">Candidato A</div>
          <div className="card">Candidato B</div>
          <div className="card">Candidato C</div>
        </div>
      </div>
    </div>
  )
}
