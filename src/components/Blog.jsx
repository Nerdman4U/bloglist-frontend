import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import Togglable from './Togglable'

const Blog = ({ blog, setNoteMessage, increaseLikes, removeBlog, user }) => {
  const [likes, setLikes] = useState(blog.likes)

  const likeBlogHandler = (event) => {
    const newLikes = likes + 1
    setLikes(newLikes)
    increaseLikes(blog, newLikes)
  }

  const removeBlogHandler = (event) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog)
    }
  }

  // must be logged in and be the author to remove.
  const showRemoveButton = () => {
    if (!user) return
    if (!user.name) return
    if (user.name !== blog.author) return
    return <button onClick={removeBlogHandler}>Remove</button>
  }

  // must be logged in to like.
  const showLikeButton = () => {
    if (!user) return
    return <button onClick={likeBlogHandler}>Like</button>
  }

  return (

    <div className="blog" key={blog.id} style={{ border:'1px solid black', margin:'5px 0', padding:'10px' }}>
      <div>Title: {blog.title}</div>
      <Togglable labels={{ open: 'View', close: 'Hide' }}>
        <div>
          Author:{blog.author}
          Url:{blog.url}
          Likes:{likes}
          {showLikeButton()}
          {showRemoveButton()}
        </div>
      </Togglable>
    </div>

  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setNoteMessage: PropTypes.func.isRequired,
  increaseLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default Blog
