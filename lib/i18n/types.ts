export type AssessmentOption = {
  value: string
  label: string
  tags?: string[]
}

export type AssessmentQuestion = {
  id: string
  label: string
  subtext?: string
  type: 'single' | 'multi' | 'text'
  options?: AssessmentOption[]
  placeholder?: string
  maxSelect?: number
}

export type AssessmentStep = {
  title: string
  subtitle: string
  icon: string
  color: string
  description: string
  questions: AssessmentQuestion[]
}
