import { Dispatch, ReactNode } from 'react'

export function Select({
  label,
  value: [value, onChange],
  children,
}: {
  label: string
  value: [any, Dispatch<any>]
  children: ReactNode
}) {
  return (
    <>
      <label>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}>
        {children}
      </select>
    </>
  )
}
