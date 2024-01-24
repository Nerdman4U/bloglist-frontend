import BlogLine from "./BlogLine"

const Blog = ({ blogItems }) => {
  return (  
    <div>
      <table>
        <tbody>
          <tr><td>Title</td><td>Author</td><td>Url</td><td>Likes</td></tr> 
          {blogItems.map(blogItem => <BlogLine key={blogItem.id} blog={blogItem} />)}
        </tbody>
      </table> 
    </div>
  )
}

export default Blog