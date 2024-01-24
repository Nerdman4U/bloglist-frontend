import { useState } from 'react'

const Togglable = (props) => {
  const [loginVisible, setLoginVisible] = useState(false) // show login form
  const hideWhenVisible = { display: loginVisible ? 'none' : 'block' }
  const showWhenVisible = { display: loginVisible ? 'block' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={{margin:"5px 0", padding:"4px 0"}}>
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>{props.labels.open}</button>
      </div>
      <div style={showWhenVisible}>
        { props.children }
        <button onClick={() => setLoginVisible(false)}>{props.labels.close}</button>
      </div>
    </div>
  )

}

export default Togglable