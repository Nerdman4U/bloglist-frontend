import { useState } from 'react'
import blogService from '../services/blogs'
const BlogLine = ({ blog, setNoteMessage, increaseLikes, removeBlog }) => {
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

  return (
    <div>
      <div>
        Author:{blog.author} 
        Url:{blog.url} 
        Likes:{likes} 
        <button onClick={likeBlogHandler}>Like</button>
        <button onClick={removeBlogHandler}>Remove</button>
      </div>
    </div>
  )
}

export default BlogLine
