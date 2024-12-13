'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Chatbot = dynamic(() => import('@/components/chatbot').then(mod => mod.Chatbot), {
  ssr: false,
  loading: () => <div className="p-4">Loading Chatbot...</div>
})

export default function Home() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <main>
        <Chatbot />
      </main>
    </Suspense>
  )
}

