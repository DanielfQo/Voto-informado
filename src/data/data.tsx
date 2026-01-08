export const partidos = [
  {
    id: "accion-popular",
    nombre: "Acción Popular",
    logo: "/logos/accion-popular.png",
    fuente: "Plan de Gobierno Acción Popular 2021-2026 (JNE)",
    candidato: {
      nombre: "Yonhy Lescano",
      descripcion: "Abogado y excongresista. Postura de centro, enfocado en lucha anticorrupción y fortalecimiento del Estado.",
      foto: "/candidatos/accion-popular.png"
    },
    propuestas: [
      {
        id: 1,
        tema: "Economía",
        titulo: "Créditos accesibles para MYPES",
        tipo: "Concreta",
        explicacion: "Otorgar créditos baratos a las micro y pequeñas empresas mediante mecanismos de mercado, priorizando a las MYPES como motor principal de la economía nacional.",
        problema: "Alta informalidad, falta de financiamiento y dependencia de créditos con tasas elevadas.",
        fuente: "Plan de Gobierno AP 2021-2026, sección Reactivación Económica y Empleo."
      },
      {
        id: 2,
        tema: "Economía",
        titulo: "Reducción de la informalidad económica",
        tipo: "Concreta",
        explicacion: "Reducir la informalidad económica mediante incentivos y facilidades para la formalización, en lugar de sanciones, con la meta de reducirla al 30% en cinco años.",
        problema: "El 75% de la economía peruana opera de manera informal.",
        fuente: "Plan de Gobierno AP 2021-2026, Objetivos Nacionales."
      },
      {
        id: 3,
        tema: "Salud",
        titulo: "Fortalecimiento de la atención primaria en salud",
        tipo: "Concreta",
        explicacion: "Potenciar centros de atención primaria, postas médicas y prevención de enfermedades para evitar la congestión hospitalaria.",
        problema: "Sistema de salud reactivo y saturación de hospitales.",
        fuente: "Plan de Gobierno AP 2021-2026, sección Salud."
      },
      {
        id: 4,
        tema: "Salud",
        titulo: "Implementación de telemedicina a nivel nacional",
        tipo: "Promesa",
        explicacion: "Desarrollar telemedicina, historia clínica electrónica e interconexión digital para reducir brechas de acceso en zonas alejadas.",
        problema: "Desigualdad territorial en el acceso a servicios de salud.",
        fuente: "Plan de Gobierno AP 2021-2026, sección Innovación en Salud."
      },
      {
        id: 5,
        tema: "Educación",
        titulo: "Incremento de la inversión en educación pública",
        tipo: "Promesa",
        explicacion: "Aumentar progresivamente la inversión educativa hasta el 10% del PBI, siguiendo estándares de países de la OECD.",
        problema: "Deterioro de la calidad educativa e infraestructura deficiente.",
        fuente: "Plan de Gobierno AP 2021-2026, sección Revolución de la Educación."
      },
      {
        id: 6,
        tema: "Educación",
        titulo: "Capacitación y meritocracia docente",
        tipo: "Concreta",
        explicacion: "Implementar capacitación continua y meritocracia docente, con mejores remuneraciones e incentivos basados en desempeño.",
        problema: "Desigualdad en la calidad de la enseñanza y falta de incentivos docentes.",
        fuente: "Plan de Gobierno AP 2021-2026, sección Educación."
      },
      {
        id: 7,
        tema: "Economía",
        titulo: "Control de monopolios y oligopolios",
        tipo: "Concreta",
        explicacion: "Reactivar el control previo de fusiones empresariales para proteger la libre competencia y a los consumidores.",
        problema: "Abuso de posición dominante y altos precios en productos esenciales.",
        fuente: "Plan de Gobierno AP 2021-2026, sección Libre Competencia."
      },
      {
        id: 8,
        tema: "Gobernanza",
        titulo: "Lucha frontal contra la corrupción",
        tipo: "Promesa",
        explicacion: "Reforzar mecanismos de control, transparencia y gobierno abierto para reducir la corrupción en el Estado.",
        problema: "Pérdida de confianza ciudadana y corrupción estructural.",
        fuente: "Plan de Gobierno AP 2021-2026, Principios AMA SUA, AMA LLULLA, AMA QUELLA."
      }
    ],
    noticias: [
      {
        id: "ap-n1",
        titulo: "Acción Popular se reorganiza de cara a las elecciones 2026",
        resumen: "Dirigentes del partido anunciaron cambios internos y renovación de cuadros políticos.",
        fuente: "El Comercio"
      }
    ],
    vision: "Construir un Estado democrático, descentralizado y transparente, donde el desarrollo económico esté acompañado de justicia social y fortalecimiento institucional.",
    futuro: "Acción Popular plantea un Perú con crecimiento sostenible, reducción de la informalidad y servicios públicos de calidad, priorizando educación, salud y lucha contra la corrupción.",
    redes: {
      facebook: "https://www.facebook.com/AccionPopularOficial",
      twitter: "https://twitter.com/AccionPopular",
      instagram: "https://www.instagram.com/accionpopular"
    }
  },
  {
    id: "fuerza-popular",
    nombre: "Fuerza Popular",
    logo: "/logos/fuerza-popular.png",
    candidato: {
      nombre: "Keiko Fujimori",
      descripcion: "Excongresista y líder del fujimorismo. Defiende estabilidad económica y políticas de seguridad.",
      foto: "/candidatos/fuerza-popular.png"
    },
    propuestas: [
      {
        id: "fp-salud-1",
        tema: "Salud",
        titulo: "Fortalecimiento del primer nivel de atención",
        tipo: "Concreta",
        explicacion: "El plan de gobierno propone reforzar el primer nivel de atención en salud como eje del sistema sanitario, priorizando centros de salud, postas médicas y atención preventiva, con el objetivo de reducir la sobrecarga hospitalaria.",
        problema: "Sistema de salud centrado en atención reactiva y colapso hospitalario",
        fuente: "Plan de Gobierno Fuerza Popular - Eje Salud"
      },
      {
        id: "fp-salud-2",
        tema: "Salud",
        titulo: "Mejoramiento de la infraestructura hospitalaria",
        tipo: "Concreta",
        explicacion: "Se plantea mejorar y ampliar la infraestructura hospitalaria, incluyendo equipamiento médico y capacidad de atención, como respuesta a las deficiencias evidenciadas durante la pandemia.",
        problema: "Déficit de infraestructura hospitalaria y equipamiento médico",
        fuente: "Plan de Gobierno Fuerza Popular - Eje Salud"
      },
      {
        id: "fp-salud-3",
        tema: "Salud",
        titulo: "Rescate integral del sistema de salud pública",
        tipo: "Promesa",
        explicacion: "El plan establece como objetivo general el rescate del sistema de salud pública, buscando cerrar brechas históricas de acceso y calidad, sin detallar mecanismos específicos de implementación en todos los niveles.",
        problema: "Brechas estructurales en el acceso a servicios de salud",
        fuente: "Plan de Gobierno Fuerza Popular - Rescate del Estado"
      },
      {
        id: "fp-econ-1",
        tema: "Economía",
        titulo: "Reactivación económica post pandemia",
        tipo: "Promesa",
        explicacion: "Fuerza Popular propone impulsar la reactivación económica como prioridad nacional, enfocándose en la recuperación del empleo y el crecimiento productivo tras la crisis sanitaria.",
        problema: "Crisis económica y pérdida masiva de empleos",
        fuente: "Plan de Gobierno Fuerza Popular - Eje Económico"
      },
      {
        id: "fp-econ-2",
        tema: "Economía",
        titulo: "Defensa de la economía social de mercado",
        tipo: "Concreta",
        explicacion: "El plan reafirma el compromiso con la economía social de mercado y la estabilidad macroeconómica, promoviendo disciplina fiscal, respeto a la Constitución y estabilidad monetaria.",
        problema: "Riesgo de inestabilidad económica y desconfianza en la inversión",
        fuente: "Plan de Gobierno Fuerza Popular - Principios Económicos"
      },
      {
        id: "fp-econ-3",
        tema: "Economía",
        titulo: "Promoción de la inversión privada",
        tipo: "Promesa",
        explicacion: "Se plantea incentivar la inversión privada como motor del crecimiento económico, sin detallar instrumentos específicos de incentivo o regulación.",
        problema: "Baja inversión y desaceleración económica",
        fuente: "Plan de Gobierno Fuerza Popular - Eje Económico"
      },
      {
        id: "fp-edu-1",
        tema: "Educación",
        titulo: "Mejorar la calidad de la educación básica",
        tipo: "Promesa",
        explicacion: "El plan propone mejorar la calidad educativa a nivel nacional, enfocándose en aprendizajes fundamentales y reducción de brechas, sin detallar acciones concretas en todos los niveles.",
        problema: "Bajo rendimiento educativo y brechas de aprendizaje",
        fuente: "Plan de Gobierno Fuerza Popular - Eje Educación"
      },
      {
        id: "fp-edu-2",
        tema: "Educación",
        titulo: "Fortalecimiento del rol del docente",
        tipo: "Concreta",
        explicacion: "Se plantea fortalecer la carrera docente mediante capacitación y reconocimiento al mérito, como eje para mejorar la calidad educativa.",
        problema: "Débil formación continua del personal docente",
        fuente: "Plan de Gobierno Fuerza Popular - Eje Educación"
      }
    ],
    noticias: [
      {
        id: "fp-n1",
        titulo: "Fuerza Popular se reorganiza de cara a las elecciones 2026",
        resumen: "Dirigentes del partido anunciaron cambios internos y renovación de cuadros políticos.",
        fuente: "El Comercio"
      }
    ],
    vision: "Construir un Estado democrático, descentralizado y transparente, donde el desarrollo económico esté acompañado de justicia social y fortalecimiento institucional.",
    futuro: "Fuerza Popular plantea un Perú con crecimiento sostenible, reducción de la informalidad y servicios públicos de calidad, priorizando educación, salud y lucha contra la corrupción.",
    redes: {
      facebook: "https://www.facebook.com/FuerzaPopularOficial",
      twitter: "https://twitter.com/FuerzaPopular",
      instagram: "https://www.instagram.com/fuerzapopular"
    }
  },
  {
    id: "partido-morado",
    nombre: "Partido Morado",
    logo: "/logos/partido-morado.png",
    candidato: {
      nombre: "Julio Guzmán",
      descripcion: "Economista y académico. Promueve reformas institucionales y fortalecimiento democrático.",
      foto: "/candidatos/partido-morado.png"
    },
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
    ],
    noticias: [
      {
        id: "pm-n1",
        titulo: "El Partido Morado se reorganiza de cara a las elecciones 2026",
        resumen: "Dirigentes del partido anunciaron cambios internos y renovación de cuadros políticos.",
        fuente: "El Comercio"
      }
    ],
    vision: "Construir un Estado democrático, descentralizado y transparente, donde el desarrollo económico esté acompañado de justicia social y fortalecimiento institucional.",
    futuro: "El Partido Morado plantea un Perú con crecimiento sostenible, reducción de la informalidad y servicios públicos de calidad, priorizando educación, salud y lucha contra la corrupción.",
    redes: {
      facebook: "https://www.facebook.com/PartidoMoradoOficial",
      twitter: "https://twitter.com/PartidoMorado",
      instagram: "https://www.instagram.com/partidomorado"
    }
  },
  {
    id: "alianza-progreso",
    nombre: "Alianza para el Progreso",
    logo: "/logos/alianza-progreso.png",
    candidato: {
      nombre: "César Acuña",
      descripcion: "Empresario y exgobernador regional. Promueve educación, empleo y desarrollo regional.",
      foto: "/candidatos/alianza-progreso.png"
    },
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
    ],
    noticias: [
      {
        id: "pr-n1",
        titulo: "Alianza para el Progreso se reorganiza de cara a las elecciones 2026",
        resumen: "Dirigentes del partido anunciaron cambios internos y renovación de cuadros políticos.",
        fuente: "El Comercio"
      }
    ],
    vision: "Construir un Estado democrático, descentralizado y transparente, donde el desarrollo económico esté acompañado de justicia social y fortalecimiento institucional.",
    futuro: "Alianza para el Progreso plantea un Perú con crecimiento sostenible, reducción de la informalidad y servicios públicos de calidad, priorizando educación, salud y lucha contra la corrupción.",
    redes: {
      facebook: "https://www.facebook.com/APOficial",
      twitter: "https://twitter.com/AlianzaParaElProgreso",
      instagram: "https://www.instagram.com/alianzaparaelprogreso"
    }
  },
  {
    id: "juntos-por-el-peru",
    nombre: "Juntos por el Perú",
    logo: "/logos/juntos-por-el-peru.png",
    candidato: {
      nombre: "Verónika Mendoza",
      descripcion: "Politóloga y excongresista. Representa la izquierda progresista y la justicia social.",
      foto: "/candidatos/juntos-por-el-peru.png"
    },
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
    ],
    noticias: [
      {
        id: "jp-n1",
        titulo: "Juntos por el Perú se reorganiza de cara a las elecciones 2026",
        resumen: "Dirigentes del partido anunciaron cambios internos y renovación de cuadros políticos.",
        fuente: "El Comercio"
      }
    ],
    vision: "Construir un Estado democrático, descentralizado y transparente, donde el desarrollo económico esté acompañado de justicia social y fortalecimiento institucional.",
    futuro: "Juntos por el Perú plantea un Perú con crecimiento sostenible, reducción de la informalidad y servicios públicos de calidad, priorizando educación, salud y lucha contra la corrupción.",
    redes: {
      facebook: "https://www.facebook.com/JuntosXelPeruOficial",
      twitter: "https://twitter.com/JuntosXelPeru",
      instagram: "https://www.instagram.com/jppartidoperuano"
    }
  },
  {
    id: "renovacion-popular",
    nombre: "Renovación Popular",
    logo: "/logos/renovacion-popular.png",
    candidato: {
      nombre: "Rafael López Aliaga",
      descripcion: "Empresario y político conservador. Enfatiza orden, valores tradicionales y reducción del Estado.",
      foto: "/candidatos/renovacion-popular.png"
    },
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
    ],
    noticias: [
      {
        id: "rp-n1",
        titulo: "Renovación Popular se reorganiza de cara a las elecciones 2026",
        resumen: "Dirigentes del partido anunciaron cambios internos y renovación de cuadros políticos.",
        fuente: "El Comercio"
      }
    ],
    vision: "Construir un Estado democrático, descentralizado y transparente, donde el desarrollo económico esté acompañado de justicia social y fortalecimiento institucional.",
    futuro: "Renovación Popular plantea un Perú con crecimiento sostenible, reducción de la informalidad y servicios públicos de calidad, priorizando educación, salud y lucha contra la corrupción.",
    redes: {
      facebook: "https://www.facebook.com/RenovacionPopularOficial",
      twitter: "https://twitter.com/RenovacionPopular",
      instagram: "https://www.instagram.com/renovacionpopular"
    }
  },
  {
    id: "fe-en-el-peru",
    nombre: "Fe en el Perú",
    logo: "/logos/fe-en-el-peru.png",
    candidato: {
      nombre: "Álvaro Gonzalo Paz de la Barra Freigeiro",
      descripcion: "Abogado y exalcalde de La Molina. Propone orden institucional y gestión pública eficiente.",
      foto: "/candidatos/fe-en-el-peru.png"
    },
    propuestas: [
      { 
        id: 13, 
        tema: "Economía", 
        titulo: "Formalización y MYPE", 
        tipo: "Concreta",
        explicacion: "Simplificar trámites y facilitar formalización para microempresas.",
        problema: "Alta informalidad laboral" 
      },
      { 
        id: 14, 
        tema: "Salud", 
        titulo: "Mejorar atención primaria", 
        tipo: "Promesa",
        explicacion: "Impulsar campañas de prevención y fortalecer postas médicas.",
        problema: "Baja cobertura de atención básica" 
      },
    ],
    noticias: [
      {
        id: "fe-n1",
        titulo: "Fe en el Perú se reorganiza de cara a las elecciones 2026",
        resumen: "Dirigentes del partido anunciaron cambios internos y renovación de cuadros políticos.",
        fuente: "El Comercio"
      }
    ],
    vision: "Construir un Estado democrático, descentralizado y transparente, donde el desarrollo económico esté acompañado de justicia social y fortalecimiento institucional.",
    futuro: "Fe en el Perú plantea un Perú con crecimiento sostenible, reducción de la informalidad y servicios públicos de calidad, priorizando educación, salud y lucha contra la corrupción.",
    redes: {
      facebook: "https://www.facebook.com/FeEnElPeruOfi",
      twitter: "https://twitter.com/FeEnElPeru",
      instagram: "https://www.instagram.com/fenelperu"
    }
  },
  {
    id: "ciudadanos-por-el-peru",
    nombre: "Partido Ciudadanos por el Perú",
    logo: "/logos/ciudadanos-por-el-peru.png",
    candidato: {
      nombre: "Nicanor Boluarte",
      descripcion: "Político peruano vinculado al partido Ciudadanos por el Perú, con enfoque nacionalista y conservador.",
      foto: "/candidatos/ciudadanos-por-el-peru.png"
    },
    propuestas: [
      { 
        id: 15, 
        tema: "Educación", 
        titulo: "Infraestructura escolar", 
        tipo: "Promesa",
        explicacion: "Mejorar y ampliar colegios con enfoque en regiones.",
        problema: "Colegios en mal estado" 
      },
      { 
        id: 16, 
        tema: "Economía", 
        titulo: "Empleo juvenil", 
        tipo: "Concreta",
        explicacion: "Incentivos para contratación juvenil y prácticas remuneradas.",
        problema: "Desempleo juvenil" 
      },
    ],
    noticias: [
      {
        id: "cp-n1",
        titulo: "Ciudadanos por el Perú se reorganiza de cara a las elecciones 2026",
        resumen: "Dirigentes del partido anunciaron cambios internos y renovación de cuadros políticos.",
        fuente: "El Comercio"
      }
    ],
    vision: "Construir un Estado democrático, descentralizado y transparente, donde el desarrollo económico esté acompañado de justicia social y fortalecimiento institucional.",
    futuro: "Ciudadanos por el Perú plantea un Perú con crecimiento sostenible, reducción de la informalidad y servicios públicos de calidad, priorizando educación, salud y lucha contra la corrupción.",
    redes: {
      facebook: "https://www.facebook.com/CiudadanosXelPerúOficial",
      twitter: "https://twitter.com/CiudadanosXelPerú",
      instagram: "https://www.instagram.com/cpep"
    }
  },
  {
    id: "somos-peru",
    nombre: "Partido Democrático Somos Perú",
    logo: "/logos/somos-peru.png",
    candidato: {
      nombre: "Daniel Salaverry",
      descripcion: "Excongresista y expresidente del Congreso. Propone gobernabilidad y descentralización.",
      foto: "/candidatos/somos-peru.png"
    },
    propuestas: [
      { 
        id: 17, 
        tema: "Salud", 
        titulo: "Reducir colas en hospitales", 
        tipo: "Concreta",
        explicacion: "Gestión de citas y refuerzo de turnos en hospitales públicos.",
        problema: "Largas esperas y saturación" 
      },
      { 
        id: 18, 
        tema: "Educación", 
        titulo: "Mejorar calidad educativa", 
        tipo: "Promesa",
        explicacion: "Programas para elevar rendimiento escolar.",
        problema: "Brechas educativas" 
      },
    ],
    noticias: [
      {
        id: "sp-n1",
        titulo: "Somos Perú se reorganiza de cara a las elecciones 2026",
        resumen: "Dirigentes del partido anunciaron cambios internos y renovación de cuadros políticos.",
        fuente: "El Comercio"
      }
    ],
    vision: "Construir un Estado democrático, descentralizado y transparente, donde el desarrollo económico esté acompañado de justicia social y fortalecimiento institucional.",
    futuro: "Somos Perú plantea un Perú con crecimiento sostenible, reducción de la informalidad y servicios públicos de calidad, priorizando educación, salud y lucha contra la corrupción.",
    redes: {
      facebook: "https://www.facebook.com/SomosPerúOficial",
      twitter: "https://twitter.com/SomosPeru",
      instagram: "https://www.instagram.com/somosperuoficial"
    }
  },
  {
    id: "frepap-fia",
    nombre: "Frente Popular Agrícola FIA del Perú",
    logo: "/logos/frepap-fia.png",
    candidato: {
      nombre: "Ezequiel Jonas Ataucusi Molina",
      descripcion: "Líder del FREPAP. Impulsa desarrollo agrario, empleo rural, seguridad alimentaria y valores éticos.",
      foto: "/candidatos/frepap-fia.png"
    },
    propuestas: [
      { 
        id: 19, 
        tema: "Economía", 
        titulo: "Impulso a agricultura familiar", 
        tipo: "Concreta",
        explicacion: "Apoyo técnico y acceso a mercados para pequeños agricultores.",
        problema: "Baja productividad agrícola" 
      },
      { 
        id: 20, 
        tema: "Salud", 
        titulo: "Nutrición y prevención", 
        tipo: "Promesa",
        explicacion: "Campañas de nutrición y prevención en zonas rurales.",
        problema: "Anemia y desnutrición" 
      },
    ],
    noticias: [
      {
        id: "fr-n1",
        titulo: "FREPAP se reorganiza de cara a las elecciones 2026",
        resumen: "Dirigentes del partido anunciaron cambios internos y renovación de cuadros políticos.",
        fuente: "El Comercio"
      }
    ],
    vision: "Construir un Estado democrático, descentralizado y transparente, donde el desarrollo económico esté acompañado de justicia social y fortalecimiento institucional.",
    futuro: "FREPAP plantea un Perú con crecimiento sostenible, reducción de la informalidad y servicios públicos de calidad, priorizando educación, salud y lucha contra la corrupción.",
    redes: {
      facebook: "https://www.facebook.com/FREPAP",
      twitter: "https://twitter.com/FREPAP",
      instagram: "https://www.instagram.com/frepap"
    }
  },
  {
    id: "obras",
    nombre: "Partido Cívico Obras",
    logo: "/logos/obras.png",
    candidato: {
      nombre: "Álvaro Gonzalo Paz de la Barra Freigeiro",
      descripcion: "Abogado y gestor municipal. Prioriza infraestructura, obras públicas y eficiencia del Estado.",
      foto: "/candidatos/obras.png"
    },
    propuestas: [
      { 
        id: 21, 
        tema: "Economía", 
        titulo: "Obras rápidas locales", 
        tipo: "Concreta",
        explicacion: "Priorizar proyectos cortos con impacto en empleo local.",
        problema: "Falta de trabajo y servicios" 
      },
      { 
        id: 22, 
        tema: "Educación", 
        titulo: "Conectividad escolar", 
        tipo: "Promesa",
        explicacion: "Mejorar acceso a internet y recursos digitales.",
        problema: "Brecha digital" 
      },
    ],
    noticias: [
      {
        id: "ob-n1",
        titulo: "El Partido Cívico Obras se reorganiza de cara a las elecciones 2026",
        resumen: "Dirigentes del partido anunciaron cambios internos y renovación de cuadros políticos.",
        fuente: "El Comercio"
      }
    ],
    vision: "Construir un Estado democrático, descentralizado y transparente, donde el desarrollo económico esté acompañado de justicia social y fortalecimiento institucional.",
    futuro: "El Partido Cívico Obras plantea un Perú con crecimiento sostenible, reducción de la informalidad y servicios públicos de calidad, priorizando educación, salud y lucha contra la corrupción.",
    redes: {
      facebook: "https://www.facebook.com/PartidoCivicoObras",
      twitter: "https://twitter.com/PartidoCivicoObras",
      instagram: "https://www.instagram.com/PartidoCivObras"
    }
  },
  {
    id: "frente-esperanza-2021",
    nombre: "Partido Frente de la Esperanza 2021",
    logo: "/logos/frente-esperanza-2021.png",
    candidato: {
      nombre: "Fernando Olivera",
      descripcion: "Exministro y político histórico. Enfocado en la lucha contra la corrupción y reforma política.",
      foto: "/candidatos/frente-esperanza-2021.png"
    },
    propuestas: [
      { 
        id: 23, 
        tema: "Salud", 
        titulo: "Salud mental comunitaria", 
        tipo: "Concreta",
        explicacion: "Fortalecer centros comunitarios de apoyo psicológico.",
        problema: "Baja atención en salud mental" 
      },
      { 
        id: 24, 
        tema: "Economía", 
        titulo: "Apoyo a emprendedores", 
        tipo: "Promesa",
        explicacion: "Programas para facilitar capital semilla y asesoría.",
        problema: "Barreras para emprender" 
      },
    ],
    noticias: [
      {
        id: "es-n1",
        titulo: "Frente Esperanza se reorganiza de cara a las elecciones 2026",
        resumen: "Dirigentes del partido anunciaron cambios internos y renovación de cuadros políticos.",
        fuente: "El Comercio"
      }
    ],
    vision: "Construir un Estado democrático, descentralizado y transparente, donde el desarrollo económico esté acompañado de justicia social y fortalecimiento institucional.",
    futuro: "Frente Esperanza plantea un Perú con crecimiento sostenible, reducción de la informalidad y servicios públicos de calidad, priorizando educación, salud y lucha contra la corrupción.",
    redes: {
      facebook: "https://www.facebook.com/FrenteEsperanzaOficial",
      twitter: "https://twitter.com/FrenteEsperanza",
      instagram: "https://www.instagram.com/FrenteEsperanza"
    }
  }
];