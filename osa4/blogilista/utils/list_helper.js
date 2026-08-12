const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0
  blogs.map(blog => total += blog.likes)
  return total
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  return blogs.reduce((prev, current) =>
    (prev.likes > current.likes) ? prev : current)
}

const mostBlogs = (blogs) => {

  if (blogs.length === 0) return null

  let blogCounts = {}
  let maxBlogsAuthor = ''
  let maxBlogs = 0

  for (let i = 0; i < blogs.length; i++) {
    const author = blogs[i].author
    blogCounts[author] = (blogCounts[author] || 0 ) + 1

    if (blogCounts[author] > maxBlogs) {
      maxBlogsAuthor = author
      maxBlogs = blogCounts[author]
    }
  }

  return { author: maxBlogsAuthor, blogs: maxBlogs }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}