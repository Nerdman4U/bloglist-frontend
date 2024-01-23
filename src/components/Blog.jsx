
const BlogLine = ({ blog }) => {
  return (

    <tr>
      <td>{blog.title}</td>
      <td>{blog.author}</td>
      <td>{blog.url}</td>
      <td>{blog.likes}</td>
    </tr>

  ) 
}

const Blog = ({ blogItems }) => {
  return (  
    <table>
      <tbody>
        <tr><td>Title</td><td>Author</td><td>Url</td><td>Likes</td></tr> 
        {blogItems.map(blogItem => <BlogLine key={blogItem.id} blog={blogItem} />)}
      </tbody>
    </table> 
  )
}

export default Blog