const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
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
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

describe('retrieving initial blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(e => e.title)
    assert.strictEqual(contents.includes('Go To Statement Considered Harmful'), true)
  })

  test('returned blogs id field is called "id"', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(b => 'id' in b)
    assert.strictEqual(contents.length, initialBlogs.length)
  })
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)

  assert(titles.includes('Type wars'))
})

describe('adding new blogs', () => {

  test('blog with no set likes value will be set to 0', async () => {
    const newBlog = {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const likes = response.body.map(r => r.likes)

    assert.strictEqual(likes[likes.length-1],0)
  })

  test('invalid post will be responded with 400 ', async () => {
    const newBlog = {
      _id: '5a422bc61b54a676234d17fc',
      author: 'Robert C. Martin',
      likes: 2,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

  })
})

describe('deleting new blogs', () => {

  test('initial blog can be deleted ', async () => {

    await api.delete(`/api/blogs/${initialBlogs[0]._id}`).expect(204)

    const response = await api.get('/api/blogs/')

    assert.strictEqual(response.body.length, initialBlogs.length - 1)

    const contents = response.body.map(e => e.title)
    assert.strictEqual(contents.includes('React patterns'), false)
  })

  test('newly added blog can be deleted ', async () => {

    const newBlog = {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    let response = await api.get('/api/blogs/')

    assert.strictEqual(response.body.length, initialBlogs.length+1)

    let contents = response.body.map(e => e.title)
    assert.strictEqual(contents.includes('Type wars'), true)

    await api.delete(`/api/blogs/${response.body[response.body.length-1].id}`).expect(204)

    response = await api.get('/api/blogs/')

    assert.strictEqual(response.body.length, initialBlogs.length)

    contents = response.body.map(e => e.title)
    assert.strictEqual(contents.includes('Type wars'), false)
  })

  test('deleting a blog with invalid id will be responded with 400 ', async () => {

    await api
      .delete('/api/blogs/jglgegklsgjkljegjp')
      .expect(400)
  })

  test('trying to delete a blog which does not exist will be responded with 400 ', async () => {

    await api
      .delete('/api/blogs/548534086830680')
      .expect(400)
  })

})

after(async () => {
  await mongoose.connection.close()
})