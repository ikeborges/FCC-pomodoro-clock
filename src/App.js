import { useState } from 'react'
import './App.css'

function useClockOptionLength(startingValue) {
  const [value, setValue] = useState(startingValue)

  function setClockOptionLength(newLength) {
    if (newLength > 0 && newLength < 60) setValue(newLength)
  }

  return [value, setClockOptionLength]
}

function App() {
  const [breakLength, setBreakLength] = useClockOptionLength(5)
  const [sessionLength, setSessionLength] = useClockOptionLength(25)

  function resetClickHandler() {}

  function togglePlayingHandler() {}

  return (
    <div className="app">
      <h1>25+5 Clock</h1>
      <div className="clock-options">
        <div className="clock-option">
          <h2 id="break-label">Break Length</h2>
          <div className="number-control">
            <button
              onClick={() => setBreakLength(breakLength - 1)}
              id="break-decrement"
            >
              -
            </button>
            <span id="break-length">{breakLength}</span>
            <button
              onClick={() => setBreakLength(breakLength + 1)}
              id="break-increment"
            >
              +
            </button>
          </div>
        </div>
        <div className="clock-option">
          <h2 id="session-label">Session Length</h2>
          <div className="number-control">
            <button
              onClick={() => setSessionLength(sessionLength - 1)}
              id="session-decrement"
              className="decrease"
            >
              -
            </button>
            <span id="session-length">{sessionLength}</span>
            <button
              onClick={() => setSessionLength(sessionLength + 1)}
              id="session-increment"
              className="increse"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="clock">
        <h2 id="timer-label">Session</h2>
        <p id="time-left">25:00</p> {/* Note the format MM:SS */}
        <div className="clock-controls">
          <button onClick={togglePlayingHandler} id="start_stop">
            Start/Stop
          </button>
          <button onClick={resetClickHandler} id="reset">
            Reset
          </button>
          <audio
            id="beep"
            loop
            src="https://assets.mixkit.co/sfx/download/mixkit-repeating-arcade-beep-1084.wav"
          ></audio>
        </div>
      </div>
    </div>
  )
}

export default App
