import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false) // show login form
  const hideWhenVisible = { display: visible ? 'none' : 'block' }
  const showWhenVisible = { display: visible ? 'block' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div style={{ margin:'5px 0', padding:'4px 0' }}>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>{props.labels.open}</button>
      </div>
      <div style={showWhenVisible}>
        { props.children }
        <button onClick={() => setVisible(false)}>{props.labels.close}</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  children: PropTypes.node.isRequired,
  labels: PropTypes.shape({
    open: PropTypes.string.isRequired,
    close: PropTypes.string.isRequired
  }).isRequired
}

export default Togglable
