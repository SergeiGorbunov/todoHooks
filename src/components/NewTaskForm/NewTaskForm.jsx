import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

function formatTime(value) {
  return Math.min(+value.replace(/[^+\d]/g, ''), 59)
}

function NewTaskForm({ addTask }) {
  const [inputValue, setInputValue] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const inputRef = useRef()

  const submitHandler = (e) => {
    e.preventDefault()
    addTask(inputValue, +min || 0, +sec || 0)
    setInputValue('')
    setMin('')
    setSec('')
    inputRef.current.focus()
  }

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <form className="new-todo-form" onSubmit={submitHandler}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        ref={inputRef}
        required
        pattern="^[^\s][a-zA-Zа-яА-Я\s]*$"
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        value={min}
        onChange={(e) => setMin(formatTime(e.target.value))}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        value={sec}
        onChange={(e) => setSec(formatTime(e.target.value))}
      />
      <input className="hidden" type="submit" />
    </form>
  )
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
}

export default React.memo(NewTaskForm)
