import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [noteMessage, setNoteMessage] = useState(null)
  // const [username, setUsername] = useState('username1')
  // const [password, setPassword] = useState('password1')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

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
  const usernameClickHandler = ({target}) => { 
    setUsername(target.value) 
  }
  const passwordClickHandler = ({target}) => { setPassword(target.value) }
  const addBlogHandler = (event) => {
    event.preventDefault()
    console.log('addBlogHandler', title)
    blogService.create({'title': title, 'author': user.name, 'url': '', 'likes': 0})

    setNoteMessage(`Added ${title} by ${user.name}`)
    setTimeout(() => {
      setNoteMessage(null)
    }, 3000)
}

  function showLogin(props) {
    return <LoginForm loginFormHandler={loginHandler} usernameClickHandler={usernameClickHandler} passwordClickHandler={passwordClickHandler} username={username} password={password} />
  }

  const noteForm = () => {
    blogService.print()
      return (
      <form onSubmit={addBlogHandler}>
        <table>
          <tbody>
            <tr><td>Title</td><td><input key="title" value={title} onChange={({target}) => setTitle(target.value)}></input></td></tr>
            <tr><td>URL</td><td><input key="url" value={url} onChange={({target}) => setUrl(target.value)}></input></td></tr>
          </tbody>
        </table>
        <button type="submit">Save</button>
      </form>
    )
  }
 
  return (
    <div>
      { errorMessage && <div style={{color: 'red'}}>{errorMessage}</div> }
      { noteMessage && <div style={{color: 'green'}}>{noteMessage}</div> }
      <h2>Blogs</h2>      
        { !user && showLogin({user}) }
        { user && <div>
          <p>{user.name} logged in</p>{ noteForm() }
          </div>
        }

        <Blog blogItems={blogs}/>

        <div>
          <button onClick={() => logOut()}>log out</button>
        </div>
    </div>
  )
}

export default App

