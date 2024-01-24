import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({user, setNoteMessage}) => {
  const [newBlog, setNewBlog] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addBlogHandler = (event) => {
    event.preventDefault()
    console.log('addBlogHandler', title)
    blogService.create({'title': title, 'author': user.name, 'url': '', 'likes': 0})
    setNoteMessage(`Added ${title} by ${user.name}`)
    setTimeout(() => {
      setNoteMessage(null)
    }, 3000)
  }

  return (
    <form onSubmit={addBlogHandler}>
      <table>
        <tbody>
          <tr>
            <td>Title</td>
            <td><input key="title" value={title} onChange={({target}) => setTitle(target.value)}></input></td>
          </tr>
          <tr>
            <td>URL</td>
            <td><input key="url" value={url} onChange={({target}) => setUrl(target.value)}></input></td>
          </tr>
        </tbody>
      </table>
      <button type="submit">Save</button>
    </form>   
  )
}

export default BlogForm

