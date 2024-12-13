import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send, Paperclip, Mic } from 'lucide-react'
import type { Translations } from '@/utils/translations'

interface ChatInterfaceProps {
  initialQuestion: string
  translations: Translations
}

interface Message {
  content: string
  sender: 'user' | 'bot'
}

export function ChatInterface({ initialQuestion, translations }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    { content: initialQuestion, sender: 'user' },
    { content: "Thank you for your question. I'm here to help! How can I assist you further?", sender: 'bot' },
  ])
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, { content: input, sender: 'user' }])
      setInput('')
      // Simulate bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { content: "I'm processing your question. Give me a moment to find the best answer for you.", sender: 'bot' },
        ])
      }, 1000)
    }
  }

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3/4 p-3 rounded-lg ${
                message.sender === 'user' ? 'bg-[#2864ec] text-white' : 'bg-gray-100'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={translations.typeMessage}
            className="resize-none pr-20"
          />
          <div className="absolute right-2 bottom-2 flex gap-2">
            <Button 
              type="button" 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-gray-500 hover:text-[#2864ec]"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-gray-500 hover:text-[#2864ec]"
            >
              <Mic className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button type="submit" className="self-end bg-[#2864ec] hover:bg-[#2864ec]/90">
          <Send className="w-4 h-4 mr-2" />
          {translations.send}
        </Button>
      </form>
    </div>
  )
}