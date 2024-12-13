import { OptionBox } from "@/components/ui/option-box"
import type { Translations } from '@/utils/translations'

type Plan = 'Medicare Advantage' | 'Medicare Supplement' | 'Prescription Drug Plan'

interface ExampleQuestionsProps {
  plan: Plan
  onSelect: (question: string) => void
  selectedQuestion: string | null
  translations: Translations
}

export function ExampleQuestions({ plan, onSelect, selectedQuestion, translations }: ExampleQuestionsProps) {
  const questions = {
    'Medicare Advantage': [
      'What are the benefits of Medicare Advantage plans?',
      'How do I enroll in a Medicare Advantage plan?',
      'Can I switch from Original Medicare to Medicare Advantage?',
    ],
    'Medicare Supplement': [
      'What does a Medicare Supplement plan cover?',
      'How do Medicare Supplement plans work with Original Medicare?',
      'Can I change my Medicare Supplement plan?',
    ],
    'Prescription Drug Plan': [
      'How do I choose the right Prescription Drug Plan?',
      'What is the Medicare Part D coverage gap?',
      'Can I get help paying for my prescription drugs?',
    ],
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6">
        {translations.commonQuestions} {plan}
      </h2>
      <div className="space-y-3">
        {questions[plan].map((question, index) => (
          <OptionBox
            key={index}
            onClick={() => onSelect(question)}
            selected={selectedQuestion === question}
          >
            {question}
          </OptionBox>
        ))}
      </div>
    </div>
  )
}