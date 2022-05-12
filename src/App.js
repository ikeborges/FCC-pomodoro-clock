import './App.css'

function App() {
  return (
    <div className="app">
      <h1 className="app-title">25+5 Clock</h1>
      <div className="clock-options">
        <div className="clock-option">
          <h2 id="break-label">Break Length</h2>
          <div className="number-control">
            <button id="break-decrement" className="decrease">
              -
            </button>
            <span id="break-length">5</span>
            <button id="break-increment" className="increse">
              +
            </button>
          </div>
        </div>
        <div className="clock-option">
          <h2 id="session-label">Session Length</h2>
          <div className="number-control">
            <button id="session-decrement" className="decrease">
              -
            </button>
            <span id="session-length">25</span>
            <button id="session-increment" className="increse">
              +
            </button>
          </div>
        </div>
      </div>
      <div className="clock">
        <h2 id="timer-label">Session</h2>
        <p id="time-left">25:00</p> {/* Note the format MM:SS */}
        <div className="clock-controls">
          <button id="start_stop" className="clock-controls--start">
            Start/Stop
          </button>
          <button id="reset" className="clock-controls--reset">
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
