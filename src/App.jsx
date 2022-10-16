import { useCallback, useState } from 'react'

const INCH_TO_CM = 2.54

function App() {
  const screenSize = useState(27)
  const distance = useState(60)
  const aspectRatio = useState(16 / 9)

  const [width, height] = calculateMonitor(screenSize[0], aspectRatio[0])
  const verticalFOV = fov(height, distance[0])
  const horizontalFOV = fov(width, distance[0])

  return (
    <div className="App">
      <NumberInput label="Screen size" unit='"' value={screenSize} />
      <NumberInput label="Distance" unit="cm" value={distance} />
      <Select label="Aspect ratio" value={aspectRatio}>
        <option value={16 / 9}>16:9</option>
        <option value={16 / 10}>16:10</option>
        <option value={21 / 9}>21:9</option>
      </Select>
      <div>
        Screen: {width.toFixed(2)}cm x {height.toFixed(2)}cm
      </div>
      <div>Vertical FOV: {verticalFOV.toFixed(2)}°</div>
      <div>Horizontal FOV: {horizontalFOV.toFixed(2)}°</div>
      <div>AC/ACC: {verticalFOV.toFixed(0)}</div>
      <div>rFactor 2: {verticalFOV.toFixed(0)}</div>
      <div>Automobilista 2: {horizontalFOV.toFixed(0)}</div>

      <CarDisplay
        monitorWidth={width}
        monitorHeight={height}
        verticalFOV={verticalFOV}
        horizontalFOV={horizontalFOV}
        distance={distance[0]}
      />
    </div>
  )
}

function CarDisplay({ monitorWidth, monitorHeight, verticalFOV, horizontalFOV, distance }) {
  const headRadius = 12

  return (
    <div style={{ padding: 12 }}>
      <svg overflow="visible" viewBox="0 0 250 250" width={500} height={500}>
        <polygon
          points={points([
            [0, 0],
            [463, 0],
            [463, 182],
            [0, 182],
          ])}
          fill="none"
          stroke="grey"
          strokeWidth={1}
        />
        <g transform="translate(200, 150)">
          <polygon
            points={points([
              [-distance - headRadius, -monitorWidth / 2],
              [-headRadius, 0],
              [-distance - headRadius, monitorWidth / 2],
            ])}
            stroke="tomato"
            strokeWidth="1"
            fill="none"
          />
          <circle cx={0} cy={0} r={headRadius} fill="none" stroke="black" strokeWidth={1} />
          <line
            x1={-distance - headRadius}
            y1={-monitorWidth / 2}
            x2={-distance - headRadius}
            y2={monitorWidth / 2}
            stroke="tomato"
            strokeWidth={2}
          />
        </g>
      </svg>
    </div>
  )
}

function Select({ label, value: [value, onChange], children }) {
  return (
    <div>
      <label>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}>
        {children}
      </select>
    </div>
  )
}

function NumberInput({ label, unit, value: [value, onChange] }) {
  const onKeyDown = useCallback(
    e => {
      if (e.key === 'ArrowDown') onChange(value - 1)
      if (e.key === 'ArrowUp') onChange(value + 1)
    },
    [value, onChange]
  )

  return (
    <div>
      <label>{label}</label>
      <input
        onKeyDown={onKeyDown}
        style={{ width: 30 }}
        pattern="\d*"
        value={isNaN(value) ? '' : value}
        onChange={e => onChange(parseInt(e.target.value))}
      />
      {unit}
    </div>
  )
}

function calculateMonitor(screenSize, aspectRatio) {
  return [
    INCH_TO_CM *
      aspectRatio *
      Math.sqrt((screenSize * screenSize) / (aspectRatio * aspectRatio + 1)),
    INCH_TO_CM * Math.sqrt((screenSize * screenSize) / (aspectRatio * aspectRatio + 1)),
  ]
}

function fov(width, distance) {
  return (180 / Math.PI) * Math.atan(width / 2 / distance) * 2
}

function points(points) {
  return points.map(x => x.join(',')).join(' ')
}

export default App
