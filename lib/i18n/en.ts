export const en = {
  // ── Common ──────────────────────────────────────────
  common: {
    brand: 'THE ALCHEMIST',
    tagline: 'Where Science Meets Spirit',
    backHome: 'Return Home',
    book: 'Book Your Session',
    loading: 'Loading...',
    next: 'Next →',
    back: '← Back',
  },

  // ── Assessment ──────────────────────────────────────
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
        title: 'Physical Body',
        subtitle: 'Cuerpo Físico',
        icon: '◌',
        color: '#3DC898',
        questions: [
          {
            id: 'physical_energy',
            label: 'How would you describe your energy levels over the past month?',
            placeholder: 'Describe your physical energy — does it feel steady, depleted, fluctuating?',
          },
          {
            id: 'physical_pain',
            label: 'Do you experience any recurring pain, tension, or physical discomfort?',
            placeholder: 'Any chronic symptoms, areas of tension, or patterns you notice in your body...',
          },
        ],
      },
      {
        title: 'Mind',
        subtitle: 'Mente',
        icon: '◎',
        color: '#C9963C',
        questions: [
          {
            id: 'mind_thoughts',
            label: 'What thoughts are consuming the most mental space right now?',
            placeholder: 'What loops in your mind — worries, plans, unresolved situations...',
          },
          {
            id: 'mind_sleep',
            label: 'Does your mind truly rest when you sleep?',
            placeholder: 'Do you dream intensely, wake with anxiety, or feel mentally restored in the morning?',
          },
        ],
      },
      {
        title: 'Emotions',
        subtitle: 'Emociones',
        icon: '◑',
        color: '#E06090',
        questions: [
          {
            id: 'emotions_frequent',
            label: 'What emotions have been most present in your life this past week?',
            placeholder: 'Anxiety, grief, joy, numbness, longing — name what is real for you...',
          },
          {
            id: 'emotions_carrying',
            label: 'Is there something you have been carrying emotionally for a long time?',
            placeholder: 'An unresolved wound, a relationship, a grief, a decision not yet made...',
          },
        ],
      },
      {
        title: 'Vital Energy',
        subtitle: 'Energía Vital',
        icon: '◈',
        color: '#E4B85A',
        questions: [
          {
            id: 'energy_peak',
            label: 'When do you feel most alive and energized during the day?',
            placeholder: 'Morning, after movement, in nature, in silence, with certain people...',
          },
          {
            id: 'energy_drain',
            label: 'What consistently drains your energy or life force?',
            placeholder: 'Certain environments, relationships, foods, thought patterns, obligations...',
          },
        ],
      },
      {
        title: 'Spirit',
        subtitle: 'Espíritu',
        icon: '☿',
        color: '#C9963C',
        questions: [
          {
            id: 'spirit_purpose',
            label: 'Do you feel aligned with your deeper purpose and calling?',
            placeholder: 'Do your daily actions feel meaningful? Is something pulling you in a different direction?',
          },
          {
            id: 'spirit_calling',
            label: 'Is there something your soul has been asking of you that you have not yet answered?',
            placeholder: 'A change, a creative calling, a boundary to set, a truth to speak...',
          },
        ],
      },
      {
        title: 'Sleep',
        subtitle: 'Sueño',
        icon: '◗',
        color: '#3DC898',
        questions: [
          {
            id: 'sleep_hours',
            label: 'How many hours do you sleep on average, and how would you describe the quality?',
            placeholder: 'Hours, ease of falling asleep, staying asleep, quality of rest...',
          },
          {
            id: 'sleep_quality',
            label: 'Do you wake feeling truly restored — physically and mentally?',
            placeholder: 'Groggy, alert, anxious, peaceful — what is the texture of your mornings?',
          },
        ],
      },
      {
        title: 'Purpose',
        subtitle: 'Propósito',
        icon: '◇',
        color: '#E4B85A',
        questions: [
          {
            id: 'purpose_future',
            label: 'Who do you want to become in the next 6 months?',
            placeholder: 'Not what you want to do — who do you want to be? How do you want to feel?',
          },
          {
            id: 'purpose_today',
            label: 'What brought you to The Alchemist today?',
            placeholder: 'The honest answer — what is the real reason you are here right now?',
          },
        ],
      },
    ],

    // Result page
    result: {
      title: 'Your Soul Reading',
      subtitle: 'For',
      bookCta: 'Begin Your First Alchemy — $199',
      emailSent: '✦ Your reading has been sent to',
      sections: {
        currentState: 'Your Current State',
        bellaSees: 'Bella Sees',
        meighenSees: 'Dr. Meighen Sees',
        path: 'Your Recommended Path',
        firstAlchemy: 'Your First Alchemy',
        soulMessage: 'A Message for Your Soul',
      },
    },
  },

  // ── Nav ────────────────────────────────────────────
  nav: {
    assessment: 'Soul Assessment',
    booking: 'Book Now',
    about: 'About',
  },
}

export type Translations = typeof en
