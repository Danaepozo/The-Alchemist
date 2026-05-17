export const en = {
  common: {
    brand: 'THE ALCHEMIST',
    tagline: 'Where Science Meets Spirit',
    backHome: 'Return Home',
    book: 'Book Your Session',
    loading: 'Loading...',
    next: 'Next →',
    back: '← Back',
  },

  assessment: {
    header: 'Soul Assessment',
    stepLabel: 'Dimension',
    of: 'of',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'your@email.com',
    emailOptional: 'Optional: receive your Soul Reading by email',
    submitBtn: 'Reveal My Soul Reading ☿',
    generating: 'Reading your soul...',
    error: 'Could not generate your reading. Please try again.',
    connectionError: 'Connection error. Please try again.',
    emailConfirm: '✦ Your reading has been sent to',

    steps: [
      {
        title: 'Body & Symptoms',
        subtitle: 'Cuerpo y Síntomas',
        icon: '◌',
        color: '#3DC898',
        description: 'The body never lies. Every symptom is a message.',
        questions: [
          {
            id: 'body_symptoms',
            label: 'What physical symptoms, recurring illnesses, or areas of chronic pain do you experience? When did they first appear — what was happening in your life at that time?',
            placeholder: 'Describe symptoms, location in the body, when they began, and any life events that coincided...',
          },
          {
            id: 'body_tension',
            label: 'Where in your body do you most feel stress, emotion, or unresolved tension? Describe the physical sensation.',
            placeholder: 'Tight chest, knot in stomach, jaw clenching, shoulder tension, fatigue...',
          },
          {
            id: 'body_energy',
            label: 'How would you describe your physical energy — not just now, but as a pattern over the past year?',
            placeholder: 'Chronically depleted, fluctuating, driven by adrenaline, slow to start, crashes in afternoons...',
          },
        ],
      },
      {
        title: 'Mind & Patterns',
        subtitle: 'Mente y Patrones',
        icon: '◎',
        color: '#C9963C',
        description: 'The mind repeats what the heart has not resolved.',
        questions: [
          {
            id: 'mind_narrative',
            label: 'What is the story you keep telling yourself about who you are — the narrative that plays on repeat, often without you noticing?',
            placeholder: '"I am not enough," "I have to do everything alone," "Love always ends," "I don\'t deserve..."',
          },
          {
            id: 'mind_triggers',
            label: 'What situations, types of people, or dynamics trigger your strongest emotional reactions? What do your triggers have in common?',
            placeholder: 'Being ignored, people who lie, feeling controlled, being abandoned, not being heard...',
          },
          {
            id: 'mind_sleep',
            label: 'What visits your mind when you try to sleep? Describe the quality of your mental rest.',
            placeholder: 'Rumination, planning, fears, racing thoughts, dreams that disturb — what does your mind do in the dark?',
          },
        ],
      },
      {
        title: 'Shadow & Hidden Self',
        subtitle: 'Sombra y Yo Oculto',
        icon: '◑',
        color: '#E06090',
        description: 'What we reject in others lives in us. What we most hide is closest to our wound.',
        questions: [
          {
            id: 'shadow_irritation',
            label: 'What qualities or behaviors in other people irritate, repel, or anger you the most — the things you cannot stand in others?',
            placeholder: 'Arrogance, weakness, neediness, selfishness, dishonesty, showing off, being controlled...',
          },
          {
            id: 'shadow_hide',
            label: 'What aspects of yourself do you most hide, suppress, or feel ashamed of? What would you be afraid others would find out about you?',
            placeholder: 'Anger, neediness, ambition, fear, sexual feelings, vulnerability, failure, dark thoughts...',
          },
          {
            id: 'shadow_critic',
            label: 'What does your harshest inner critic say about you? Write the exact words — the most brutal sentence you direct at yourself.',
            placeholder: '"You are..." / "You will never..." / "There is something wrong with you because..."',
          },
        ],
      },
      {
        title: 'Emotions & The Body\'s Memory',
        subtitle: 'Emociones y Memoria del Cuerpo',
        icon: '◈',
        color: '#E4B85A',
        description: 'Emotions we could not feel then live in the body as symptoms.',
        questions: [
          {
            id: 'emotions_dominant',
            label: 'What emotions have been most present in your life over the past year? Name the ones you feel most frequently and most intensely.',
            placeholder: 'Anxiety, numbness, grief, rage beneath the surface, longing, emptiness, loneliness, disconnection...',
          },
          {
            id: 'emotions_carrying',
            label: 'Is there something you have been carrying emotionally for a long time — a grief, a resentment, a loss, a love that was never expressed?',
            placeholder: 'Something you may have never spoken aloud, or something that still hurts when you touch it...',
          },
          {
            id: 'emotions_earliest',
            label: 'What is one of your earliest memories of emotional pain, fear, or feeling unsafe? How does that same feeling still show up in your adult life?',
            placeholder: 'You don\'t need to narrate the event — describe the FEELING and where you still feel it today...',
          },
        ],
      },
      {
        title: 'Family System',
        subtitle: 'Sistema Familiar',
        icon: '☿',
        color: '#C9963C',
        description: 'We are not just individuals. We carry entire lineages within us.',
        questions: [
          {
            id: 'family_atmosphere',
            label: 'Describe the emotional atmosphere of your family growing up. What was unspoken? What was the unwritten rule about emotions, success, love, or money?',
            placeholder: '"In our family, we don\'t talk about..." / "The rule was that..." / The dominant feeling in the home was...',
          },
          {
            id: 'family_patterns',
            label: 'What patterns repeat across generations in your family? Think of illness, relationships, money, loss, addiction, early deaths, silence, or success that was never sustained.',
            placeholder: 'The women in my family always... / My father and I are exactly the same in... / There is a pattern of...',
          },
          {
            id: 'family_secrets',
            label: 'Is there someone in your family who was excluded, forgotten, shamed, or whose story was never told — an ancestor whose fate might still be influencing the living?',
            placeholder: 'A suicide, a child given up, someone who committed a crime, a secret pregnancy, a war, an immigration, an early death no one talks about...',
          },
        ],
      },
      {
        title: 'Energy & Life Force',
        subtitle: 'Energía y Fuerza Vital',
        icon: '◗',
        color: '#3DC898',
        description: 'Where your energy flows and where it is blocked reveals your soul\'s map.',
        questions: [
          {
            id: 'energy_blocked',
            label: 'In which areas of life do you feel most stuck, blocked, or like you can never quite move forward? (money, relationships, creative expression, health, power, love, purpose)',
            placeholder: 'Be honest — where does the same wall keep appearing no matter what you try?',
          },
          {
            id: 'energy_drain_source',
            label: 'What drains your life force most consistently — people, environments, obligations, thoughts, or patterns? And what, even briefly, restores it?',
            placeholder: 'Drained by... / Restored by even small doses of...',
          },
          {
            id: 'energy_receive',
            label: 'How comfortable are you receiving — love, help, money, recognition, pleasure? Do you find it easier to give than to receive? Describe your relationship with receiving.',
            placeholder: 'Do you deflect compliments, feel guilt when helped, give to avoid receiving, or minimize your own needs?',
          },
        ],
      },
      {
        title: 'Consciousness & Purpose',
        subtitle: 'Conciencia y Propósito',
        icon: '◇',
        color: '#E4B85A',
        description: 'The soul always knows. It is waiting for you to stop running.',
        questions: [
          {
            id: 'purpose_wound',
            label: 'What is the one wound, struggle, or challenge that — when you look back — may have been preparing you for something? What is the gift hidden inside your hardest chapter?',
            placeholder: 'Take your time. This question asks for the deeper view...',
          },
          {
            id: 'purpose_beliefs',
            label: 'What beliefs about yourself, love, money, or what you deserve did you absorb growing up that still secretly govern your life today?',
            placeholder: '"I learned that I have to earn love..." / "Money was..." / "I was taught that I am..."',
          },
          {
            id: 'purpose_here',
            label: 'What brought you to The Alchemist today — the honest, real answer beneath the surface reason?',
            placeholder: 'What is the part of you that is tired, searching, or ready — and what is it ready for?',
          },
        ],
      },
    ],

    result: {
      title: 'Your Soul Reading',
      subtitle: 'For',
      bookCta: 'Begin Your First Alchemy — $199',
      emailSent: '✦ Your reading has been sent to',
    },
  },

  nav: {
    assessment: 'Soul Assessment',
    booking: 'Book Now',
    about: 'About',
  },
}

export type Translations = typeof en
