import { OptionBox } from "@/components/ui/option-box"
import type { Language, Translations } from "@/utils/translations"

interface LanguageSelectionProps {
  onSelect: (language: Language) => void
  selectedLanguage: Language | null
  translations: Translations
}

export function LanguageSelection({ onSelect, selectedLanguage, translations }: LanguageSelectionProps) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6">{translations.welcome}</h2>
      <div className="space-y-3">
        <OptionBox
          onClick={() => onSelect('English')}
          selected={selectedLanguage === 'English'}
        >
          🇺🇸 English
        </OptionBox>
        <OptionBox
          onClick={() => onSelect('Spanish')}
          selected={selectedLanguage === 'Spanish'}
        >
          🇪🇸 Español
        </OptionBox>
        <OptionBox
          onClick={() => onSelect('French')}
          selected={selectedLanguage === 'French'}
        >
          🇫🇷 Français
        </OptionBox>
      </div>
    </div>
  )
}