import React, { useMemo, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

const addZero = (num) => {
  const str = num.toString()
  return str.length > 1 ? str : `0${str}`
}
function Timer({ timerUpdate, id, completed, timer }) {
  const [timerRun, setTimerRun] = useState(true)

  const interval = useRef(null)

  useEffect(() => {
    interval.current = timerRun && !completed ? setInterval(() => timerUpdate(id), 1000) : null
    return () => {
      clearInterval(interval.current)
    }
  }, [timerRun])

  useEffect(() => {
    setTimerRun(!completed)
  }, [completed])

  const min = useMemo(() => addZero(new Date(timer).getMinutes()), [timer])
  const sec = useMemo(() => addZero(new Date(timer).getSeconds()), [timer])

  const buttons = completed ? null : (
    <>
      <button className="icon icon-play" type="button" aria-label="play-timer" onClick={() => setTimerRun(true)} />
      <button className="icon icon-pause" type="button" aria-label="pause-timer" onClick={() => setTimerRun(false)} />
    </>
  )

  return (
    <span className="description">
      {buttons}
      {`  ${min}:${sec}`}
    </span>
  )
}

Timer.propTypes = {
  timerUpdate: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
}

export default React.memo(Timer)
