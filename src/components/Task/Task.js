import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

function Task({
  id,
  isCompleted,
  isEditing,
  inputValue,
  onDelite,
  toggleFlagById,
  inputHandler,
  editSubmit,
  description,
  children,
}) {
  const inputRef = useRef()

  const onSubmitHandler = (e) => {
    e.preventDefault()
    editSubmit(id, inputValue)
    toggleFlagById(id, 'isEditing')
  }

  const keyDownHandler = (e) => {
    if (e.key === 'Escape') {
      toggleFlagById(id, 'isEditing')
      inputHandler(id, description)
    }
  }

  useEffect(() => {
    if (isEditing) inputRef.current.focus()
  }, [isEditing])

  const taskInput = isEditing ? (
    <form onSubmit={(e) => onSubmitHandler(e)}>
      <input
        type="text"
        className="edit"
        value={inputValue}
        required
        onChange={(e) => inputHandler(id, e.target.value)}
        onKeyDown={(e) => keyDownHandler(e)}
        ref={inputRef}
      />
    </form>
  ) : (
    ''
  )

  const htmlLabel = `task-${id}`

  const completed = isCompleted ? 'completed' : ''
  const taskClass = isEditing ? 'editing' : completed

  return (
    <li className={taskClass}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={isCompleted}
          onChange={() => toggleFlagById(id, 'isCompleted')}
          id={htmlLabel}
        />
        <label htmlFor={htmlLabel}>{children}</label>
        <button
          className="icon icon-edit"
          onClick={() => toggleFlagById(id, 'isEditing')}
          type="button"
          aria-label="edit"
        />
        <button className="icon icon-destroy" onClick={() => onDelite(id)} type="button" aria-label="delite" />
      </div>
      {taskInput}
    </li>
  )
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onDelite: PropTypes.func.isRequired,
  toggleFlagById: PropTypes.func.isRequired,
  inputHandler: PropTypes.func.isRequired,
  editSubmit: PropTypes.func.isRequired,
}

const areEqual = (prevProps, nextProps) =>
  prevProps.description === nextProps.description &&
  prevProps.inputValue === nextProps.inputValue &&
  prevProps.isCompleted === nextProps.isCompleted &&
  prevProps.isEditing === nextProps.isEditing &&
  prevProps.timer === nextProps.timer

export default React.memo(Task, areEqual)
