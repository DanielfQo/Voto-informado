const partidos = [
  {
    id: "accion-popular",
    nombre: "Acción Popular",
    logo: "logos/accion-popular.png",
    fuente: "Plan de Gobierno Acción Popular 2021–2026 (JNE)",
    propuestas: [

      {
        id: 1,
        tema: "Economía",
        titulo: "Créditos accesibles para MYPES",
        tipo: "Concreta",
        explicacion:
          "Otorgar créditos baratos a las micro y pequeñas empresas mediante mecanismos de mercado, priorizando a las MYPES como motor principal de la economía nacional.",
        problema:
          "Alta informalidad, falta de financiamiento y dependencia de créditos con tasas elevadas.",
        fuente:
          "Plan de Gobierno AP 2021–2026, sección Reactivación Económica y Empleo."
      },

      {
        id: 2,
        tema: "Economía",
        titulo: "Reducción de la informalidad económica",
        tipo: "Concreta",
        explicacion:
          "Reducir la informalidad económica mediante incentivos y facilidades para la formalización, en lugar de sanciones, con la meta de reducirla al 30% en cinco años.",
        problema:
          "El 75% de la economía peruana opera de manera informal.",
        fuente:
          "Plan de Gobierno AP 2021–2026, Objetivos Nacionales."
      },

      {
        id: 3,
        tema: "Salud",
        titulo: "Fortalecimiento de la atención primaria en salud",
        tipo: "Concreta",
        explicacion:
          "Potenciar centros de atención primaria, postas médicas y prevención de enfermedades para evitar la congestión hospitalaria.",
        problema:
          "Sistema de salud reactivo y saturación de hospitales.",
        fuente:
          "Plan de Gobierno AP 2021–2026, sección Salud."
      },

      {
        id: 4,
        tema: "Salud",
        titulo: "Implementación de telemedicina a nivel nacional",
        tipo: "Promesa",
        explicacion:
          "Desarrollar telemedicina, historia clínica electrónica e interconexión digital para reducir brechas de acceso en zonas alejadas.",
        problema:
          "Desigualdad territorial en el acceso a servicios de salud.",
        fuente:
          "Plan de Gobierno AP 2021–2026, sección Innovación en Salud."
      },

      {
        id: 5,
        tema: "Educación",
        titulo: "Incremento de la inversión en educación pública",
        tipo: "Promesa",
        explicacion:
          "Aumentar progresivamente la inversión educativa hasta el 10% del PBI, siguiendo estándares de países de la OECD.",
        problema:
          "Deterioro de la calidad educativa e infraestructura deficiente.",
        fuente:
          "Plan de Gobierno AP 2021–2026, sección Revolución de la Educación."
      },

      {
        id: 6,
        tema: "Educación",
        titulo: "Capacitación y meritocracia docente",
        tipo: "Concreta",
        explicacion:
          "Implementar capacitación continua y meritocracia docente, con mejores remuneraciones e incentivos basados en desempeño.",
        problema:
          "Desigualdad en la calidad de la enseñanza y falta de incentivos docentes.",
        fuente:
          "Plan de Gobierno AP 2021–2026, sección Educación."
      },

      {
        id: 7,
        tema: "Economía",
        titulo: "Control de monopolios y oligopolios",
        tipo: "Concreta",
        explicacion:
          "Reactivar el control previo de fusiones empresariales para proteger la libre competencia y a los consumidores.",
        problema:
          "Abuso de posición dominante y altos precios en productos esenciales.",
        fuente:
          "Plan de Gobierno AP 2021–2026, sección Libre Competencia."
      },

      {
        id: 8,
        tema: "Gobernanza",
        titulo: "Lucha frontal contra la corrupción",
        tipo: "Promesa",
        explicacion:
          "Reforzar mecanismos de control, transparencia y gobierno abierto para reducir la corrupción en el Estado.",
        problema:
          "Pérdida de confianza ciudadana y corrupción estructural.",
        fuente:
          "Plan de Gobierno AP 2021–2026, Principios AMA SUA, AMA LLULLA, AMA QUELLA."
      }

    ]
  },

  {
  id: "fuerza-popular",
  nombre: "Fuerza Popular",
  logo: "logos/fuerza-popular.png",
  propuestas: [

    // ===================== SALUD =====================
    {
      id: "fp-salud-1",
      tema: "Salud",
      titulo: "Fortalecimiento del primer nivel de atención",
      tipo: "Concreta",
      explicacion: "El plan de gobierno propone reforzar el primer nivel de atención en salud como eje del sistema sanitario, priorizando centros de salud, postas médicas y atención preventiva, con el objetivo de reducir la sobrecarga hospitalaria.",
      problema: "Sistema de salud centrado en atención reactiva y colapso hospitalario",
      fuente: "Plan de Gobierno Fuerza Popular – Eje Salud"
    },
    {
      id: "fp-salud-2",
      tema: "Salud",
      titulo: "Mejoramiento de la infraestructura hospitalaria",
      tipo: "Concreta",
      explicacion: "Se plantea mejorar y ampliar la infraestructura hospitalaria, incluyendo equipamiento médico y capacidad de atención, como respuesta a las deficiencias evidenciadas durante la pandemia.",
      problema: "Déficit de infraestructura hospitalaria y equipamiento médico",
      fuente: "Plan de Gobierno Fuerza Popular – Eje Salud"
    },
    {
      id: "fp-salud-3",
      tema: "Salud",
      titulo: "Rescate integral del sistema de salud pública",
      tipo: "Promesa",
      explicacion: "El plan establece como objetivo general el rescate del sistema de salud pública, buscando cerrar brechas históricas de acceso y calidad, sin detallar mecanismos específicos de implementación en todos los niveles.",
      problema: "Brechas estructurales en el acceso a servicios de salud",
      fuente: "Plan de Gobierno Fuerza Popular – Rescate del Estado"
    },

    // ===================== ECONOMÍA =====================
    {
      id: "fp-econ-1",
      tema: "Economía",
      titulo: "Reactivación económica post pandemia",
      tipo: "Promesa",
      explicacion: "Fuerza Popular propone impulsar la reactivación económica como prioridad nacional, enfocándose en la recuperación del empleo y el crecimiento productivo tras la crisis sanitaria.",
      problema: "Crisis económica y pérdida masiva de empleos",
      fuente: "Plan de Gobierno Fuerza Popular – Eje Económico"
    },
    {
      id: "fp-econ-2",
      tema: "Economía",
      titulo: "Defensa de la economía social de mercado",
      tipo: "Concreta",
      explicacion: "El plan reafirma el compromiso con la economía social de mercado y la estabilidad macroeconómica, promoviendo disciplina fiscal, respeto a la Constitución y estabilidad monetaria.",
      problema: "Riesgo de inestabilidad económica y desconfianza en la inversión",
      fuente: "Plan de Gobierno Fuerza Popular – Principios Económicos"
    },
    {
      id: "fp-econ-3",
      tema: "Economía",
      titulo: "Promoción de la inversión privada",
      tipo: "Promesa",
      explicacion: "Se plantea incentivar la inversión privada como motor del crecimiento económico, sin detallar instrumentos específicos de incentivo o regulación.",
      problema: "Baja inversión y desaceleración económica",
      fuente: "Plan de Gobierno Fuerza Popular – Eje Económico"
    },

    // ===================== EDUCACIÓN =====================
    {
      id: "fp-edu-1",
      tema: "Educación",
      titulo: "Mejorar la calidad de la educación básica",
      tipo: "Promesa",
      explicacion: "El plan propone mejorar la calidad educativa a nivel nacional, enfocándose en aprendizajes fundamentales y reducción de brechas, sin detallar acciones concretas en todos los niveles.",
      problema: "Bajo rendimiento educativo y brechas de aprendizaje",
      fuente: "Plan de Gobierno Fuerza Popular – Eje Educación"
    },
    {
      id: "fp-edu-2",
      tema: "Educación",
      titulo: "Fortalecimiento del rol del docente",
      tipo: "Concreta",
      explicacion: "Se plantea fortalecer la carrera docente mediante capacitación y reconocimiento al mérito, como eje para mejorar la calidad educativa.",
      problema: "Débil formación continua del personal docente",
      fuente: "Plan de Gobierno Fuerza Popular – Eje Educación"
    }

  ]
},

  {
    id: "partido-morado",
    nombre: "Partido Morado",
    logo: "logos/partido-morado.png",
    propuestas: [
      {
        id: 5,
        tema: "Educación",
        titulo: "Capacitación docente continua",
        tipo: "Concreta",
        explicacion: "Programas permanentes de capacitación para docentes.",
        problema: "Calidad educativa desigual",
      },
      {
        id: 6,
        tema: "Salud",
        titulo: "Prevención y atención primaria",
        tipo: "Concreta",
        explicacion: "Fortalecer centros de atención primaria.",
        problema: "Sistema de salud reactivo",
      }
    ]
  },

  {
    id: "alianza-progreso",
    nombre: "Alianza para el Progreso",
    logo: "logos/alianza-progreso.png",
    propuestas: [
      {
        id: 7,
        tema: "Economía",
        titulo: "Obras de infraestructura",
        tipo: "Promesa",
        explicacion: "Impulsar grandes obras públicas.",
        problema: "Falta de empleo",
      },
      {
        id: 8,
        tema: "Educación",
        titulo: "Becas para jóvenes",
        tipo: "Concreta",
        explicacion: "Programas de becas para educación superior.",
        problema: "Acceso limitado a educación superior",
      }
    ]
  },

  {
    id: "juntos-por-el-peru",
    nombre: "Juntos por el Perú",
    logo: "logos/juntos-por-el-peru.png",
    propuestas: [
      {
        id: 9,
        tema: "Salud",
        titulo: "Sistema de salud universal",
        tipo: "Promesa",
        explicacion: "Acceso gratuito a servicios básicos de salud.",
        problema: "Desigualdad en atención médica",
      },
      {
        id: 10,
        tema: "Economía",
        titulo: "Protección laboral",
        tipo: "Concreta",
        explicacion: "Fortalecer derechos laborales.",
        problema: "Precariedad laboral",
      }
    ]
  },

  {
    id: "renovacion-popular",
    nombre: "Renovación Popular",
    logo: "logos/renovacion-popular.png",
    propuestas: [
      {
        id: 11,
        tema: "Educación",
        titulo: "Educación en valores",
        tipo: "Promesa",
        explicacion: "Incorporar valores éticos en la educación.",
        problema: "Crisis de valores",
      },
      {
        id: 12,
        tema: "Economía",
        titulo: "Reducción del gasto público",
        tipo: "Concreta",
        explicacion: "Optimizar el uso de recursos del Estado.",
        problema: "Ineficiencia estatal",
      }
    ]
  },
    {
    id: "fe-en-el-peru",
    nombre: "Fe en el Perú",
    logo: "logos/fe-en-el-peru.png",
    propuestas: [
      { id: 13, tema: "Economía", titulo: "Formalización y MYPE", tipo: "Concreta",
        explicacion: "Simplificar trámites y facilitar formalización para microempresas.",
        problema: "Alta informalidad laboral" },
      { id: 14, tema: "Salud", titulo: "Mejorar atención primaria", tipo: "Promesa",
        explicacion: "Impulsar campañas de prevención y fortalecer postas médicas.",
        problema: "Baja cobertura de atención básica" },
    ]
  },

  {
    id: "ciudadanos-por-el-peru",
    nombre: "Partido Ciudadanos por el Perú",
    logo: "logos/ciudadanos-por-el-peru.png",
    propuestas: [
      { id: 15, tema: "Educación", titulo: "Infraestructura escolar", tipo: "Promesa",
        explicacion: "Mejorar y ampliar colegios con enfoque en regiones.",
        problema: "Colegios en mal estado" },
      { id: 16, tema: "Economía", titulo: "Empleo juvenil", tipo: "Concreta",
        explicacion: "Incentivos para contratación juvenil y prácticas remuneradas.",
        problema: "Desempleo juvenil" },
    ]
  },

  {
    id: "somos-peru",
    nombre: "Partido Democrático Somos Perú",
    logo: "logos/somos-peru.png",
    propuestas: [
      { id: 17, tema: "Salud", titulo: "Reducir colas en hospitales", tipo: "Concreta",
        explicacion: "Gestión de citas y refuerzo de turnos en hospitales públicos.",
        problema: "Largas esperas y saturación" },
      { id: 18, tema: "Educación", titulo: "Mejorar calidad educativa", tipo: "Promesa",
        explicacion: "Programas para elevar rendimiento escolar.",
        problema: "Brechas educativas" },
    ]
  },

  {
    id: "frepap-fia",
    nombre: "Frente Popular Agrícola FIA del Perú",
    logo: "logos/frepap-fia.png",
    propuestas: [
      { id: 19, tema: "Economía", titulo: "Impulso a agricultura familiar", tipo: "Concreta",
        explicacion: "Apoyo técnico y acceso a mercados para pequeños agricultores.",
        problema: "Baja productividad agrícola" },
      { id: 20, tema: "Salud", titulo: "Nutrición y prevención", tipo: "Promesa",
        explicacion: "Campañas de nutrición y prevención en zonas rurales.",
        problema: "Anemia y desnutrición" },
    ]
  },

  {
    id: "obras",
    nombre: "Partido Cívico Obras",
    logo: "logos/obras.png",
    propuestas: [
      { id: 21, tema: "Economía", titulo: "Obras rápidas locales", tipo: "Concreta",
        explicacion: "Priorizar proyectos cortos con impacto en empleo local.",
        problema: "Falta de trabajo y servicios" },
      { id: 22, tema: "Educación", titulo: "Conectividad escolar", tipo: "Promesa",
        explicacion: "Mejorar acceso a internet y recursos digitales.",
        problema: "Brecha digital" },
    ]
  },

  {
    id: "frente-esperanza-2021",
    nombre: "Partido Frente de la Esperanza 2021",
    logo: "logos/frente-esperanza-2021.png",
    propuestas: [
      { id: 23, tema: "Salud", titulo: "Salud mental comunitaria", tipo: "Concreta",
        explicacion: "Fortalecer centros comunitarios de apoyo psicológico.",
        problema: "Baja atención en salud mental" },
      { id: 24, tema: "Economía", titulo: "Apoyo a emprendedores", tipo: "Promesa",
        explicacion: "Programas para facilitar capital semilla y asesoría.",
        problema: "Barreras para emprender" },
    ]
  }

];
