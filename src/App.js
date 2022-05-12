import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import './App.css'

const actionTypes = {
  INCREMENT_BREAK_LENGTH: 'INCREMENT_BREAK_LENGTH',
  DECREMENT_BREAK_LENGTH: 'DECREMENT_BREAK_LENGTH',
  INCREMENT_SESSION_LENGTH: 'INCREMENT_SESSION_LENGTH',
  DECREMENT_SESSION_LENGTH: 'DECREMENT_SESSION_LENGTH',
  DECREMENT_TIMER: 'DECREMENT_TIMER',
  START_NEW_TIMER: 'START_NEW_TIMER',
  RESET_TIMER: 'RESET_TIMER',
  ACTIVATE_TIMER: 'ACTIVATE_TIMER',
  DEACTIVATE_TIMER: 'DEACTIVATE_TIMER',
}

const INITIAL_STATE = {
  breakLength: 5,
  sessionLength: 25,
  timerLabel: 'Session',
  timer: 1500,
  isTimerActive: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.DECREMENT_BREAK_LENGTH:
      if (state.breakLength > 1)
        return { ...state, breakLength: state.breakLength - 1 }

      return state

    case actionTypes.INCREMENT_BREAK_LENGTH:
      if (state.breakLength < 60)
        return { ...state, breakLength: state.breakLength + 1 }

      return state

    case actionTypes.DECREMENT_SESSION_LENGTH:
      if (state.sessionLength > 1)
        return { ...state, sessionLength: state.sessionLength - 1 }

      return state

    case actionTypes.INCREMENT_SESSION_LENGTH:
      if (state.sessionLength < 60)
        return { ...state, sessionLength: state.sessionLength + 1 }

      return state

    case actionTypes.DECREMENT_TIMER:
      return { ...state, timer: state.timer - 1 }

    case actionTypes.START_NEW_TIMER:
      if (state.timerLabel === 'Session') {
        return {
          ...state,
          timerLabel: 'Break',
          timer: state.breakLength * 60,
        }
      }

      if (state.timerLabel === 'Break') {
        return {
          ...state,
          timerLabel: 'Session',
          timer: state.sessionLength * 60,
        }
      }

      return state

    case actionTypes.RESET_TIMER:
      return { ...INITIAL_STATE }

    case actionTypes.ACTIVATE_TIMER:
      return { ...state, isTimerActive: true }

    case actionTypes.DEACTIVATE_TIMER:
      return { ...state, isTimerActive: false }

    default:
      break
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const audioElRef = useRef()
  const intervalRef = useRef()

  const interval = useCallback(
    () =>
      setInterval(() => {
        dispatch({ type: actionTypes.DECREMENT_TIMER })
      }, 1000),
    []
  )

  useEffect(() => {
    if (state.timer === 0 && state.timerLabel === 'Session')
      audioElRef.current.play()

    if (state.timer === 0) {
      dispatch({ type: actionTypes.START_NEW_TIMER })
    }
  }, [state.timer, state.timerLabel])

  function resetClickHandler() {
    clearInterval(intervalRef.current)
    dispatch({ type: actionTypes.RESET_TIMER })
  }

  function togglePlayingHandler() {
    if (!state.isTimerActive) {
      intervalRef.current = interval()
      dispatch({ type: actionTypes.ACTIVATE_TIMER })
    } else {
      clearInterval(intervalRef.current)
      dispatch({ type: actionTypes.DEACTIVATE_TIMER })
    }
  }

  function secondsToMinutesString(num) {
    const minutes = String(Math.floor(num / 60))
    const seconds = String(num % 60)

    const minutesStr = minutes.length === 1 ? `0${minutes}` : minutes
    const secondsStr = seconds.length === 1 ? `0${seconds}` : seconds

    return `${minutesStr}:${secondsStr}`
  }

  function adjustClock(dispatcher) {
    if (state.isTimerActive) return

    clearInterval(intervalRef.current)
    dispatcher()
  }

  const { breakLength, sessionLength, timerLabel, timer } = state
  return (
    <div className="app">
      <h1>25+5 Clock</h1>
      <div className="clock-options">
        <div className="clock-option">
          <h2 id="break-label">Break Length</h2>
          <div className="number-control">
            <button
              onClick={() =>
                adjustClock(() =>
                  dispatch({ type: actionTypes.DECREMENT_BREAK_LENGTH })
                )
              }
              id="break-decrement"
            >
              -
            </button>
            <span id="break-length">{breakLength}</span>
            <button
              onClick={() =>
                adjustClock(() =>
                  dispatch({ type: actionTypes.INCREMENT_BREAK_LENGTH })
                )
              }
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
              onClick={() =>
                adjustClock(() =>
                  dispatch({ type: actionTypes.DECREMENT_SESSION_LENGTH })
                )
              }
              id="session-decrement"
            >
              -
            </button>
            <span id="session-length">{sessionLength}</span>
            <button
              onClick={() =>
                adjustClock(() =>
                  dispatch({ type: actionTypes.INCREMENT_SESSION_LENGTH })
                )
              }
              id="session-increment"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="clock">
        <h2 id="timer-label">{timerLabel}</h2>
        <p id="time-left">{secondsToMinutesString(timer)}</p>
        <div className="clock-controls">
          <button onClick={togglePlayingHandler} id="start_stop">
            Start/Stop
          </button>
          <button onClick={resetClickHandler} id="reset">
            Reset
          </button>
          <audio
            ref={audioElRef}
            id="beep"
            src="https://assets.mixkit.co/sfx/download/mixkit-repeating-arcade-beep-1084.wav"
          ></audio>
        </div>
      </div>
    </div>
  )
}

export default App
