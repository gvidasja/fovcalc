import { Dispatch, useCallback, useEffect, useRef, useState } from 'react'

export function DurationInput({
  label,
  value: [value, onChange],
}: {
  label: string
  value: [number, Dispatch<number>]
}) {
  const [[hrs, min, sec], set] = useState([0, 0, 0])
  const [_value, _setValue] = useState(value)
  const $input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    set([
      Math.floor(_value / 10000),
      Math.floor((_value % 10000) / 100),
      _value % 100,
    ])
  }, [_value])

  useEffect(() => {
    onChange(hrs * 3600 + min * 60 + sec)
  }, [hrs, min, sec])

  const onRecalc = useCallback(() => {}, [_value])

  return (
    <div>
      <span className="time-input" onClick={() => $input.current?.focus()}>
        {pad(hrs)}:{pad(min)}:{pad(sec)}
        <input
          value={_value}
          onBlur={onRecalc}
          ref={$input}
          type="number"
          onChange={e => _setValue(parseInt(e.target.value) || 0)}
        />
      </span>
    </div>
  )
}

function pad(n: number): string {
  return n.toFixed(0).padStart(2, '0')
}
