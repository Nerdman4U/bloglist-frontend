import BlogLine from "./BlogLine"
import Togglable from "./Togglable"

const Blog = ({ blogItems }) => {
  return (  
    <div>
      <div>
      { blogItems.map(
          blogItem => {
            return (
              <div key={blogItem.id} style={{border:"1px solid black", margin:"5px 0", padding:"10px"}}>
                <div>Title: {blogItem.title}</div>
                <Togglable labels={{open: 'View', close: 'Hide'}}>
                  <BlogLine key={blogItem.id} blog={blogItem} /> 
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