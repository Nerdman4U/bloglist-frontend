import { useState } from 'react'
import blogService from '../services/blogs'
const BlogLine = ({ blog, setNoteMessage, update }) => {
  const [likes, setLikes] = useState(blog.likes)

  const likeBlogHandler = (blog) => {
    //console.log('likeBlogHandler()', blog)
    const newLikes = likes + 1
    //console.log('New likes', newLikes)
    setLikes(newLikes)
    blogService.update(blog.id, {'title': blog.title, 'author': blog.author, 'url': blog.url, 'likes': newLikes})
    setNoteMessage(`Likes ${newLikes}`)
    setTimeout(() => {
      setNoteMessage(null)
    }, 3000)
    update(blog.id, newLikes)
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
