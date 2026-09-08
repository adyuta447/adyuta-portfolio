'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Illustration } from '@/components/atoms/illustration'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8">
          <Illustration src="/warning.svg" className="mx-auto mb-8 max-w-sm" />
          <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
          <p className="text-muted-foreground text-lg mb-2">
            An unexpected error occurred while loading this page.
          </p>
          {error.message && (
            <p className="text-sm text-muted-foreground font-mono mt-4 break-words">
              {error.message}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
