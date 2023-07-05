import PropTypes from 'prop-types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import Task from '../Task'
import Timer from '../Timer'

function filterTasks(tasks, taskIds, taskFilter) {
  switch (taskFilter) {
    case 'active':
      return taskIds.filter((id) => !tasks[id].isCompleted)
    case 'completed':
      return taskIds.filter((id) => tasks[id].isCompleted)
    default:
      return taskIds
  }
}

export default function TaskList({ todos, onDelite, toggleFlagById, inputHandler, editSubmit, filter, timerUpdate }) {
  const { byId, allIds } = todos

  const taskList = filterTasks(byId, allIds, filter).map((id) => {
    const { description, timer, isCompleted, created } = byId[id]
    return (
      <Task
        {...byId[id]}
        onDelite={onDelite}
        toggleFlagById={toggleFlagById}
        inputHandler={inputHandler}
        editSubmit={editSubmit}
        key={id}
      >
        <span className="title">{description}</span>
        <Timer id={id} timer={timer} timerUpdate={timerUpdate} completed={isCompleted} />
        <span className="description">created {formatDistanceToNow(created)}</span>
      </Task>
    )
  })

  return <ul className="todo-list">{taskList} </ul>
}

TaskList.defaultProps = {
  filter: 'all',
}

TaskList.propTypes = {
  todos: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.objectOf(
        PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool, PropTypes.array]))
      ),
      PropTypes.arrayOf(PropTypes.number),
    ])
  ).isRequired,
  filter: PropTypes.string,
}
