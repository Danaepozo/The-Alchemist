import type { Translations } from './en'

export const es: Translations = {
  common: {
    brand: 'THE ALCHEMIST',
    tagline: 'Donde la Ciencia se Encuentra con el Espíritu',
    backHome: 'Volver al Inicio',
    book: 'Reserva tu Sesión',
    loading: 'Cargando...',
    next: 'Siguiente →',
    back: '← Atrás',
  },

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
        title: 'Cuerpo y Síntomas',
        subtitle: 'Body & Symptoms',
        icon: '◌',
        color: '#3DC898',
        description: 'El cuerpo nunca miente. Cada síntoma es un mensaje.',
        questions: [
          {
            id: 'body_symptoms',
            label: '¿Qué síntomas físicos, enfermedades recurrentes o zonas de dolor crónico experimentas? ¿Cuándo aparecieron por primera vez — qué estaba pasando en tu vida en ese momento?',
            placeholder: 'Describe los síntomas, la zona del cuerpo, cuándo comenzaron y qué eventos de vida coincidieron...',
          },
          {
            id: 'body_tension',
            label: '¿En qué parte de tu cuerpo sientes más el estrés, las emociones o la tensión no resuelta? Describe la sensación física.',
            placeholder: 'Pecho apretado, nudo en el estómago, mandíbula tensa, tensión en los hombros, fatiga profunda...',
          },
          {
            id: 'body_energy',
            label: '¿Cómo describirías tu energía física — no solo ahora, sino como patrón a lo largo del último año?',
            placeholder: 'Crónicamente agotada, fluctuante, funcionando con adrenalina, lenta para arrancar, colapso por las tardes...',
          },
        ],
      },
      {
        title: 'Mente y Patrones',
        subtitle: 'Mind & Patterns',
        icon: '◎',
        color: '#C9963C',
        description: 'La mente repite lo que el corazón no ha resuelto.',
        questions: [
          {
            id: 'mind_narrative',
            label: '¿Cuál es la historia que sigues contándote sobre quién eres — la narrativa que se reproduce en bucle, a menudo sin que lo notes?',
            placeholder: '"No soy suficiente," "Tengo que hacerlo todo solo," "El amor siempre termina," "No merezco..."',
          },
          {
            id: 'mind_triggers',
            label: '¿Qué situaciones, tipos de personas o dinámicas desencadenan tus reacciones emocionales más fuertes? ¿Qué tienen en común tus detonantes?',
            placeholder: 'Ser ignorado, personas que mienten, sentirte controlado, ser abandonado, no ser escuchado...',
          },
          {
            id: 'mind_sleep',
            label: '¿Qué visita tu mente cuando intentas dormir? Describe la calidad de tu descanso mental.',
            placeholder: 'Rumiación, planificación, miedos, pensamientos acelerados, sueños perturbadores — ¿qué hace tu mente en la oscuridad?',
          },
        ],
      },
      {
        title: 'Sombra y Yo Oculto',
        subtitle: 'Shadow & Hidden Self',
        icon: '◑',
        color: '#E06090',
        description: 'Lo que rechazamos en otros vive en nosotros. Lo que más ocultamos está más cerca de nuestra herida.',
        questions: [
          {
            id: 'shadow_irritation',
            label: '¿Qué cualidades o comportamientos en otras personas te irritan, repelen o enojan más — lo que no puedes soportar en los demás?',
            placeholder: 'La arrogancia, la debilidad, la dependencia, el egoísmo, la deshonestidad, el exhibicionismo, ser controlado...',
          },
          {
            id: 'shadow_hide',
            label: '¿Qué aspectos de ti mismo ocultas más, suprimes o de los que te avergüenzas? ¿Qué te daría miedo que los demás descubrieran sobre ti?',
            placeholder: 'La ira, la necesidad afectiva, la ambición, el miedo, los sentimientos sexuales, la vulnerabilidad, el fracaso...',
          },
          {
            id: 'shadow_critic',
            label: '¿Qué dice tu crítico interior más brutal sobre ti? Escribe las palabras exactas — la frase más dura que te diriges a ti mismo.',
            placeholder: '"Eres..." / "Nunca vas a..." / "Hay algo malo en ti porque..."',
          },
        ],
      },
      {
        title: 'Emociones y Memoria del Cuerpo',
        subtitle: 'Emotions & Body\'s Memory',
        icon: '◈',
        color: '#E4B85A',
        description: 'Las emociones que no pudimos sentir entonces viven en el cuerpo como síntomas.',
        questions: [
          {
            id: 'emotions_dominant',
            label: '¿Qué emociones han estado más presentes en tu vida durante el último año? Nombra las que sientes con más frecuencia e intensidad.',
            placeholder: 'Ansiedad, entumecimiento, duelo, rabia bajo la superficie, añoranza, vacío, soledad, desconexión...',
          },
          {
            id: 'emotions_carrying',
            label: '¿Hay algo que llevas cargando emocionalmente desde hace mucho tiempo — un duelo, un resentimiento, una pérdida, un amor que nunca se expresó?',
            placeholder: 'Algo que quizás nunca has dicho en voz alta, o algo que todavía duele cuando lo tocas...',
          },
          {
            id: 'emotions_earliest',
            label: '¿Cuál es uno de tus recuerdos más tempranos de dolor emocional, miedo o sentirte inseguro? ¿Cómo ese mismo sentimiento sigue apareciendo en tu vida adulta?',
            placeholder: 'No necesitas narrar el evento — describe la SENSACIÓN y dónde todavía la sientes hoy...',
          },
        ],
      },
      {
        title: 'Sistema Familiar',
        subtitle: 'Family System',
        icon: '☿',
        color: '#C9963C',
        description: 'No somos solo individuos. Llevamos linajes enteros dentro de nosotros.',
        questions: [
          {
            id: 'family_atmosphere',
            label: 'Describe el ambiente emocional de tu familia de origen. ¿Qué era lo que no se hablaba? ¿Cuál era la regla no escrita sobre las emociones, el éxito, el amor o el dinero?',
            placeholder: '"En mi familia no se habla de..." / "La regla era..." / El sentimiento dominante en casa era...',
          },
          {
            id: 'family_patterns',
            label: '¿Qué patrones se repiten a lo largo de generaciones en tu familia? Piensa en enfermedades, relaciones, dinero, pérdidas, adicciones, muertes tempranas, silencios.',
            placeholder: 'Las mujeres en mi familia siempre... / Mi padre y yo somos exactamente iguales en... / Hay un patrón de...',
          },
          {
            id: 'family_secrets',
            label: '¿Hay alguien en tu familia que fue excluido, olvidado, avergonzado, o cuya historia nunca se contó — un ancestro cuyo destino podría estar influyendo en los vivos?',
            placeholder: 'Un suicidio, un hijo dado en adopción, alguien que cometió un crimen, un embarazo secreto, una guerra, una migración, una muerte temprana de la que nadie habla...',
          },
        ],
      },
      {
        title: 'Energía y Fuerza Vital',
        subtitle: 'Energy & Life Force',
        icon: '◗',
        color: '#3DC898',
        description: 'Donde fluye y donde se bloquea tu energía revela el mapa de tu alma.',
        questions: [
          {
            id: 'energy_blocked',
            label: '¿En qué áreas de tu vida te sientes más estancado, bloqueado o como si nunca pudieras avanzar realmente? (dinero, relaciones, expresión creativa, salud, poder personal, amor, propósito)',
            placeholder: 'Sé honesto — ¿dónde aparece el mismo muro sin importar lo que intentes?',
          },
          {
            id: 'energy_drain_source',
            label: '¿Qué drena tu fuerza vital de manera más consistente — personas, ambientes, obligaciones, pensamientos o patrones? ¿Y qué, aunque sea brevemente, la restaura?',
            placeholder: 'Me drena... / Me restaura aunque sea en pequeñas dosis...',
          },
          {
            id: 'energy_receive',
            label: '¿Qué tan cómodo te sientes recibiendo — amor, ayuda, dinero, reconocimiento, placer? ¿Te resulta más fácil dar que recibir? Describe tu relación con el recibir.',
            placeholder: '¿Desvías los cumplidos, sientes culpa cuando te ayudan, das para evitar recibir, o minimizas tus propias necesidades?',
          },
        ],
      },
      {
        title: 'Conciencia y Propósito',
        subtitle: 'Consciousness & Purpose',
        icon: '◇',
        color: '#E4B85A',
        description: 'El alma siempre sabe. Está esperando que dejes de correr.',
        questions: [
          {
            id: 'purpose_wound',
            label: '¿Cuál es la herida, lucha o desafío que — cuando miras atrás — puede haber estado preparándote para algo? ¿Cuál es el regalo oculto dentro de tu capítulo más difícil?',
            placeholder: 'Tómate tu tiempo. Esta pregunta pide la visión más profunda...',
          },
          {
            id: 'purpose_beliefs',
            label: '¿Qué creencias sobre ti mismo, el amor, el dinero o lo que mereces absorbiste al crecer, que todavía gobiernan tu vida en secreto hoy?',
            placeholder: '"Aprendí que tengo que ganarme el amor..." / "El dinero era..." / "Me enseñaron que yo soy..."',
          },
          {
            id: 'purpose_here',
            label: '¿Qué te trajo a The Alchemist hoy — la respuesta honesta y real, más allá del motivo superficial?',
            placeholder: '¿Qué parte de ti está cansada, buscando o lista — y para qué está lista?',
          },
        ],
      },
    ],

    result: {
      title: 'Tu Lectura del Alma',
      subtitle: 'Para',
      bookCta: 'Comienza Tu Primera Alquimia — $199',
      emailSent: '✦ Tu lectura ha sido enviada a',
    },
  },

  nav: {
    assessment: 'Evaluación del Alma',
    booking: 'Reservar',
    about: 'Nosotros',
  },
}
