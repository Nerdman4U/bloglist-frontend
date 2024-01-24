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

export default BlogLine
