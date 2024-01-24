const BlogLine = ({ blog }) => {
  return (
    <div>
      <div>
        Author: {blog.author} Url:{blog.url} Likes:{blog.likes} <button>Like</button>
      </div>
    </div>
  )
}

export default BlogLine
