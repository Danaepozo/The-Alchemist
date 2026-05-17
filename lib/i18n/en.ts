import type { AssessmentStep } from './types'
export type { AssessmentOption, AssessmentQuestion, AssessmentStep } from './types'

const assessmentSteps: AssessmentStep[] = [
  {
    title: 'Your Body & Energy',
    subtitle: 'Cuerpo y Energía',
    icon: '◌',
    color: '#3DC898',
    description: 'Your body remembers everything your mind tries to forget.',
    questions: [
      {
        id: 'energy_pattern',
        label: 'Your energy, most days, feels like...',
        type: 'single',
        options: [
          { value: 'never_charges', label: 'A battery that never fully recharges', tags: ['chronic_depletion', 'adrenal_fatigue', 'root_blocked'] },
          { value: 'adrenaline_crash', label: 'Runs on adrenaline — busy until I crash', tags: ['hypervigilance', 'cortisol_driven', 'solar_plexus_overactive', 'workaholism'] },
          { value: 'low_shutdown', label: 'Quiet and flat — hard to get started', tags: ['freeze_response', 'shutdown', 'depression_pattern'] },
          { value: 'stable', label: 'Mostly stable with occasional dips', tags: ['regulated', 'resilient'] },
        ],
      },
      {
        id: 'body_tension',
        label: 'Your body most often carries tension in... (select up to 3)',
        type: 'multi',
        maxSelect: 3,
        options: [
          { value: 'chest_throat', label: 'Chest or throat', tags: ['heart_wall', 'throat_suppression', 'grief_stored', 'unexpressed'] },
          { value: 'stomach_gut', label: 'Stomach or gut', tags: ['anxiety_center', 'solar_plexus_wound', 'fear_base', 'control_pattern'] },
          { value: 'back_shoulders', label: 'Back or shoulders', tags: ['carrying_others', 'responsibility_burden', 'support_wound'] },
          { value: 'head_jaw', label: 'Head or jaw', tags: ['mental_overload', 'control_through_thinking', 'perfectionism'] },
          { value: 'hips_pelvis', label: 'Hips or lower body', tags: ['trauma_storage', 'sacral_wound', 'shame_body'] },
          { value: 'dont_notice', label: "I don't notice my body much", tags: ['dissociation', 'disconnection_from_body', 'trauma_defense'] },
        ],
      },
      {
        id: 'sleep_pattern',
        label: 'Sleep, for you, is usually...',
        type: 'single',
        options: [
          { value: 'wake_3am', label: 'I fall asleep but wake up at 2–4am with thoughts', tags: ['anxiety_processing', 'unresolved_conflict', 'liver_stress'] },
          { value: 'cant_fall', label: "Can't fall asleep — my mind won't stop", tags: ['rumination', 'hypervigilance', 'anxiety_driven'] },
          { value: 'long_unrefreshed', label: 'I sleep long but still wake up exhausted', tags: ['adrenal_fatigue', 'depression_somatic', 'shutdown'] },
          { value: 'restorative', label: 'Generally good and restorative', tags: ['regulated'] },
        ],
      },
      {
        id: 'body_message',
        label: 'In one sentence — what is your body trying to tell you that you keep ignoring?',
        type: 'text',
        placeholder: 'The message your body keeps sending that you haven\'t wanted to hear...',
      },
    ],
  },
  {
    title: 'Your Emotional World',
    subtitle: 'Mundo Emocional',
    icon: '◎',
    color: '#C9963C',
    description: 'The emotions we don\'t express, the body expresses for us.',
    questions: [
      {
        id: 'emotion_surface',
        label: 'The emotion that lives just beneath your composure — the one you carry daily — is usually...',
        type: 'single',
        options: [
          { value: 'anxiety_hum', label: 'A low hum of anxiety — like waiting for something to go wrong', tags: ['fear_wound', 'survival_mode', 'hypervigilance', 'anxious_nervous_system'] },
          { value: 'quiet_resentment', label: 'Frustration or a quiet resentment you rarely voice', tags: ['suppressed_anger', 'injustice_wound', 'shadow_anger', 'throat_suppression'] },
          { value: 'unexplained_sadness', label: 'A sadness or longing you can\'t quite explain', tags: ['grief', 'loss_wound', 'heart_chakra_blocked', 'unexpressed_mourning'] },
          { value: 'numbness', label: "Numbness — you feel less than you think you should", tags: ['dissociation', 'emotional_freeze', 'shutdown', 'disconnection'] },
        ],
      },
      {
        id: 'pain_response',
        label: 'When something deeply hurts you, your first instinct is...',
        type: 'single',
        options: [
          { value: 'withdraw_alone', label: 'Withdraw and process alone — I need no one to see it', tags: ['avoidant_attachment', 'self_sufficient_defense', 'vulnerability_fear'] },
          { value: 'self_blame', label: 'Ask myself what I did wrong', tags: ['self_blame', 'anxious_attachment', 'shame_wound', 'responsibility_wound'] },
          { value: 'keep_going', label: 'Keep going and not let it show', tags: ['stoic_defense', 'control_pattern', 'vulnerability_forbidden', 'performance_identity'] },
          { value: 'seek_connection', label: 'Reach out — I need to process with someone', tags: ['secure_attachment', 'connection_healthy'] },
        ],
      },
      {
        id: 'hardest_to_admit',
        label: 'The kind of pain you find hardest to admit — even to yourself — is...',
        type: 'single',
        options: [
          { value: 'loneliness', label: 'That I am deeply lonely', tags: ['isolation_wound', 'independence_trap', 'belonging_need'] },
          { value: 'not_enough', label: "That I don't feel enough — not smart, not lovable, not worthy", tags: ['shame_core', 'inadequacy_wound', 'self_worth_wound'] },
          { value: 'rage_inside', label: 'That there is rage inside me I barely let myself feel', tags: ['shadow_anger', 'suppressed_rage', 'injustice_wound'] },
          { value: 'fear_future', label: "That I am afraid — of the future, of being abandoned, of failing", tags: ['fear_wound', 'anxiety_base', 'abandonment_fear'] },
        ],
      },
    ],
  },
  {
    title: 'How You Love',
    subtitle: 'Cómo Amas',
    icon: '◑',
    color: '#E06090',
    description: 'We love the way we were taught to — until we decide to learn differently.',
    questions: [
      {
        id: 'relationship_pattern',
        label: 'In your closest relationships, the pattern that appears most often is...',
        type: 'single',
        options: [
          { value: 'give_unreciprocated', label: 'I give a lot and often feel it isn\'t returned equally', tags: ['self_abandonment', 'anxious_attachment', 'giver_pattern', 'martyrdom'] },
          { value: 'attract_to_fix', label: 'I attract people who need saving or fixing', tags: ['rescuer_pattern', 'codependency', 'avoidance_own_needs', 'control_through_helping'] },
          { value: 'emotional_distance', label: 'I keep some emotional distance — real intimacy feels risky', tags: ['avoidant_attachment', 'heart_wall', 'independence_defense', 'intimacy_fear'] },
          { value: 'starts_well_breaks', label: 'Things start well but there\'s always a point where it collapses', tags: ['repetition_compulsion', 'sabotage_pattern', 'abandonment_wound_active'] },
        ],
      },
      {
        id: 'love_feels_like',
        label: 'Love, to you, mostly feels like...',
        type: 'single',
        options: [
          { value: 'must_earn', label: 'Something I have to earn by being useful, good, or perfect', tags: ['conditional_love_wound', 'people_pleasing', 'performance_identity', 'parent_approval_seeking'] },
          { value: 'eventually_leaves', label: 'Something that eventually disappoints or walks away', tags: ['abandonment_wound', 'avoidant_attachment', 'pessimistic_attachment'] },
          { value: 'too_intense', label: 'Something overwhelming that I sometimes want to escape from', tags: ['engulfment_fear', 'avoidant_attachment', 'intimacy_ambivalence'] },
          { value: 'give_not_receive', label: 'Something I give freely but struggle to receive', tags: ['giving_defense', 'receiving_wound', 'unworthy_of_care'] },
        ],
      },
      {
        id: 'bothers_in_others',
        label: 'What bothers you MOST in other people? (choose up to 2)',
        type: 'multi',
        maxSelect: 2,
        options: [
          { value: 'selfishness', label: 'Selfishness or entitlement', tags: ['suppressed_own_needs', 'shadow_desire', 'self_denial_pattern'] },
          { value: 'weakness_neediness', label: 'Weakness or neediness', tags: ['shadow_vulnerability', 'rejected_own_vulnerability', 'strength_mask'] },
          { value: 'arrogance', label: 'Arrogance or showing off', tags: ['shadow_confidence', 'suppressed_ambition', 'golden_shadow'] },
          { value: 'dishonesty', label: 'Dishonesty or manipulation', tags: ['betrayal_wound', 'trust_core_issue'] },
          { value: 'irresponsibility', label: 'Irresponsibility or chaos', tags: ['control_pattern', 'anxiety_around_uncertainty', 'hypervigilance'] },
          { value: 'coldness', label: 'Coldness or emotional unavailability', tags: ['abandonment_wound', 'anxious_attachment', 'connection_hunger'] },
        ],
      },
      {
        id: 'relationship_repeat',
        label: 'The relationship pattern you keep repeating — even when you promise yourself you won\'t — is...',
        type: 'text',
        placeholder: 'The cycle that keeps coming back in different people, different situations...',
      },
    ],
  },
  {
    title: 'The Voice in Your Head',
    subtitle: 'La Voz en Tu Mente',
    icon: '◈',
    color: '#E4B85A',
    description: 'The story you tell about yourself became your cage. And your door.',
    questions: [
      {
        id: 'inner_narrative',
        label: 'The story about yourself that plays on repeat — often without you noticing — is...',
        type: 'single',
        options: [
          { value: 'do_it_alone', label: '"I have to do everything myself. I can\'t really depend on anyone."', tags: ['independence_wound', 'abandonment_defense', 'self_reliance_trauma', 'help_forbidden'] },
          { value: 'too_much_not_enough', label: '"I am too much — or never enough."', tags: ['shame_wound', 'core_inadequacy', 'identity_wound', 'worthiness_issue'] },
          { value: 'never_works', label: '"Nothing ever truly works out for me."', tags: ['victim_pattern', 'hopelessness', 'resignation', 'sabotage_loyalty'] },
          { value: 'guard_up', label: '"If I let my guard down, something will go wrong."', tags: ['hypervigilance', 'control_pattern', 'anxiety_base', 'safety_wound'] },
        ],
      },
      {
        id: 'inner_critic',
        label: 'Your inner critic — the harshest voice inside — most often sounds like...',
        type: 'single',
        options: [
          { value: 'disappointed_parent', label: 'A disappointed parent — never quite satisfied', tags: ['superego_pattern', 'conditional_love_internalized', 'parent_wound'] },
          { value: 'fundamentally_flawed', label: '"There is something fundamentally wrong with you"', tags: ['shame_wound', 'core_defectiveness', 'self_rejection'] },
          { value: 'end_up_alone', label: '"You will always end up alone"', tags: ['abandonment_wound', 'attachment_fear', 'isolation_prophecy'] },
          { value: 'never_enough', label: '"Whatever you do, it will never be enough"', tags: ['perfectionism', 'inadequacy_drive', 'achievement_wound'] },
        ],
      },
      {
        id: 'coping_reach',
        label: 'When you feel emotional discomfort, what do you most reach for? (select all that apply)',
        type: 'multi',
        maxSelect: 8,
        options: [
          { value: 'food_comfort', label: 'Food — especially sugar, carbs, or something comforting', tags: ['emotional_eating', 'oral_fixation', 'comfort_seeking', 'addiction_food'] },
          { value: 'phone_scroll', label: 'My phone — scrolling, content, anything to distract', tags: ['digital_escape', 'avoidance_pattern', 'dopamine_seeking', 'addiction_tech'] },
          { value: 'work_busy', label: 'Work or staying extremely busy', tags: ['workaholism', 'productive_avoidance', 'addiction_doing', 'control_through_output'] },
          { value: 'substances', label: 'Alcohol, cannabis, or other substances', tags: ['substance_coping', 'numbing_pattern', 'escape_pattern', 'addiction_substances'] },
          { value: 'shopping', label: 'Shopping or spending money', tags: ['retail_therapy', 'reward_substitution', 'addiction_spending', 'control_substitution'] },
          { value: 'exercise_intensity', label: 'Exercise or physical intensity', tags: ['physical_escape', 'healthy_sublimation', 'body_control'] },
          { value: 'isolation', label: 'Isolating — shutting everything out', tags: ['withdrawal', 'freeze_response', 'shutdown_pattern', 'avoidant_coping'] },
          { value: 'seek_person', label: 'Calling or texting someone immediately', tags: ['external_regulation', 'anxious_attachment', 'co_regulation_dependent'] },
        ],
      },
      {
        id: 'mental_energy',
        label: 'Most of your mental energy goes toward...',
        type: 'single',
        options: [
          { value: 'replaying_past', label: 'Replaying past conversations or events', tags: ['rumination', 'unresolved_conflict', 'past_anchored', 'guilt_shame_loop'] },
          { value: 'worrying_future', label: 'Worrying about what could go wrong', tags: ['anxiety', 'hypervigilance', 'survival_mode', 'catastrophizing'] },
          { value: 'managing_perception', label: 'Managing how others see and think of me', tags: ['people_pleasing', 'image_management', 'shame_base', 'performance_identity'] },
          { value: 'problem_solving', label: 'Solving problems and staying in control', tags: ['intellectual_defense', 'control_pattern', 'avoidance_feeling'] },
        ],
      },
    ],
  },
  {
    title: 'Where You Come From',
    subtitle: 'De Dónde Vienes',
    icon: '☿',
    color: '#C9963C',
    description: 'We are the answer to questions our families never asked.',
    questions: [
      {
        id: 'family_emotional_rule',
        label: 'Growing up, the unspoken emotional rule in your home was...',
        type: 'single',
        options: [
          { value: 'stay_strong', label: '"Stay strong. Don\'t show weakness."', tags: ['emotional_suppression', 'stoic_family', 'vulnerability_forbidden', 'strength_as_survival'] },
          { value: 'keep_peace', label: '"Don\'t make waves. Keep the peace."', tags: ['conflict_avoidance', 'people_pleasing_learned', 'anger_forbidden', 'fawn_response_origin'] },
          { value: 'earn_place', label: '"You have to earn your place here."', tags: ['conditional_love_wound', 'performance_identity', 'worth_through_doing'] },
          { value: 'unpredictable', label: '"Things were unpredictable — I never knew what to expect"', tags: ['hypervigilance_learned', 'chaos_attachment', 'anxious_nervous_system_origin', 'safety_never_reliable'] },
        ],
      },
      {
        id: 'approval_sought',
        label: 'The person whose love or approval you worked hardest to earn as a child was...',
        type: 'single',
        options: [
          { value: 'mother', label: 'My mother', tags: ['mother_wound', 'feminine_wound', 'maternal_attachment_pattern'] },
          { value: 'father', label: 'My father', tags: ['father_wound', 'masculine_wound', 'paternal_attachment_pattern'] },
          { value: 'both', label: 'Both equally', tags: ['both_parents_wound', 'exhausted_child', 'hypervigilance_from_both'] },
          { value: 'neither', label: "Neither — I mostly learned to need no one", tags: ['emotional_orphan', 'self_sufficiency_defense', 'disconnection_early', 'attachment_shutdown'] },
        ],
      },
      {
        id: 'family_repeating',
        label: 'A pattern that seems to repeat across your family — appearing in different forms, in different people — is...',
        type: 'single',
        options: [
          { value: 'relationship_loss', label: 'Relationships that break down or people who leave', tags: ['abandonment_transgenerational', 'loss_loyalty', 'attachment_wound_inherited'] },
          { value: 'financial_struggle', label: 'Financial struggle or "never quite enough"', tags: ['scarcity_transgenerational', 'money_wound', 'survival_programming'] },
          { value: 'illness_fatigue', label: 'Illness, unexplained pain, or chronic fatigue', tags: ['somatic_transgenerational', 'body_wound_inherited', 'stress_in_dna'] },
          { value: 'emotional_distance', label: 'Emotional distance — love was there, but closeness was hard', tags: ['intimacy_avoidance_inherited', 'emotional_unavailability_pattern'] },
          { value: 'success_sabotage', label: 'Success that never lasts, or something always goes wrong just when things get good', tags: ['success_wound_transgenerational', 'loyalty_to_suffering', 'sabotage_inherited'] },
        ],
      },
      {
        id: 'family_unspoken',
        label: 'If there is one unspoken theme that runs beneath the surface of your family — the thing no one names directly — it would be...',
        type: 'single',
        options: [
          { value: 'shame_secret', label: 'Shame — about who someone was, what happened, or what was hidden', tags: ['family_shame', 'exclusion_pattern', 'secret_wound', 'forbidden_truth'] },
          { value: 'unprocessed_loss', label: 'Loss — grief that was never really given space', tags: ['unmourned_loss', 'grief_transgenerational', 'mourning_forbidden'] },
          { value: 'contained_anger', label: 'Anger — that had no safe place to go', tags: ['suppressed_rage_inherited', 'anger_forbidden_pattern', 'injustice_unnamed'] },
          { value: 'inherited_fear', label: 'Fear — that life is dangerous, that there is never truly enough', tags: ['scarcity_fear_inherited', 'survival_transmission', 'anxiety_inherited'] },
        ],
      },
    ],
  },
  {
    title: 'What You Reach For',
    subtitle: 'Lo Que Buscas',
    icon: '◗',
    color: '#3DC898',
    description: 'What we avoid and what we crave reveals the wound underneath.',
    questions: [
      {
        id: 'deepest_need',
        label: 'What you most need — but find hardest to ask for — is...',
        type: 'single',
        options: [
          { value: 'be_seen', label: 'To be truly seen — not the version I perform, but the real one', tags: ['visibility_need', 'recognition_wound', 'performance_exhaustion', 'authenticity_hunger'] },
          { value: 'feel_safe', label: 'To feel safe enough to be vulnerable with someone', tags: ['safety_need', 'trust_wound', 'vulnerability_longing', 'protection_hunger'] },
          { value: 'be_chosen', label: 'To be chosen — consistently, without having to earn it first', tags: ['belonging_need', 'abandonment_wound', 'unconditional_love_hunger'] },
          { value: 'permission_to_rest', label: 'Permission to just exist without constantly producing or performing', tags: ['performance_fatigue', 'identity_wound', 'worth_through_doing', 'rest_as_threat'] },
        ],
      },
      {
        id: 'what_you_avoid',
        label: 'What you avoid — almost at any cost — is...',
        type: 'single',
        options: [
          { value: 'conflict_disappoint', label: 'Conflict or disappointing others', tags: ['people_pleasing', 'anger_avoidance', 'fawn_response', 'approval_dependency'] },
          { value: 'seen_as_weak', label: 'Being seen as weak, needy, or out of control', tags: ['vulnerability_fear', 'shame_wound', 'strength_as_armor', 'mask_wearing'] },
          { value: 'being_left', label: 'Being left or being truly alone', tags: ['abandonment_fear', 'anxious_attachment', 'aloneness_terror'] },
          { value: 'losing_control', label: "Situations where I'm not in control of what happens", tags: ['control_pattern', 'anxiety_driven', 'trust_wound', 'chaos_fear'] },
        ],
      },
      {
        id: 'feels_alive',
        label: 'What makes you feel most alive — even briefly?',
        type: 'single',
        options: [
          { value: 'deep_connection', label: 'Deep, real conversations where I feel truly understood', tags: ['connection_need', 'depth_value', 'heart_awakening'] },
          { value: 'creating', label: 'Creating something — making, building, expressing', tags: ['creative_soul', 'sacral_energy', 'expression_hunger'] },
          { value: 'nature_silence', label: 'Being in nature, away from demands', tags: ['nervous_system_depletion', 'restoration_need', 'overstimulated'] },
          { value: 'helping_purpose', label: 'Contributing to something that actually matters', tags: ['purpose_driven', 'service_soul', 'meaning_seeking'] },
        ],
      },
    ],
  },
  {
    title: 'What You\'re Here For',
    subtitle: 'Para Qué Estás Aquí',
    icon: '◇',
    color: '#E4B85A',
    description: 'The soul always knows. It\'s been waiting for you to listen.',
    questions: [
      {
        id: 'life_missing',
        label: 'When you imagine the life you actually want — not the one you\'re supposed to want — what feels most missing?',
        type: 'single',
        options: [
          { value: 'inner_peace', label: 'Peace — to stop running from my own thoughts', tags: ['internal_work_ready', 'anxiety_exhaustion', 'mind_silence_need'] },
          { value: 'real_love', label: 'Real love and belonging — to stop performing in relationships', tags: ['heart_work_ready', 'relationship_healing', 'authentic_connection_hunger'] },
          { value: 'freedom', label: 'Freedom — to be fully myself without apology', tags: ['identity_work_ready', 'authenticity_hunger', 'performance_liberation'] },
          { value: 'real_purpose', label: 'A purpose that actually feels like mine, not what I was told to want', tags: ['purpose_work_ready', 'meaning_seeking', 'externally_defined_life'] },
        ],
      },
      {
        id: 'afraid_to_become',
        label: 'The version of yourself you are most afraid of becoming is...',
        type: 'single',
        options: [
          { value: 'like_mother', label: 'My mother', tags: ['mother_identification_fear', 'feminine_wound_active', 'maternal_pattern_rejection'] },
          { value: 'like_father', label: 'My father', tags: ['father_identification_fear', 'masculine_wound_active', 'paternal_pattern_rejection'] },
          { value: 'alone_forever', label: 'Someone who ends up truly alone', tags: ['abandonment_deepest_fear', 'aloneness_terror_core'] },
          { value: 'never_enough', label: 'Someone who tries everything but never becomes enough', tags: ['shame_deepest_fear', 'inadequacy_core', 'futility_terror'] },
        ],
      },
      {
        id: 'real_reason_here',
        label: 'What I most want someone to finally understand about me — something I rarely get to say — is...',
        type: 'text',
        placeholder: 'The truth about you that most people never get to see...',
      },
    ],
  },
]

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
    stepLabel: 'Part',
    of: 'of',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'your@email.com',
    emailOptional: 'Optional: receive your Soul Reading by email',
    submitBtn: 'Reveal My Reading ☿',
    generating: 'Reading your soul...',
    error: 'Could not generate your reading. Please try again.',
    connectionError: 'Connection error. Please try again.',
    emailConfirm: '✦ Your reading has been sent to',
    multiSelectHint: 'Select up to',
    multiSelectHint2: '',
    steps: assessmentSteps,

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
