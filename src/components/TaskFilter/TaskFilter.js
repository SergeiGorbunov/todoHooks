import PropTypes from 'prop-types'
import React from 'react'

function TaskFilter({ filter, onFilterSelect }) {
  return (
    <ul className="filters">
      <li>
        <button type="button" className={filter === 'all' ? 'selected' : ''} onClick={() => onFilterSelect('all')}>
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filter === 'active' ? 'selected' : ''}
          onClick={() => onFilterSelect('active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filter === 'completed' ? 'selected' : ''}
          onClick={() => onFilterSelect('completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

TaskFilter.defaultProps = {
  filter: 'all',
  onFilterSelect: () => {},
}

TaskFilter.propTypes = {
  filter: PropTypes.string,
  onFilterSelect: PropTypes.func,
}

export default React.memo(TaskFilter)
