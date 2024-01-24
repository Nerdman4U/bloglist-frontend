import { useState } from 'react'
import blogService from '../services/blogs'
const BlogLine = ({ blog, setNoteMessage }) => {
  const [likes, setLikes] = useState(blog.likes)

  const likeBlogHandler = (blog) => {
    console.log('likeBlogHandler()', blog)
    const newLikes = likes + 1
    setLikes(newLikes)
    blogService.update(blog.id, {'title': blog.title, 'author': blog.author, 'url': blog.url, 'likes': likes})
    setNoteMessage(`Likes ${likes}`)
    setTimeout(() => {
      setNoteMessage(null)
    }, 3000)
  }

  return (
    <div>
      <div>
        Author:{blog.author} Url:{blog.url} Likes:{likes} <button onClick={() => likeBlogHandler(blog)}>Like</button>
      </div>
    </div>
  )
}

export default BlogLine
