import { useState, useEffect, useRef } from 'react'

import blogService from '../services/blogs'
import BlogLine from "./BlogLine"
import BlogForm from './BlogForm'
import Togglable from "./Togglable"

const Blog = ({ setNoteMessage, user }) => {
  const [blogs, setBlogs] = useState([])
  const [sortedItems, setSortedItems ] = useState([])
  const compareNumbers = (a, b) => a-b
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
      sort( blogs)
    })
  }, [])

  const createBlog = (blog) => {
    console.log('addBlogHandler', blog)
    blogService.create({'title': blog.title, 'author': user.name, 'url': blog.url, 'likes': 0})
      .then((blogCreated) => {
        const items = blogs.concat(blogCreated)
        setBlogs(items)
        sort(items)
        setNoteMessage(`Added ${blogCreated.title} by ${user.name}`)
        setTimeout(() => {
          setNoteMessage(null)
        }, 3000)
        blogFormRef.current.toggleVisibility()
      })
  }

  const increaseLikes = (blog, newLikes) => {
    blogService.update(blog.id, {'title': blog.title, 'author': blog.author, 'url': blog.url, 'likes': newLikes})
      .then((updatedBlog) => {
        let newBlogs = blogs.filter(b => b.id !== updatedBlog.id)
        newBlogs = newBlogs.concat(updatedBlog)
        setBlogs(newBlogs)
        sort(newBlogs)
        setNoteMessage(`Likes ${newLikes}`)
        setTimeout(() => {
          setNoteMessage(null)
        }, 3000)
      })
  }

  const removeBlog = (blog) => {
    if (!blog || !blog.id) return
    console.log('removing...')    
    blogService.remove(blog.id)
      .then(() => { 
          const items = blogs.filter(b => b.id !== blog.id)
          setBlogs(items)
          sort(items)
          console.log('removed', items, blog.id)
          setNoteMessage(`Removed ${blog.title} by ${blog.author}`)
          setTimeout(() => {
            setNoteMessage(null)
          }, 3000)
      })
  }

  const sort = (items) => {
    const sorted = items.sort((a, b) => compareNumbers(b.likes, a.likes))
    setSortedItems(sorted)
  }

  const blogForm = () => {
    if (!user) return
    return (
      <Togglable ref={blogFormRef} labels={{open: 'Add item', close: 'Cancel'}}>
        <BlogForm createBlog={createBlog}/>
      </Togglable>
    )
  }
 
  return (
    <div>
      { blogForm() }

      <div>
      { sortedItems.map(
          blogItem => {
            return (
              <div key={blogItem.id} style={{border:"1px solid black", margin:"5px 0", padding:"10px"}}>
                <div>Title: {blogItem.title}</div>
                <Togglable labels={{open: 'View', close: 'Hide'}}>
                  <BlogLine key={blogItem.id} blog={blogItem} setNoteMessage={setNoteMessage} increaseLikes={increaseLikes} removeBlog={removeBlog}/>
                </Togglable>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}

export default Blog

