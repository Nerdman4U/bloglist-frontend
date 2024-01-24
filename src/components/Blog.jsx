import BlogLine from "./BlogLine"
import Togglable from "./Togglable"

const Blog = ({ blogItems, setNoteMessage }) => {
  return (
    <div>
      <div>
      { blogItems.map(
          blogItem => {
            return (
              <div key={blogItem.id} style={{border:"1px solid black", margin:"5px 0", padding:"10px"}}>
                <div>Title: {blogItem.title}</div>
                <Togglable labels={{open: 'View', close: 'Hide'}}>
                  <BlogLine key={blogItem.id} blog={blogItem} setNoteMessage={setNoteMessage} />
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