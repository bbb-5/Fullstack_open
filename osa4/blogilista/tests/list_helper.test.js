const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url:'"https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('total likes', () => {

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes([blogs[0]])
    assert.strictEqual(result, 7)
  })

  test('likes of many blogs counted correctly', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 41)
  })

  test('likes of empty bloglist is 0', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })
})

describe('favorite blog', () => {

  test('returns most liked of many', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[2])
  })

  test('returns 1 blog with 1 blog', () => {
    const result = listHelper.favoriteBlog([blogs[4]])
    assert.deepStrictEqual(result, blogs[4])
  })

  test('empty returns null', () => {
    const result = listHelper.favoriteBlog([])
    assert.deepStrictEqual(result, null)
  })

  test('returns a blog with same amount of likes', () => {
    const result = listHelper.favoriteBlog(blogs).likes
    const max = Math.max.apply(null,
      blogs.map(function (o) { return o.likes }))
    assert.strictEqual(result, max)
  })
})

describe('most blogs', () => {

  test('returns null with empty', () => {
    const result = listHelper.mostBlogs([])
    assert.deepStrictEqual(result, null)
  })

  test('returns most blogs from many blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
  })

  test('returns 1 with 1', () => {
    const result = listHelper.mostBlogs([blogs[3]])
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 1 })
  })

  test('returns someone when 2 same most blogcounts', () => {
    const result = listHelper.mostBlogs([blogs[0],blogs[1]])
    assert.strictEqual(result.blogs, 1)
  })

  test('returns someone when same most blogcounts', () => {
    const result = listHelper.mostBlogs([blogs[1],blogs[1],blogs[3],blogs[4]])
    assert.strictEqual(result.blogs, 2)
  })
})

describe('most likes', () => {

  test('returns null with empty', () => {
    const result = listHelper.mostLikes([])
    assert.deepStrictEqual(result, null)
  })

  test('returns most likes from many blogs', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 })
  })

  test('returns 1 with 1', () => {
    const result = listHelper.mostLikes([blogs[3]])
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', likes: 10 })
  })

  test('returns someone when 2 equal like counts', () => {
    const result = listHelper.mostLikes([blogs[1],blogs[4]])
    assert.strictEqual(result.likes, 5)
  })
})