import { useState } from 'react'
import blogService from '../services/blogs'
const BlogLine = ({ blog, setNoteMessage, increaseLikes, removeBlog, user }) => {
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
    <div>
      <div>
        Author:{blog.author} 
        Url:{blog.url} 
        Likes:{likes} 
        {showLikeButton()}
        {showRemoveButton()}
      </div>
    </div>
  )
}

export default BlogLine
