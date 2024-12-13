'use client'

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Logo } from './logo'
import { Button } from '@/components/ui/button'
import { translations, type Language } from '@/utils/translations'
import { Check, Globe, FileText, HelpCircle, MessageCircle } from 'lucide-react'
import { ErrorBoundary } from 'react-error-boundary'

const LanguageSelection = dynamic(() => import('./steps/language-selection').then(mod => mod.LanguageSelection), { ssr: false })
const PlanSelection = dynamic(() => import('./steps/plan-selection').then(mod => mod.PlanSelection), { ssr: false })
const ExampleQuestions = dynamic(() => import('./steps/example-questions').then(mod => mod.ExampleQuestions), { ssr: false })
const ChatInterface = dynamic(() => import('./steps/chat-interface').then(mod => mod.ChatInterface), { ssr: false })

type Plan = 'Medicare Advantage' | 'Medicare Supplement' | 'Prescription Drug Plan'

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div role="alert" className="p-4 bg-red-100 text-red-700 rounded-md">
      <p className="font-bold">Something went wrong:</p>
      <pre className="mt-2 text-sm">{error.message}</pre>
      <button onClick={resetErrorBoundary} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Try again</button>
    </div>
  )
}

export function Chatbot() {
  const [language, setLanguage] = useState<Language | null>(null)
  const [plan, setPlan] = useState<Plan | null>(null)
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null)

  const planRef = useRef<HTMLDivElement>(null)
  const questionsRef = useRef<HTMLDivElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)

  const [t, setT] = useState(translations['English'])

  useEffect(() => {
    setT(translations[language || 'English'])
  }, [language])

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang)
  }

  const handlePlanSubmit = (selectedPlan: Plan, selectedState: string, selectedZipCode: string) => {
    setPlan(selectedPlan)
    setState(selectedState)
    setZipCode(selectedZipCode)
  }

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestion(question)
  }

  useEffect(() => {
    if (language && planRef.current) {
      planRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [language])

  useEffect(() => {
    if (plan && questionsRef.current) {
      questionsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [plan])

  useEffect(() => {
    if (selectedQuestion && chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [selectedQuestion])

  const steps = [
    { id: 1, title: 'Language', completed: !!language, icon: Globe },
    { id: 2, title: t.selectPlan, completed: !!plan, icon: FileText },
    { id: 3, title: t.commonQuestions, completed: !!selectedQuestion, icon: HelpCircle },
    { id: 4, title: 'Chat', completed: false, icon: MessageCircle },
  ]

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {
      setLanguage(null)
      setPlan(null)
      setState('')
      setZipCode('')
      setSelectedQuestion(null)
    }}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="w-full bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Logo />
            <Button 
              variant="secondary" 
              className="bg-[#2864ec] text-white hover:bg-[#2864ec]/90 rounded-full px-6"
            >
              Sign in
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mt-8 flex gap-12">
              {/* Progress Indicators */}
              <div className="w-80 flex-shrink-0">
                <div className="sticky top-8">
                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-gray-200" />
                    
                    {steps.map((step, index) => (
                      <div key={step.id} className="flex items-center mb-8">
                        <div className={`relative w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-colors ${
                          step.completed 
                            ? 'bg-[#2864ec] text-white' 
                            : 'bg-white border-2 border-gray-200'
                        }`}>
                          {step.completed ? (
                            <Check className="w-6 h-6" />
                          ) : (
                            <step.icon className={`w-6 h-6 ${
                              step.id === (selectedQuestion ? 4 : plan ? 3 : language ? 2 : 1) 
                                ? 'text-[#2864ec]' 
                                : 'text-gray-400'
                            }`} />
                          )}
                        </div>
                        <span className={`text-lg font-medium ${
                          step.completed || step.id === (selectedQuestion ? 4 : plan ? 3 : language ? 2 : 1)
                            ? 'text-[#2864ec]' 
                            : 'text-gray-600'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 relative">
                  {/* Horizontal divider line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gray-100" />
                  <LanguageSelection 
                    onSelect={handleLanguageSelect}
                    selectedLanguage={language}
                    translations={t}
                  />
                </div>

                {language && (
                  <div ref={planRef} className="bg-white rounded-lg shadow-md p-6 mb-6 relative">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gray-100" />
                    <PlanSelection 
                      onSubmit={handlePlanSubmit}
                      selectedPlan={plan}
                      translations={t}
                    />
                  </div>
                )}

                {plan && (
                  <div ref={questionsRef} className="bg-white rounded-lg shadow-md p-6 mb-6 relative">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gray-100" />
                    <ExampleQuestions
                      plan={plan}
                      onSelect={handleQuestionSelect}
                      selectedQuestion={selectedQuestion}
                      translations={t}
                    />
                  </div>
                )}

                {selectedQuestion && (
                  <div ref={chatRef} className="bg-white rounded-lg shadow-md p-6 mb-6 relative">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gray-100" />
                    <ChatInterface 
                      initialQuestion={selectedQuestion}
                      translations={t}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}

