import { useEffect, useState } from 'react'

export function useTypewriter(text: string, speedMs = 85) {
  const [len, setLen] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    setLen(0)
    setDone(false)
  }, [text])

  useEffect(() => {
    if (len >= text.length) {
      const t = window.setTimeout(() => setDone(true), 600)
      return () => window.clearTimeout(t)
    }
    const t = window.setTimeout(() => setLen((n) => n + 1), speedMs)
    return () => window.clearTimeout(t)
  }, [len, text, speedMs])

  return { display: text.slice(0, len), done }
}
