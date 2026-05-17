import type { Translations } from './en'
import type { AssessmentStep } from './types'

const assessmentSteps: AssessmentStep[] = [
  {
    title: 'Tu Cuerpo y Energía',
    subtitle: 'Body & Energy',
    icon: '◌',
    color: '#3DC898',
    description: 'Tu cuerpo recuerda todo lo que tu mente intenta olvidar.',
    questions: [
      {
        id: 'energy_pattern',
        label: 'Tu energía, la mayoría de los días, se siente como...',
        type: 'single',
        options: [
          { value: 'never_charges', label: 'Una batería que nunca se carga del todo', tags: ['chronic_depletion', 'adrenal_fatigue', 'root_blocked'] },
          { value: 'adrenaline_crash', label: 'Funciona con adrenalina — activo hasta que colapso', tags: ['hypervigilance', 'cortisol_driven', 'solar_plexus_overactive', 'workaholism'] },
          { value: 'low_shutdown', label: 'Silenciosa y plana — difícil de arrancar', tags: ['freeze_response', 'shutdown', 'depression_pattern'] },
          { value: 'stable', label: 'Mayormente estable con algunas caídas', tags: ['regulated', 'resilient'] },
        ],
      },
      {
        id: 'body_tension',
        label: 'Tu cuerpo carga la tensión principalmente en... (selecciona hasta 3)',
        type: 'multi',
        maxSelect: 3,
        options: [
          { value: 'chest_throat', label: 'Pecho o garganta', tags: ['heart_wall', 'throat_suppression', 'grief_stored', 'unexpressed'] },
          { value: 'stomach_gut', label: 'Estómago o intestinos', tags: ['anxiety_center', 'solar_plexus_wound', 'fear_base', 'control_pattern'] },
          { value: 'back_shoulders', label: 'Espalda u hombros', tags: ['carrying_others', 'responsibility_burden', 'support_wound'] },
          { value: 'head_jaw', label: 'Cabeza o mandíbula', tags: ['mental_overload', 'control_through_thinking', 'perfectionism'] },
          { value: 'hips_pelvis', label: 'Caderas o zona pélvica', tags: ['trauma_storage', 'sacral_wound', 'shame_body'] },
          { value: 'dont_notice', label: 'No noto mucho mi cuerpo', tags: ['dissociation', 'disconnection_from_body', 'trauma_defense'] },
        ],
      },
      {
        id: 'sleep_pattern',
        label: 'Tu sueño normalmente es...',
        type: 'single',
        options: [
          { value: 'wake_3am', label: 'Me duermo pero me despierto entre 2-4am con pensamientos', tags: ['anxiety_processing', 'unresolved_conflict', 'liver_stress'] },
          { value: 'cant_fall', label: 'No puedo dormirme — mi mente no para', tags: ['rumination', 'hypervigilance', 'anxiety_driven'] },
          { value: 'long_unrefreshed', label: 'Duermo mucho pero amanezco agotado/a', tags: ['adrenal_fatigue', 'depression_somatic', 'shutdown'] },
          { value: 'restorative', label: 'Generalmente reparador', tags: ['regulated'] },
        ],
      },
      {
        id: 'body_message',
        label: 'En una frase — ¿qué intenta decirte tu cuerpo que sigues ignorando?',
        type: 'text',
        placeholder: 'El mensaje que tu cuerpo sigue enviando y que no has querido escuchar...',
      },
    ],
  },
  {
    title: 'Tu Mundo Emocional',
    subtitle: 'Emotional World',
    icon: '◎',
    color: '#C9963C',
    description: 'Las emociones que no expresamos, el cuerpo las expresa por nosotros.',
    questions: [
      {
        id: 'emotion_surface',
        label: 'La emoción que vive justo debajo de tu compostura — la que cargas cada día — es generalmente...',
        type: 'single',
        options: [
          { value: 'anxiety_hum', label: 'Un zumbido bajo de ansiedad — como esperando que algo salga mal', tags: ['fear_wound', 'survival_mode', 'hypervigilance', 'anxious_nervous_system'] },
          { value: 'quiet_resentment', label: 'Frustración o un resentimiento silencioso que rara vez expreso', tags: ['suppressed_anger', 'injustice_wound', 'shadow_anger', 'throat_suppression'] },
          { value: 'unexplained_sadness', label: 'Una tristeza o nostalgia que no puedo explicar del todo', tags: ['grief', 'loss_wound', 'heart_chakra_blocked', 'unexpressed_mourning'] },
          { value: 'numbness', label: 'Entumecimiento — siento menos de lo que creo que debería', tags: ['dissociation', 'emotional_freeze', 'shutdown', 'disconnection'] },
        ],
      },
      {
        id: 'pain_response',
        label: 'Cuando algo te duele profundamente, tu primer instinto es...',
        type: 'single',
        options: [
          { value: 'withdraw_alone', label: 'Retirarme y procesarlo solo/a — no necesito que nadie lo vea', tags: ['avoidant_attachment', 'self_sufficient_defense', 'vulnerability_fear'] },
          { value: 'self_blame', label: 'Preguntarme qué hice mal', tags: ['self_blame', 'anxious_attachment', 'shame_wound', 'responsibility_wound'] },
          { value: 'keep_going', label: 'Seguir adelante y que no se note', tags: ['stoic_defense', 'control_pattern', 'vulnerability_forbidden', 'performance_identity'] },
          { value: 'seek_connection', label: 'Buscar a alguien — necesito procesarlo con alguien', tags: ['secure_attachment', 'connection_healthy'] },
        ],
      },
      {
        id: 'hardest_to_admit',
        label: 'El tipo de dolor más difícil de admitir — incluso ante ti mismo/a — es...',
        type: 'single',
        options: [
          { value: 'loneliness', label: 'Que me siento profundamente solo/a', tags: ['isolation_wound', 'independence_trap', 'belonging_need'] },
          { value: 'not_enough', label: 'Que no me siento suficiente — no lo bastante inteligente, amable, valioso/a', tags: ['shame_core', 'inadequacy_wound', 'self_worth_wound'] },
          { value: 'rage_inside', label: 'Que hay rabia dentro de mí que apenas me permito sentir', tags: ['shadow_anger', 'suppressed_rage', 'injustice_wound'] },
          { value: 'fear_future', label: 'Que tengo miedo — del futuro, del abandono, de fallar', tags: ['fear_wound', 'anxiety_base', 'abandonment_fear'] },
        ],
      },
    ],
  },
  {
    title: 'Cómo Amas',
    subtitle: 'How You Love',
    icon: '◑',
    color: '#E06090',
    description: 'Amamos de la manera en que nos enseñaron — hasta que decidimos aprender diferente.',
    questions: [
      {
        id: 'relationship_pattern',
        label: 'En tus relaciones más cercanas, el patrón que aparece con más frecuencia es...',
        type: 'single',
        options: [
          { value: 'give_unreciprocated', label: 'Doy mucho y con frecuencia siento que no se devuelve en igual medida', tags: ['self_abandonment', 'anxious_attachment', 'giver_pattern', 'martyrdom'] },
          { value: 'attract_to_fix', label: 'Atraigo personas que necesitan ser rescatadas o arregladas', tags: ['rescuer_pattern', 'codependency', 'avoidance_own_needs', 'control_through_helping'] },
          { value: 'emotional_distance', label: 'Mantengo cierta distancia emocional — la verdadera intimidad se siente arriesgada', tags: ['avoidant_attachment', 'heart_wall', 'independence_defense', 'intimacy_fear'] },
          { value: 'starts_well_breaks', label: 'Las cosas empiezan bien pero siempre hay un punto en que algo colapsa', tags: ['repetition_compulsion', 'sabotage_pattern', 'abandonment_wound_active'] },
        ],
      },
      {
        id: 'love_feels_like',
        label: 'El amor, para ti, principalmente se siente como...',
        type: 'single',
        options: [
          { value: 'must_earn', label: 'Algo que tengo que ganarme siendo útil, bueno/a o perfecto/a', tags: ['conditional_love_wound', 'people_pleasing', 'performance_identity', 'parent_approval_seeking'] },
          { value: 'eventually_leaves', label: 'Algo que eventualmente decepciona o se va', tags: ['abandonment_wound', 'avoidant_attachment', 'pessimistic_attachment'] },
          { value: 'too_intense', label: 'Algo abrumador del que a veces quiero escapar', tags: ['engulfment_fear', 'avoidant_attachment', 'intimacy_ambivalence'] },
          { value: 'give_not_receive', label: 'Algo que doy libremente pero me cuesta recibir', tags: ['giving_defense', 'receiving_wound', 'unworthy_of_care'] },
        ],
      },
      {
        id: 'bothers_in_others',
        label: '¿Qué te molesta MÁS en los demás? (elige hasta 2)',
        type: 'multi',
        maxSelect: 2,
        options: [
          { value: 'selfishness', label: 'El egoísmo o la prepotencia', tags: ['suppressed_own_needs', 'shadow_desire', 'self_denial_pattern'] },
          { value: 'weakness_neediness', label: 'La debilidad o la dependencia excesiva', tags: ['shadow_vulnerability', 'rejected_own_vulnerability', 'strength_mask'] },
          { value: 'arrogance', label: 'La arrogancia o el exhibicionismo', tags: ['shadow_confidence', 'suppressed_ambition', 'golden_shadow'] },
          { value: 'dishonesty', label: 'La deshonestidad o la manipulación', tags: ['betrayal_wound', 'trust_core_issue'] },
          { value: 'irresponsibility', label: 'La irresponsabilidad o el caos', tags: ['control_pattern', 'anxiety_around_uncertainty', 'hypervigilance'] },
          { value: 'coldness', label: 'La frialdad o la indisponibilidad emocional', tags: ['abandonment_wound', 'anxious_attachment', 'connection_hunger'] },
        ],
      },
      {
        id: 'relationship_repeat',
        label: 'El patrón en las relaciones que sigues repitiendo — aunque te prometes que no lo harás — es...',
        type: 'text',
        placeholder: 'El ciclo que vuelve en diferentes personas, diferentes situaciones...',
      },
    ],
  },
  {
    title: 'La Voz en Tu Mente',
    subtitle: 'The Voice in Your Head',
    icon: '◈',
    color: '#E4B85A',
    description: 'La historia que te cuentas sobre ti mismo se convirtió en tu jaula. Y también en tu puerta.',
    questions: [
      {
        id: 'inner_narrative',
        label: 'La historia sobre ti mismo/a que se reproduce en bucle — a menudo sin que lo notes — es...',
        type: 'single',
        options: [
          { value: 'do_it_alone', label: '"Tengo que hacerlo todo solo/a. No puedo depender realmente de nadie."', tags: ['independence_wound', 'abandonment_defense', 'self_reliance_trauma', 'help_forbidden'] },
          { value: 'too_much_not_enough', label: '"Soy demasiado — o nunca suficiente."', tags: ['shame_wound', 'core_inadequacy', 'identity_wound', 'worthiness_issue'] },
          { value: 'never_works', label: '"Las cosas nunca me salen verdaderamente bien."', tags: ['victim_pattern', 'hopelessness', 'resignation', 'sabotage_loyalty'] },
          { value: 'guard_up', label: '"Si bajo la guardia, algo saldrá mal."', tags: ['hypervigilance', 'control_pattern', 'anxiety_base', 'safety_wound'] },
        ],
      },
      {
        id: 'inner_critic',
        label: 'Tu crítico interior — la voz más dura dentro de ti — suena más como...',
        type: 'single',
        options: [
          { value: 'disappointed_parent', label: 'Un padre o madre decepcionado/a — nunca del todo satisfecho/a', tags: ['superego_pattern', 'conditional_love_internalized', 'parent_wound'] },
          { value: 'fundamentally_flawed', label: '"Hay algo fundamentalmente malo en ti"', tags: ['shame_wound', 'core_defectiveness', 'self_rejection'] },
          { value: 'end_up_alone', label: '"Siempre acabarás solo/a"', tags: ['abandonment_wound', 'attachment_fear', 'isolation_prophecy'] },
          { value: 'never_enough', label: '"Hagas lo que hagas, nunca será suficiente"', tags: ['perfectionism', 'inadequacy_drive', 'achievement_wound'] },
        ],
      },
      {
        id: 'coping_reach',
        label: 'Cuando sientes malestar emocional, ¿qué buscas? (selecciona todas las que apliquen)',
        type: 'multi',
        maxSelect: 8,
        options: [
          { value: 'food_comfort', label: 'Comida — especialmente azúcar, carbohidratos o algo reconfortante', tags: ['emotional_eating', 'oral_fixation', 'comfort_seeking', 'addiction_food'] },
          { value: 'phone_scroll', label: 'El teléfono — scrollear, contenido, cualquier distracción', tags: ['digital_escape', 'avoidance_pattern', 'dopamine_seeking', 'addiction_tech'] },
          { value: 'work_busy', label: 'El trabajo o mantenerme extremadamente ocupado/a', tags: ['workaholism', 'productive_avoidance', 'addiction_doing', 'control_through_output'] },
          { value: 'substances', label: 'Alcohol, cannabis u otras sustancias', tags: ['substance_coping', 'numbing_pattern', 'escape_pattern', 'addiction_substances'] },
          { value: 'shopping', label: 'Comprar o gastar dinero', tags: ['retail_therapy', 'reward_substitution', 'addiction_spending', 'control_substitution'] },
          { value: 'exercise_intensity', label: 'Ejercicio o intensidad física', tags: ['physical_escape', 'healthy_sublimation', 'body_control'] },
          { value: 'isolation', label: 'Aislarme — apagar todo', tags: ['withdrawal', 'freeze_response', 'shutdown_pattern', 'avoidant_coping'] },
          { value: 'seek_person', label: 'Llamar o escribirle a alguien de inmediato', tags: ['external_regulation', 'anxious_attachment', 'co_regulation_dependent'] },
        ],
      },
      {
        id: 'mental_energy',
        label: 'La mayor parte de tu energía mental va hacia...',
        type: 'single',
        options: [
          { value: 'replaying_past', label: 'Reproducir conversaciones o eventos del pasado', tags: ['rumination', 'unresolved_conflict', 'past_anchored', 'guilt_shame_loop'] },
          { value: 'worrying_future', label: 'Preocuparme por lo que podría salir mal', tags: ['anxiety', 'hypervigilance', 'survival_mode', 'catastrophizing'] },
          { value: 'managing_perception', label: 'Gestionar cómo me ven y qué piensan de mí', tags: ['people_pleasing', 'image_management', 'shame_base', 'performance_identity'] },
          { value: 'problem_solving', label: 'Resolver problemas y mantener el control', tags: ['intellectual_defense', 'control_pattern', 'avoidance_feeling'] },
        ],
      },
    ],
  },
  {
    title: 'De Dónde Vienes',
    subtitle: 'Where You Come From',
    icon: '☿',
    color: '#C9963C',
    description: 'Somos la respuesta a preguntas que nuestra familia nunca se hizo.',
    questions: [
      {
        id: 'family_emotional_rule',
        label: 'La regla emocional no dicha en tu hogar al crecer era...',
        type: 'single',
        options: [
          { value: 'stay_strong', label: '"Mantente fuerte. No muestres debilidad."', tags: ['emotional_suppression', 'stoic_family', 'vulnerability_forbidden', 'strength_as_survival'] },
          { value: 'keep_peace', label: '"No hagas olas. Mantén la paz."', tags: ['conflict_avoidance', 'people_pleasing_learned', 'anger_forbidden', 'fawn_response_origin'] },
          { value: 'earn_place', label: '"Tienes que ganarte tu lugar aquí."', tags: ['conditional_love_wound', 'performance_identity', 'worth_through_doing'] },
          { value: 'unpredictable', label: '"Las cosas eran impredecibles — nunca sabía qué esperar"', tags: ['hypervigilance_learned', 'chaos_attachment', 'anxious_nervous_system_origin', 'safety_never_reliable'] },
        ],
      },
      {
        id: 'approval_sought',
        label: 'La persona cuyo amor o aprobación trabajaste más duro por ganarte de niño/a fue...',
        type: 'single',
        options: [
          { value: 'mother', label: 'Mi madre', tags: ['mother_wound', 'feminine_wound', 'maternal_attachment_pattern'] },
          { value: 'father', label: 'Mi padre', tags: ['father_wound', 'masculine_wound', 'paternal_attachment_pattern'] },
          { value: 'both', label: 'Ambos por igual', tags: ['both_parents_wound', 'exhausted_child', 'hypervigilance_from_both'] },
          { value: 'neither', label: 'Ninguno — mayormente aprendí a no necesitar a nadie', tags: ['emotional_orphan', 'self_sufficiency_defense', 'disconnection_early', 'attachment_shutdown'] },
        ],
      },
      {
        id: 'family_repeating',
        label: 'Un patrón que se repite en tu familia — apareciendo de diferentes formas, en diferentes personas — es...',
        type: 'single',
        options: [
          { value: 'relationship_loss', label: 'Relaciones que se rompen o personas que se van', tags: ['abandonment_transgenerational', 'loss_loyalty', 'attachment_wound_inherited'] },
          { value: 'financial_struggle', label: 'Dificultades económicas o "nunca suficiente"', tags: ['scarcity_transgenerational', 'money_wound', 'survival_programming'] },
          { value: 'illness_fatigue', label: 'Enfermedades, dolores inexplicables o fatiga crónica', tags: ['somatic_transgenerational', 'body_wound_inherited', 'stress_in_dna'] },
          { value: 'emotional_distance', label: 'Distancia emocional — el amor estaba, pero la cercanía era difícil', tags: ['intimacy_avoidance_inherited', 'emotional_unavailability_pattern'] },
          { value: 'success_sabotage', label: 'Éxito que nunca dura, o algo siempre sale mal justo cuando las cosas mejoran', tags: ['success_wound_transgenerational', 'loyalty_to_suffering', 'sabotage_inherited'] },
        ],
      },
      {
        id: 'family_unspoken',
        label: 'Si hay un tema no dicho que corre por debajo de la superficie de tu familia, sería...',
        type: 'single',
        options: [
          { value: 'shame_secret', label: 'La vergüenza — sobre quién fue alguien, lo que ocurrió, o lo que se ocultó', tags: ['family_shame', 'exclusion_pattern', 'secret_wound', 'forbidden_truth'] },
          { value: 'unprocessed_loss', label: 'La pérdida — un duelo que nunca tuvo espacio', tags: ['unmourned_loss', 'grief_transgenerational', 'mourning_forbidden'] },
          { value: 'contained_anger', label: 'La ira — que no tuvo un lugar seguro adonde ir', tags: ['suppressed_rage_inherited', 'anger_forbidden_pattern', 'injustice_unnamed'] },
          { value: 'inherited_fear', label: 'El miedo — a que la vida sea peligrosa, a que nunca haya suficiente', tags: ['scarcity_fear_inherited', 'survival_transmission', 'anxiety_inherited'] },
        ],
      },
    ],
  },
  {
    title: 'Lo Que Buscas',
    subtitle: 'What You Reach For',
    icon: '◗',
    color: '#3DC898',
    description: 'Lo que evitamos y lo que anhelamos revela la herida debajo.',
    questions: [
      {
        id: 'deepest_need',
        label: 'Lo que más necesitas — pero te resulta más difícil pedir — es...',
        type: 'single',
        options: [
          { value: 'be_seen', label: 'Ser verdaderamente visto/a — no la versión que interpreto, sino el real', tags: ['visibility_need', 'recognition_wound', 'performance_exhaustion', 'authenticity_hunger'] },
          { value: 'feel_safe', label: 'Sentirme suficientemente seguro/a para ser vulnerable con alguien', tags: ['safety_need', 'trust_wound', 'vulnerability_longing', 'protection_hunger'] },
          { value: 'be_chosen', label: 'Ser elegido/a — consistentemente, sin tener que ganármelo primero', tags: ['belonging_need', 'abandonment_wound', 'unconditional_love_hunger'] },
          { value: 'permission_to_rest', label: 'Permiso para simplemente existir sin producir ni actuar constantemente', tags: ['performance_fatigue', 'identity_wound', 'worth_through_doing', 'rest_as_threat'] },
        ],
      },
      {
        id: 'what_you_avoid',
        label: 'Lo que evitas — casi a cualquier costo — es...',
        type: 'single',
        options: [
          { value: 'conflict_disappoint', label: 'El conflicto o decepcionar a los demás', tags: ['people_pleasing', 'anger_avoidance', 'fawn_response', 'approval_dependency'] },
          { value: 'seen_as_weak', label: 'Que me vean débil, necesitado/a o fuera de control', tags: ['vulnerability_fear', 'shame_wound', 'strength_as_armor', 'mask_wearing'] },
          { value: 'being_left', label: 'Ser abandonado/a o estar verdaderamente solo/a', tags: ['abandonment_fear', 'anxious_attachment', 'aloneness_terror'] },
          { value: 'losing_control', label: 'Situaciones donde no controlo lo que sucede', tags: ['control_pattern', 'anxiety_driven', 'trust_wound', 'chaos_fear'] },
        ],
      },
      {
        id: 'feels_alive',
        label: '¿Qué te hace sentir más vivo/a — aunque sea brevemente?',
        type: 'single',
        options: [
          { value: 'deep_connection', label: 'Conversaciones profundas y reales donde me siento verdaderamente comprendido/a', tags: ['connection_need', 'depth_value', 'heart_awakening'] },
          { value: 'creating', label: 'Crear algo — construir, expresar, hacer', tags: ['creative_soul', 'sacral_energy', 'expression_hunger'] },
          { value: 'nature_silence', label: 'Estar en la naturaleza, lejos de las exigencias', tags: ['nervous_system_depletion', 'restoration_need', 'overstimulated'] },
          { value: 'helping_purpose', label: 'Contribuir a algo que realmente importa', tags: ['purpose_driven', 'service_soul', 'meaning_seeking'] },
        ],
      },
    ],
  },
  {
    title: 'Para Qué Estás Aquí',
    subtitle: 'What You\'re Here For',
    icon: '◇',
    color: '#E4B85A',
    description: 'El alma siempre sabe. Ha estado esperando que escuches.',
    questions: [
      {
        id: 'life_missing',
        label: 'Cuando imaginas la vida que realmente quieres — no la que se supone que debes querer — lo que más falta es...',
        type: 'single',
        options: [
          { value: 'inner_peace', label: 'Paz — dejar de huir de mis propios pensamientos', tags: ['internal_work_ready', 'anxiety_exhaustion', 'mind_silence_need'] },
          { value: 'real_love', label: 'Amor real y pertenencia — dejar de actuar en las relaciones', tags: ['heart_work_ready', 'relationship_healing', 'authentic_connection_hunger'] },
          { value: 'freedom', label: 'Libertad — ser plenamente yo mismo/a sin pedir disculpas', tags: ['identity_work_ready', 'authenticity_hunger', 'performance_liberation'] },
          { value: 'real_purpose', label: 'Un propósito que realmente se sienta mío, no el que me dijeron que quería', tags: ['purpose_work_ready', 'meaning_seeking', 'externally_defined_life'] },
        ],
      },
      {
        id: 'afraid_to_become',
        label: 'La versión de ti mismo/a que más temes convertirte es...',
        type: 'single',
        options: [
          { value: 'like_mother', label: 'Mi madre', tags: ['mother_identification_fear', 'feminine_wound_active', 'maternal_pattern_rejection'] },
          { value: 'like_father', label: 'Mi padre', tags: ['father_identification_fear', 'masculine_wound_active', 'paternal_pattern_rejection'] },
          { value: 'alone_forever', label: 'Alguien que termina verdaderamente solo/a', tags: ['abandonment_deepest_fear', 'aloneness_terror_core'] },
          { value: 'never_enough', label: 'Alguien que lo intenta todo pero nunca es suficiente', tags: ['shame_deepest_fear', 'inadequacy_core', 'futility_terror'] },
        ],
      },
      {
        id: 'real_reason_here',
        label: 'Lo que más quisiera que alguien finalmente entendiera de mí — algo que rara vez consigo decir — es...',
        type: 'text',
        placeholder: 'La verdad sobre ti que la mayoría de las personas nunca llega a ver...',
      },
    ],
  },
]

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
    stepLabel: 'Parte',
    of: 'de',
    namePlaceholder: 'Tu nombre',
    emailPlaceholder: 'tu@email.com',
    emailOptional: 'Opcional: recibe tu Lectura del Alma por correo',
    submitBtn: 'Revelar Mi Lectura ☿',
    generating: 'Leyendo tu alma...',
    error: 'No se pudo generar tu lectura. Por favor intenta de nuevo.',
    connectionError: 'Error de conexión. Por favor intenta de nuevo.',
    emailConfirm: '✦ Tu lectura ha sido enviada a',
    multiSelectHint: 'Selecciona hasta',
    multiSelectHint2: '',
    steps: assessmentSteps,

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
