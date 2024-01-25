import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({createBlog}) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({title: title, url: url})
    setTitle('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
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

