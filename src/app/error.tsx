'use client' // Error components must be Client Components
export default function Error({
    error,
    // reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) {
    return (<p>{error.message}</p>)
}