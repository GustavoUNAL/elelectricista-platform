import type { SiteContent } from '@/schemas/site'

export const SITE_SEED: SiteContent = {
  brand: {
    name: 'El Electricista',
    typewriterLine: 'El Electricista',
    tagline:
      'Instalaciones eléctricas, sistemas fotovoltaicos, construcción en estructura liviana y reparaciones.',
  },
  contact: {
    phoneDisplay: '+57 320 790 9835',
    phoneTel: '+573207909835',
    whatsappUrl: 'https://wa.me/573207909835',
    whatsappPrefillMessage:
      'Hola, El Electricista. Quiero cotizar un proyecto nuevo o una remodelación. ¿Me pueden orientar?',
    whatsappCtaLabel: 'Solicita tu cotización',
    city: 'Pasto',
    region: 'Nariño',
    schedule: 'Atención 24/7',
  },
  seo: {
    title: 'El Electricista — Instalaciones eléctricas y construcción | Pasto',
    description:
      'Ingeniero electricista en Pasto. Instalaciones eléctricas, sistemas fotovoltaicos, estructura liviana y reparaciones. RETIE, diseño eléctrico y soluciones para vivienda y comercio.',
  },
  hero: {
    kicker: 'Pasto, Nariño',
    sub: 'Diseño eléctrico, cumplimiento RETIE y ejecución profesional.',
    subSecondary: 'Soluciones completas para vivienda y comercio',
    coverage: 'Atendemos en todo el sur de Colombia y Ecuador.',
    ctaCallLabel: 'Llamar ahora',
  },
  mainServices: [
    {
      id: 'instalaciones-electricas',
      title: 'Instalaciones eléctricas',
      animatedLead: 'Instalaciones seguras, funcionales y confiables',
      items: [
        'Casas, locales, oficinas e industria',
        'Tableros, cableado y ampliaciones',
        'Domótica y automatización',
        'Reparación de fallas y mantenimiento',
      ],
    },
    {
      id: 'sistemas-fotovoltaicos',
      title: 'Sistemas fotovoltaicos',
      animatedLead: 'Genera tu propia energía y asegura el cumplimiento normativo',
      items: [
        'Instalación de paneles solares',
        'Baterías y sistemas híbridos (solar + red)',
        'Trámites con la empresa de energía',
        'Mantenimiento y auditorías RETIE',
      ],
    },
    {
      id: 'almacenamiento-respaldo-energetico',
      title: 'Almacenamiento y respaldo',
      animatedLead: 'Garantiza continuidad del servicio y energía disponible en todo momento',
      items: [
        'Baterías para almacenar y usar energía',
        'Respaldo para casa o negocio',
        'Plantas eléctricas y tableros ATS',
        'Mantenimiento de equipos',
      ],
    },
    {
      id: 'ingenieria-electrica',
      title: 'Ingeniería eléctrica',
      animatedLead: 'Optimiza tu sistema eléctrico y toma decisiones seguras y eficientes',
      items: [
        'Diseño de instalaciones eléctricas',
        'Estudios de consumo y calidad de energía',
        'Asesoría y eficiencia energética',
        'Diagnóstico de tu instalación',
      ],
    },
  ],
  construction: [
    {
      id: 'estructura-liviana',
      title: 'Estructura liviana',
      animatedLead: 'Divisiones y cielos con acabado impecable',
      items: [
        'Construcción en drywall',
        'Divisiones internas',
        'Cielos falsos',
        'Adecuaciones de espacios',
      ],
    },
    {
      id: 'techos',
      title: 'Techos y cubiertas',
      animatedLead: 'Cubiertas seguras, livianas y duraderas',
      items: [
        'Instalación de techos',
        'Cubiertas livianas',
        'Reparación y mantenimiento',
        'Estructuras metálicas livianas',
      ],
    },
    {
      id: 'acabados',
      title: 'Acabados y obra blanca',
      animatedLead: 'Remodelación integral para vivir mejor',
      items: ['Pintura', 'Acabados interiores', 'Mejoras locativas', 'Remodelación general'],
    },
  ],
  differential: {
    title: '¿Por qué elegirnos?',
    subtitle:
      'Equipo técnico calificado, respaldado por ingeniero electricista con matrícula profesional vigente y certificación ante la SIC.',
    bullets: [
      'Experiencia comprobada en diseño, estructuración e implementación de sistemas eléctricos y fotovoltaicos',
      'Más de 10 años de experiencia en proyectos eléctricos',
      'Diseño, ejecución y puesta en marcha integrados, sin improvisación',
      'Cumplimiento de normativa RETIE',
      'Soluciones completas: eléctrico, energético y construcción',
      'Atención directa, ágil y personalizada',
    ],
    closing:
      'Respaldo técnico real en cada proyecto, con enfoque en seguridad, eficiencia y cumplimiento normativo.',
  },
  problems: {
    title: 'Problemas que resolvemos',
    blocks: [
      {
        heading: 'Si vas a construir o remodelar',
        body:
          'Te ayudamos a diseñar e implementar toda la ingeniería eléctrica desde cero, asegurando una instalación segura, eficiente y preparada para el futuro.',
        bullets: [
          'Diseño eléctrico desde planos',
          'Distribución óptima de puntos eléctricos',
          'Cálculo de cargas y protecciones',
          'Preparación para energía solar y automatización',
          'Acompañamiento técnico durante la obra',
        ],
        tip: 'Una buena planificación evita errores y costos.',
      },
      {
        heading: 'Si ya tienes instalación y presenta fallas',
        body:
          'Diagnosticamos y corregimos fallas eléctricas, mejorando la seguridad y el funcionamiento de tu instalación.',
        bullets: [
          'Identificación, detección y corrección de fugas de energía',
          'Cambio de tableros y protecciones',
          'Corrección de instalaciones defectuosas',
          'Mantenimiento preventivo y correctivo',
        ],
        tip: 'No solo reparamos, solucionamos la causa del problema.',
      },
      {
        heading: 'Si quieres optimizar o modernizar',
        body:
          'Mejoramos tu instalación actual para que sea más cómoda, eficiente y tecnológica.',
        bullets: [
          'Casas inteligentes con domótica',
          'Control de iluminación y equipos',
          'Optimización del consumo energético',
          'Integración con sistemas solares y respaldo',
        ],
        tip: 'Más control, más ahorro y mayor confort.',
      },
    ],
  },
  process: {
    title: 'Proceso de trabajo',
    steps: [
      {
        title: 'Contáctanos',
        description:
          'Cuéntanos qué necesitas: tipo de obra, ubicación y urgencia. Respondemos para agendar una visita o una primera revisión.',
        ctaLabel: 'Contactar',
      },
      {
        title: 'Evaluación y diagnóstico',
        description:
          'Revisamos el estado de la instalación o el espacio, identificamos riesgos y definimos el alcance técnico del trabajo.',
      },
      {
        title: 'Propuesta y diseño',
        description:
          'Te entregamos cotización clara y, si aplica, diseño eléctrico o documentación alineada con RETIE y normativa vigente.',
      },
      {
        title: 'Ejecución',
        description:
          'Instalación o reparación con materiales adecuados, buenas prácticas y coordinación contigo durante la obra.',
      },
      {
        title: 'Entrega final',
        description:
          'Pruebas, puesta en marcha y cierre documental cuando corresponda. Quedamos disponibles para soporte posterior.',
      },
    ],
  },
  portfolio: {
    title: 'Trabajos realizados',
    intro:
      'Galería actualizada con proyectos de generación solar, tableros, calidad de energía, automatización y obra liviana — imágenes desde nuestra carpeta de obra.',
    items: [
      {
        id: 'sfv-pasto-4kw',
        title: 'Solar fotovoltaico 4 kW',
        category: 'solar',
        imageUrl: '/proyectos/SFVPasto2_4kW.jpg',
        caption: 'Sistema fotovoltaico en Pasto, 4 kW.',
      },
      {
        id: 'sfv-20kw',
        title: 'Solar fotovoltaico 20 kW',
        category: 'solar',
        imageUrl: '/proyectos/SFV_20kW.jpg',
        caption: 'Instalación fotovoltaica de 20 kW.',
      },
      {
        id: 'sfv-8-6kw',
        title: 'Solar fotovoltaico 8,6 kW',
        category: 'solar',
        imageUrl: '/proyectos/SFV_8_6kW.jpg',
        caption: 'Sistema solar fotovoltaico 8,6 kW.',
      },
      {
        id: 'sfv-3-6kw',
        title: 'Solar fotovoltaico 3,6 kW',
        category: 'solar',
        imageUrl: '/proyectos/SFV_3_6kW.jpg',
        caption: 'Instalación fotovoltaica 3,6 kW.',
      },
      {
        id: 'cargador-ev',
        title: 'Cargador eléctrico',
        category: 'electrico',
        imageUrl: '/proyectos/cargador_ev.jpg',
        caption: 'Instalación de cargador para vehículo eléctrico.',
      },
      {
        id: 'tablero-control',
        title: 'Tablero de control',
        category: 'electrico',
        imageUrl: '/proyectos/tablero_control.jpg',
        caption: 'Montaje y cableado de tablero de control.',
      },
      {
        id: 'tablero-comercial',
        title: 'Tablero comercial',
        category: 'electrico',
        imageUrl: '/proyectos/tablero_comercial.jpg',
        caption: 'Tablero eléctrico para instalación comercial.',
      },
      {
        id: 'banco-capacitores',
        title: 'Banco de capacitores',
        category: 'electrico',
        imageUrl: '/proyectos/banco_capacitores.jpg',
        caption: 'Banco de capacitores para corrección de factor de potencia.',
      },
      {
        id: 'analizador-redes',
        title: 'Analizador de redes',
        category: 'electrico',
        imageUrl: '/proyectos/analizador_redes.jpg',
        caption: 'Medición y análisis de redes y calidad de energía.',
      },
      {
        id: 'estudio-calidad',
        title: 'Estudio de calidad de energía',
        category: 'electrico',
        imageUrl: '/proyectos/estudio_calidad_energia.jpg',
        caption: 'Estudio y registro de calidad de la energía eléctrica.',
      },
      {
        id: 'auditoria-retie',
        title: 'Auditoría RETIE',
        category: 'electrico',
        imageUrl: '/proyectos/auditoria_retie.jpg',
        caption: 'Auditoría RETIE y verificación de cumplimiento normativo.',
      },
      {
        id: 'medicion-resistencia',
        title: 'Medición de resistencia',
        category: 'electrico',
        imageUrl: '/proyectos/medicion_resistencia.jpg',
        caption: 'Medición de resistencia de puesta a tierra.',
      },
      {
        id: 'mantenimiento-plantas',
        title: 'Mantenimiento de plantas',
        category: 'electrico',
        imageUrl: '/proyectos/mantenimiento_plantas.jpg',
        caption: 'Mantenimiento de plantas eléctricas y equipos asociados.',
      },
      {
        id: 'reparacion-motor',
        title: 'Reparación de motor',
        category: 'general',
        imageUrl: '/proyectos/reparacion_motor.jpg',
        caption: 'Reparación y mantenimiento de motor eléctrico.',
      },
      {
        id: 'estructura-liviana-obra',
        title: 'Estructura liviana',
        category: 'drywall',
        imageUrl: '/proyectos/estructura_liviana.jpg',
        caption: 'Obra en estructura liviana y espacios interiores.',
      },
      {
        id: 'construccion-drywall',
        title: 'Construcción en drywall',
        category: 'drywall',
        imageUrl: '/proyectos/construccion_drywall.jpg',
        caption: 'Construcción y acabados en drywall.',
      },
    ],
  },
  cta: {
    title: 'Cotiza tu proyecto hoy mismo',
    lead: 'Atención 24/7',
    phoneLabel: 'WhatsApp: 320 790 9835',
    ctaCallLabel: 'Llamar ahora',
  },
  footer: {
    lines: [
      'Servicios eléctricos, energéticos y construcción',
      'Atendemos en todo el sur de Colombia y Ecuador.',
      'Atención 24/7',
    ],
  },
}
