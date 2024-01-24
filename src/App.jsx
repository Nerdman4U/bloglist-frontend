import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [noteMessage, setNoteMessage] = useState(null)
  // const [username, setUsername] = useState('username1')
  // const [password, setPassword] = useState('password1')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logOut = () => {
    console.log('logout')
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginHandler = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.print()

      setNoteMessage('Tervetuloa!')
      setTimeout(() => {
        setNoteMessage(null)
      }, 1000)

    } catch(e) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const usernameClickHandler = ({target}) => { setUsername(target.value) }
  const passwordClickHandler = ({target}) => { setPassword(target.value) }
  const showLogin = () => {
    if (user) return
    return ( 
      <Togglable labels={{open: 'Login', close: 'Cancel'}}>
        <LoginForm 
          loginFormHandler={loginHandler} 
          usernameClickHandler={usernameClickHandler} 
          passwordClickHandler={passwordClickHandler} 
          username={username} 
          password={password} 
        />
      </Togglable>      
    )  
  }

  const blogForm = () => {
    if (!user) return
    return (
      <Togglable labels={{open: 'Add item', close: 'Cancel'}}>
        <BlogForm user={user} setNoteMessage={setNoteMessage}/>
      </Togglable>  
    )
  }

  const showLoggedIn = () => {
    if (!user) return
    return ( 
      <p>
        {user.name} logged in. <button onClick={() => logOut()}>Logout</button>
      </p>
    )
  }

  return (
    <div>
      { errorMessage && <div style={{color: 'red'}}>{errorMessage}</div> }
      { noteMessage && <div style={{color: 'green'}}>{noteMessage}</div> }
      <h2>Login</h2>
      { showLogin() }
      { showLoggedIn() }
      <h2>Blogs</h2>
      { blogForm() }
      <Blog blogItems={blogs}/>
    </div>
  )
}

export default App

