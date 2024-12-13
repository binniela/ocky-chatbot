import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { OptionBox } from "@/components/ui/option-box"
import type { Translations } from '@/utils/translations'

type Plan = 'Medicare Advantage' | 'Medicare Supplement' | 'Prescription Drug Plan'

interface PlanSelectionProps {
  onSubmit: (plan: Plan, state: string, zipCode: string) => void
  selectedPlan: Plan | null
  translations: Translations
}

export function PlanSelection({ onSubmit, selectedPlan, translations }: PlanSelectionProps) {
  const [plan, setPlan] = useState<Plan | null>(selectedPlan)
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (plan && state && zipCode) {
      onSubmit(plan, state, zipCode)
      setIsSubmitted(true)
    }
  }

  const handleEdit = () => {
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return (
      <div className="animate-fade-in">
        <h2 className="text-2xl font-semibold mb-6">{translations.selectPlan}</h2>
        <p className="mb-4">Selected plan: {plan}</p>
        <p className="mb-4">State: {state}</p>
        <p className="mb-4">ZIP Code: {zipCode}</p>
        <Button onClick={handleEdit}>Edit</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6">{translations.selectPlan}</h2>
      <div className="space-y-6">
        <div className="space-y-3">
          <OptionBox
            onClick={() => setPlan('Medicare Advantage')}
            selected={plan === 'Medicare Advantage'}
            type="button"
          >
            Medicare Advantage
          </OptionBox>
          <OptionBox
            onClick={() => setPlan('Medicare Supplement')}
            selected={plan === 'Medicare Supplement'}
            type="button"
          >
            Medicare Supplement
          </OptionBox>
          <OptionBox
            onClick={() => setPlan('Prescription Drug Plan')}
            selected={plan === 'Prescription Drug Plan'}
            type="button"
          >
            Prescription Drug Plan
          </OptionBox>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="state">{translations.state}</Label>
            <Input
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder={translations.enterState}
            />
          </div>
          <div>
            <Label htmlFor="zipCode">{translations.zipCode}</Label>
            <Input
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder={translations.enterZipCode}
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-[#2864ec] hover:bg-[#2864ec]/90" 
          disabled={!plan || !state || !zipCode}
        >
          {translations.continue}
        </Button>
      </div>
    </form>
  )
}

