import {
  useState
} from 'react'
import { CarDisplay } from './CarDisplay'
import { DurationInput } from './DurationInput'
import { NumberInput } from './NumberInput'
import { Select } from './Select'

const INCH_TO_CM = 2.54

function App() {
  const screenSize = useState(27)
  const distance = useState(60)
  const aspectRatio = useState(16 / 9)

  const [width, height] = calculateMonitor(screenSize[0], aspectRatio[0])
  const verticalFOV = fov(height, distance[0])
  const horizontalFOV = fov(width, distance[0])

  const raceLength = useState(20 * 60)
  const lapLength = useState(89)

  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        <div>
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
        </div>

        <div>
          <DurationInput label="Race length" value={raceLength} />
          <DurationInput label="Lap length" value={lapLength} />
          <div>Laps: {Math.ceil(raceLength[0] / lapLength[0])}</div>
        </div>
      </div>

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

function calculateMonitor(screenSize: number, aspectRatio: number) {
  return [
    INCH_TO_CM *
      aspectRatio *
      Math.sqrt((screenSize * screenSize) / (aspectRatio * aspectRatio + 1)),
    INCH_TO_CM *
      Math.sqrt((screenSize * screenSize) / (aspectRatio * aspectRatio + 1)),
  ]
}

function fov(width: number, distance: number) {
  return (180 / Math.PI) * Math.atan(width / 2 / distance) * 2
}

export function points(points: [number, number][]) {
  return points.map(x => x.join(',')).join(' ')
}

export default App
