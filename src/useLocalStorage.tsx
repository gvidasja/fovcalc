import { Dispatch, useEffect, useState } from 'react'

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, Dispatch<T>] {
  const [v, set] = useState<T>(() =>
    tryParseJSON(localStorage.getItem(key), defaultValue)
  )
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(v))
  }, [v])

  return [v, set]
}
function tryParseJSON<T>(json: string | null, defaultValue: T): T {
  if (!json) {
    return defaultValue
  }

  try {
    const v = JSON.parse(json)
    return (v === null || v === undefined) ? defaultValue : v
  } catch {
    return defaultValue
  }
}
