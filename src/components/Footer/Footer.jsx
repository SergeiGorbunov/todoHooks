import PropTypes from 'prop-types'
import React from 'react'

function Footer({ clearCompleted, itemsLeft, children }) {
  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      {children}
      <button type="button" className="clear-completed" onClick={() => clearCompleted()}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  clearCompleted: () => {},
  itemsLeft: 0,
}

Footer.propTypes = {
  clearCompleted: PropTypes.func,
  itemsLeft: PropTypes.number,
}

const areEqual = (prevProps, nextProps) =>
  prevProps.itemsLeft === nextProps.itemsLeft && prevProps.filter === nextProps.filter

export default React.memo(Footer, areEqual)
