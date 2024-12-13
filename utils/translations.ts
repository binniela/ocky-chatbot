export const translations = {
    English: {
      welcome: 'Welcome! Choose your preferred language',
      selectPlan: 'Select Your Medicare Plan',
      state: 'State',
      zipCode: 'ZIP Code',
      continue: 'Continue',
      choosePlan: 'Choose a plan',
      enterState: 'Enter your state',
      enterZipCode: 'Enter your ZIP code',
      commonQuestions: 'Common Questions about',
      typeMessage: 'Type your message here...',
      send: 'Send',
    },
    Spanish: {
      welcome: '¡Bienvenido! Elige tu idioma preferido',
      selectPlan: 'Selecciona tu Plan de Medicare',
      state: 'Estado',
      zipCode: 'Código Postal',
      continue: 'Continuar',
      choosePlan: 'Elige un plan',
      enterState: 'Ingresa tu estado',
      enterZipCode: 'Ingresa tu código postal',
      commonQuestions: 'Preguntas frecuentes sobre',
      typeMessage: 'Escribe tu mensaje aquí...',
      send: 'Enviar',
    },
    French: {
      welcome: 'Bienvenue ! Choisissez votre langue préférée',
      selectPlan: 'Sélectionnez votre plan Medicare',
      state: 'État',
      zipCode: 'Code postal',
      continue: 'Continuer',
      choosePlan: 'Choisissez un plan',
      enterState: 'Entrez votre état',
      enterZipCode: 'Entrez votre code postal',
      commonQuestions: 'Questions fréquentes sur',
      typeMessage: 'Tapez votre message ici...',
      send: 'Envoyer',
    }
  }
  
  export type Language = keyof typeof translations
  export type Translations = typeof translations[Language]