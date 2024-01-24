import BlogLine from "./BlogLine"
import Togglable from "./Togglable"
import { useState, useEffect } from 'react'

const Blog = ({ blogItems, setNoteMessage }) => {
  const [ sortedItems, setSortedItems ] = useState(blogItems)

  const compareNumbers = (a, b) => a-b

  const sort = () => {
    const sorted = blogItems.sort((a, b) => compareNumbers(b.likes, a.likes))
    setSortedItems(sorted)
  }

  const update = (id, likes) => {
    const item = blogItems.find(blogItem => blogItem.id === id)
    item.likes = likes
    sort()
  }

  useEffect(() => {
    sort()
  })

  return (
    <div>
      <div>
      { sortedItems.map(
          blogItem => {
            return (
              <div key={blogItem.id} style={{border:"1px solid black", margin:"5px 0", padding:"10px"}}>
                <div>Title: {blogItem.title}</div>
                <Togglable labels={{open: 'View', close: 'Hide'}}>
                  <BlogLine key={blogItem.id} blog={blogItem} setNoteMessage={setNoteMessage} update={update}/>
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