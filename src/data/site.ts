import type { SiteContent } from '@/schemas/site'

export const SITE_SEED: SiteContent = {
  brand: {
    name: 'El Electricista',
    typewriterLine: 'el electricista .com',
    tagline:
      'Instalaciones eléctricas, sistemas fotovoltaicos y construcción en estructura liviana',
    shortDescription:
      'Ingeniero electricista en Pasto. Instalaciones eléctricas, energía solar y construcción en estructura liviana. Soluciones completas, seguras y con respaldo técnico.',
  },
  contact: {
    phoneDisplay: '320 790 9835',
    phoneTel: '+573207909835',
    whatsappUrl: 'https://wa.me/573207909835',
    whatsappPrefillMessage: 'Hola, quiero cotizar un proyecto.',
    city: 'Pasto',
    region: 'Nariño',
    schedule: 'Lunes a sábado',
  },
  seo: {
    title: 'El Electricista — Instalaciones eléctricas y construcción | Pasto',
    description:
      'Ingeniero electricista en Pasto. Instalaciones eléctricas, energía solar, RETIE y construcción en estructura liviana. Soluciones completas y seguras.',
  },
  hero: {
    kicker: 'Pasto, Nariño',
    sub: 'Diseño eléctrico, cumplimiento RETIE y ejecución profesional. Soluciones completas para vivienda y comercio.',
    ctaWhatsappLabel: 'Cotizar por WhatsApp',
    ctaCallLabel: 'Llamar ahora',
  },
  mainServices: [
    {
      id: 'ingenieria-retie',
      title: 'Ingeniería eléctrica y RETIE',
      items: [
        'Diseño de sistemas eléctricos',
        'Planos y memorias de cálculo',
        'Cumplimiento normativo RETIE',
        'Revisión y adecuaciones',
        'Acompañamiento para certificación',
      ],
      foot: 'Soluciones técnicas, seguras y aprobadas',
    },
    {
      id: 'instalaciones',
      title: 'Instalaciones eléctricas',
      items: [
        'Instalaciones residenciales',
        'Instalaciones comerciales',
        'Tableros eléctricos',
        'Redes internas',
        'Reparaciones eléctricas',
      ],
      foot: 'Evita fallas, sobrecargas y riesgos',
    },
    {
      id: 'fotovoltaico',
      title: 'Sistemas fotovoltaicos',
      items: [
        'Instalación de paneles solares',
        'Dimensionamiento básico',
        'Integración con red eléctrica',
        'Optimización del consumo',
      ],
      foot: 'Reduce tu factura de energía',
    },
  ],
  construction: [
    {
      id: 'estructura-liviana',
      title: 'Estructura liviana',
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
      items: ['Pintura', 'Acabados interiores', 'Mejoras locativas', 'Remodelación general'],
    },
  ],
  complementary: [
    {
      id: 'automatizacion',
      title: 'Automatización',
      items: ['Automatización básica', 'Integración de sistemas'],
    },
    {
      id: 'cctv',
      title: 'CCTV y seguridad',
      items: ['Instalación de cámaras', 'Configuración de sistemas', 'Monitoreo básico'],
    },
    {
      id: 'mantenimiento',
      title: 'Mantenimiento',
      items: ['Mantenimiento eléctrico', 'Diagnóstico de fallas', 'Reparaciones generales'],
    },
  ],
  differential: {
    title: 'Por qué elegirnos',
    subtitle: 'Ingeniero electricista y equipo técnico',
    bullets: [
      'Diseño y ejecución integrados, sin improvisación',
      'Cumplimiento RETIE',
      'Soluciones completas: eléctrico y construcción',
      'Atención directa y personalizada',
    ],
    closing: 'No es solo instalación, es ingeniería aplicada.',
  },
  problems: {
    title: 'Problemas que resolvemos',
    items: [
      'Instalaciones inseguras',
      'Cortos o fallas eléctricas',
      'Necesidad de certificación RETIE',
      'Espacios mal distribuidos',
      'Alto consumo de energía',
    ],
    foot: 'Soluciones técnicas y seguras.',
  },
  process: {
    title: 'Proceso de trabajo',
    steps: [
      'Evaluación del proyecto',
      'Cotización clara',
      'Diseño (si aplica)',
      'Ejecución',
      'Entrega final',
    ],
  },
  portfolio: {
    title: 'Trabajos realizados',
    intro:
      'Galería alimentada por datos del sistema. Sustituye las URLs de imagen o conecta un CMS cuando esté listo.',
    items: [
      {
        id: 'p1',
        title: 'Instalación eléctrica',
        category: 'electrico',
        imageUrl: null,
        caption: 'Tableros y redes — ejemplo de proyecto',
      },
      {
        id: 'p2',
        title: 'Antes / después',
        category: 'general',
        imageUrl: null,
        caption: 'Remodelación y adecuación de espacios',
      },
      {
        id: 'p3',
        title: 'Techos / drywall',
        category: 'drywall',
        imageUrl: null,
        caption: 'Cielos falsos y divisiones',
      },
    ],
  },
  cta: {
    title: 'Cotiza tu proyecto hoy mismo',
    lead: 'Atención rápida en Pasto',
    phoneLabel: 'WhatsApp: 320 790 9835',
    ctaWhatsappLabel: 'Cotizar por WhatsApp',
    ctaCallLabel: 'Llamar ahora',
  },
  footer: {
    lines: ['Servicios eléctricos y construcción', 'Atención: lunes a sábado'],
  },
}
