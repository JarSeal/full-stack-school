const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('./../app');
const Blog = require('./../models/blog');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 7,
  },
  {
    title: 'Rocket Science',
    author: 'Paul Mooney',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 7,
  },
  {
    title: 'This is another post',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 2,
  },
  {
    title: 'Some title',
    author: 'Richard Nixon',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 2,
  },
  {
    title: 'Some title 2',
    author: 'Richard Nixon',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 0,
  },
  {
    title: 'Yet another post',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 0,
  },
];

beforeAll(async () => {
  jest.setTimeout(10000);
});

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

describe('api tests', () => {
  test('there are '+initialBlogs.length+' blogs with id attribute', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length);
    for(let blog of response.body) {
      expect(blog.id).toBeDefined();
    }
  });
  test('new blog is added succesfully', async () => {
    const blog = new Blog({
      title: 'Lets test this blog',
      author: 'Bot',
      url: 'http://www.yle.fi',
      likes: 0
    });
    await blog.save();
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length + 1);
  });
  test('new blog without likes is added succesfully', async () => {
    const blog = new Blog({
      title: 'Lets test a blog without defining likes',
      author: 'Bot',
      url: 'http://www.yle.fi'
    });
    let savedBlog = await blog.save();
    savedBlog = savedBlog.toJSON();
    expect(savedBlog.likes).toEqual(0);
  });
  test('new blog without title fails as bad request (validationError)', async () => {
    const blog = new Blog({
      author: 'Bot',
      url: 'http://www.yle.fi'
    });
    await expect(blog.save())
      .rejects
      .toThrow(mongoose.Error.ValidationError);
  });
  test('new blog without url fails as bad request (validationError)', async () => {
    const blog = new Blog({
      title: 'Test blog',
      author: 'Bot'
    });
    await expect(blog.save())
      .rejects
      .toThrow(mongoose.Error.ValidationError);
  });
});

afterAll(() => {
  mongoose.connection.close();
});