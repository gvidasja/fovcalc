import { Dispatch, KeyboardEvent, useCallback } from 'react'

export function NumberInput({
  label,
  unit,
  value: [value, onChange],
}: {
  label: string
  unit: string
  value: [number, Dispatch<number>]
}) {
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') onChange(value - 1)
      if (e.key === 'ArrowUp') onChange(value + 1)
    },
    [value, onChange]
  )

  return (
    <>
      <label>{label}</label>
      <span>
        <input
          onKeyDown={onKeyDown}
          style={{ width: 30 }}
          pattern="\d*"
          value={isNaN(value) ? '' : value}
          onChange={e => onChange(parseInt(e.target.value))}
        />
        {unit}
      </span>
    </>
  )
}
