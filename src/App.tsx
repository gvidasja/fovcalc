import styles from './App.module.css'
import { DurationInput } from './DurationInput'
import { NumberInput } from './NumberInput'
import { Select } from './Select'
import { useLocalStorage } from './useLocalStorage'

const INCH_TO_CM = 2.54

function App() {
  const screenSize = useLocalStorage('screenSize', 27)
  const distance = useLocalStorage('distance', 60)
  const aspectRatio = useLocalStorage('aspectRatio', 16 / 9)
  const raceLength = useLocalStorage('raceLength', 20 * 60)
  const lapLength = useLocalStorage('lapLength', 89)

  const [width, height] = calculateMonitor(screenSize[0], aspectRatio[0])
  const verticalFOV = fov(height, distance[0])
  const horizontalFOV = fov(width, distance[0])

  return (
    <div className={styles.App}>
      <div className="grid">
        <div className="row">
          <h2>FOV</h2>
        </div>
        <div className="row">
          <NumberInput label="Screen size" unit='"' value={screenSize} />
        </div>
        <div className="row">
          <NumberInput label="Distance" unit="cm" value={distance} />
        </div>
        <div className="row">
          <Select label="Aspect ratio" value={aspectRatio}>
            <option value={16 / 9}>16:9</option>
            <option value={16 / 10}>16:10</option>
            <option value={21 / 9}>21:9</option>
          </Select>
        </div>
        <div className="row">
          <span>Screen:</span>
          <span>
            {width.toFixed(2)}cm x {height.toFixed(2)}cm
          </span>
        </div>
        <div className="row">
          <span>Vertical FOV:</span>
          <span>{verticalFOV.toFixed(2)}°</span>
        </div>
        <div className="row">
          <span>Horizontal FOV:</span>
          <span>{horizontalFOV.toFixed(2)}°</span>
        </div>
        <div className="row">
          <span>AC/ACC:</span>
          <span>{verticalFOV.toFixed(0)}</span>
        </div>
        <div className="row">
          <span>rFactor 2:</span>
          <span>{verticalFOV.toFixed(0)}</span>
        </div>
        <div className="row">
          <span>Automobilista 2:</span>
          <span>{horizontalFOV.toFixed(0)}</span>
        </div>
      </div>

      <div className="grid">
        <div className="row">
          <h2>Fuel</h2>
        </div>
        <div className="row">
          <DurationInput label="Race length" value={raceLength} />
        </div>
        <div className="row">
          <DurationInput label="Lap length" value={lapLength} />
        </div>
        <div className="row">
          <div>Laps: {Math.ceil(raceLength[0] / lapLength[0])}</div>
        </div>
      </div>

      {/* <CarDisplay
        monitorWidth={width}
        monitorHeight={height}
        verticalFOV={verticalFOV}
        horizontalFOV={horizontalFOV}
        distance={distance[0]}
      /> */}
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
