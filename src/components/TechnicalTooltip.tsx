import React, { useState } from "react"
import { DICCIONARIO_TECNICO } from "../data/diccionario.data.ts"

export default function TechnicalTooltip({ text }: { text: string }) {
  const [active, setActive] = useState<string | null>(null)

  let parsed = text

  DICCIONARIO_TECNICO.forEach(term => {
    const regex = new RegExp(`\\b(${term.termino})\\b`, "gi")

    parsed = parsed.replace(regex, (match) =>
      `<span class="tech-word" data-term="${term.termino}">${match}</span>`
    )
  })

  return (
    <span
      onMouseOver={(e) => {
        const t = (e.target as HTMLElement).dataset.term
        if (t) setActive(t)
      }}
      onMouseOut={() => setActive(null)}
      style={{ position: "relative" }}
    >
      <span dangerouslySetInnerHTML={{ __html: parsed }} />

      {active && (() => {
        const t = DICCIONARIO_TECNICO.find(d => d.termino === active)
        if (!t) return null
        return (
          <div className="tech-tooltip">
            <strong>{t.termino}</strong>
            <p>{t.definicion}</p>
            <small>{t.porQueImporta}</small>
          </div>
        )
      })()}
    </span>
  )
}
