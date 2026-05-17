import type { Translations } from './en'

export const es: Translations = {
  // ── Common ──────────────────────────────────────────
  common: {
    brand: 'THE ALCHEMIST',
    tagline: 'Donde la Ciencia se Encuentra con el Espíritu',
    backHome: 'Volver al Inicio',
    book: 'Reserva tu Sesión',
    loading: 'Cargando...',
    next: 'Siguiente →',
    back: '← Atrás',
  },

  // ── Assessment ──────────────────────────────────────
  assessment: {
    header: 'Evaluación del Alma',
    stepLabel: 'Dimensión',
    of: 'de',
    namePlaceholder: 'Tu nombre',
    emailPlaceholder: 'tu@email.com',
    emailOptional: 'Opcional: recibe tu Lectura del Alma por correo',
    submitBtn: 'Revelar Mi Lectura del Alma ☿',
    generating: 'Leyendo tu alma...',
    error: 'No se pudo generar tu lectura. Por favor intenta de nuevo.',
    connectionError: 'Error de conexión. Por favor intenta de nuevo.',
    emailConfirm: '✦ Tu lectura ha sido enviada a',

    steps: [
      {
        title: 'Cuerpo Físico',
        subtitle: 'Physical Body',
        icon: '◌',
        color: '#3DC898',
        questions: [
          {
            id: 'physical_energy',
            label: '¿Cómo describirías tus niveles de energía en el último mes?',
            placeholder: 'Describe tu energía física — ¿se siente estable, agotada, fluctuante?',
          },
          {
            id: 'physical_pain',
            label: '¿Tienes algún dolor, tensión o malestar físico recurrente?',
            placeholder: 'Síntomas crónicos, zonas de tensión, o patrones que notas en tu cuerpo...',
          },
        ],
      },
      {
        title: 'Mente',
        subtitle: 'Mind',
        icon: '◎',
        color: '#C9963C',
        questions: [
          {
            id: 'mind_thoughts',
            label: '¿Qué pensamientos ocupan más espacio mental en este momento?',
            placeholder: 'Lo que ronda en tu mente — preocupaciones, planes, situaciones sin resolver...',
          },
          {
            id: 'mind_sleep',
            label: '¿Tu mente realmente descansa cuando duermes?',
            placeholder: '¿Sueñas intensamente, te despiertas con ansiedad, o amaneces mentalmente restaurado?',
          },
        ],
      },
      {
        title: 'Emociones',
        subtitle: 'Emotions',
        icon: '◑',
        color: '#E06090',
        questions: [
          {
            id: 'emotions_frequent',
            label: '¿Qué emociones han estado más presentes en tu vida esta última semana?',
            placeholder: 'Ansiedad, tristeza, alegría, entumecimiento, añoranza — nombra lo que es real para ti...',
          },
          {
            id: 'emotions_carrying',
            label: '¿Hay algo que llevas cargando emocionalmente desde hace mucho tiempo?',
            placeholder: 'Una herida sin resolver, una relación, un duelo, una decisión que aún no tomas...',
          },
        ],
      },
      {
        title: 'Energía Vital',
        subtitle: 'Vital Energy',
        icon: '◈',
        color: '#E4B85A',
        questions: [
          {
            id: 'energy_peak',
            label: '¿En qué momentos del día te sientes más vivo y con más energía?',
            placeholder: 'En la mañana, después de moverte, en la naturaleza, en silencio, con ciertas personas...',
          },
          {
            id: 'energy_drain',
            label: '¿Qué drena consistentemente tu energía o fuerza vital?',
            placeholder: 'Ciertos ambientes, relaciones, alimentos, patrones de pensamiento, obligaciones...',
          },
        ],
      },
      {
        title: 'Espíritu',
        subtitle: 'Spirit',
        icon: '☿',
        color: '#C9963C',
        questions: [
          {
            id: 'spirit_purpose',
            label: '¿Sientes que estás alineado con tu propósito y llamado más profundo?',
            placeholder: '¿Tus acciones diarias se sienten significativas? ¿Algo te llama en otra dirección?',
          },
          {
            id: 'spirit_calling',
            label: '¿Hay algo que tu alma te ha pedido que aún no has respondido?',
            placeholder: 'Un cambio, un llamado creativo, un límite que poner, una verdad que decir...',
          },
        ],
      },
      {
        title: 'Sueño',
        subtitle: 'Sleep',
        icon: '◗',
        color: '#3DC898',
        questions: [
          {
            id: 'sleep_hours',
            label: '¿Cuántas horas duermes en promedio y cómo describirías la calidad?',
            placeholder: 'Horas, facilidad para dormir, continuidad del sueño, calidad del descanso...',
          },
          {
            id: 'sleep_quality',
            label: '¿Te despiertas verdaderamente restaurado — física y mentalmente?',
            placeholder: 'Aturdido, alerta, ansioso, en paz — ¿cómo son tus mañanas?',
          },
        ],
      },
      {
        title: 'Propósito',
        subtitle: 'Purpose',
        icon: '◇',
        color: '#E4B85A',
        questions: [
          {
            id: 'purpose_future',
            label: '¿En quién quieres convertirte en los próximos 6 meses?',
            placeholder: 'No qué quieres hacer — ¿quién quieres ser? ¿Cómo quieres sentirte?',
          },
          {
            id: 'purpose_today',
            label: '¿Qué te trajo a The Alchemist hoy?',
            placeholder: 'La respuesta honesta — ¿cuál es la razón real por la que estás aquí ahora mismo?',
          },
        ],
      },
    ],

    result: {
      title: 'Tu Lectura del Alma',
      subtitle: 'Para',
      bookCta: 'Comienza Tu Primera Alquimia — $199',
      emailSent: '✦ Tu lectura ha sido enviada a',
      sections: {
        currentState: 'Tu Estado Actual',
        bellaSees: 'Lo que Bella Ve',
        meighenSees: 'Lo que el Dr. Meighen Ve',
        path: 'Tu Camino Recomendado',
        firstAlchemy: 'Tu Primera Alquimia',
        soulMessage: 'Un Mensaje para Tu Alma',
      },
    },
  },

  // ── Nav ────────────────────────────────────────────
  nav: {
    assessment: 'Evaluación del Alma',
    booking: 'Reservar',
    about: 'Nosotros',
  },
}
