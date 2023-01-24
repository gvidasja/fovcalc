import { points } from './App'

export function CarDisplay({
  monitorWidth,
  monitorHeight,
  verticalFOV,
  horizontalFOV,
  distance,
}: { 
  monitorWidth: number,
  monitorHeight: number,
  verticalFOV: number,
  horizontalFOV: number,
  distance: number
}) {
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
          <circle
            cx={0}
            cy={0}
            r={headRadius}
            fill="none"
            stroke="black"
            strokeWidth={1}
          />
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
