'use client'

import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const ClientOnly = dynamic(() => import('@/components/client-only'), { ssr: false })
const Chatbot = dynamic(() => import('@/components/chatbot').then(mod => mod.Chatbot), { ssr: false })

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert" className="p-4 bg-red-100 text-red-700 rounded-md">
      <p className="font-bold">Something went wrong:</p>
      <pre className="mt-2 text-sm">{error.message}</pre>
    </div>
  )
}

export function ClientWrapper() {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <ClientOnly>
          <Chatbot />
        </ClientOnly>
      </Suspense>
    </ErrorBoundary>
  )
}

