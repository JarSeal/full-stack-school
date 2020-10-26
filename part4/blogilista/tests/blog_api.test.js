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
  test('there are '+initialBlogs.length+' initial blogs with id\'s', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length);
    for(let blog of response.body) {
      expect(blog.id).toBeDefined();
    }
  });
  describe('add a blog', () => {
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
    test('new blog without likes is added succesfully and the number of likes is defaulted to zero', async () => {
      const blog = new Blog({
        title: 'Lets test a blog without defining likes',
        author: 'Bot',
        url: 'http://www.yle.fi'
      });
      let savedBlog = await blog.save();
      savedBlog = savedBlog.toJSON();
      expect(savedBlog.likes).toBe(0);
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
  describe('delete a blog', () => {
    test('delete a blog successfully', async () => {
      const blogs = await api.get('/api/blogs');
      const delId = blogs.body[0].id;
      const result = await Blog.findByIdAndRemove(delId);
      const blogsAfterDel = await api.get('/api/blogs');
      expect(result.id).toBe(delId);
      expect(blogsAfterDel.body.length).toBe(blogs.body.length - 1);
    });
    test('try to delete a blog with a non existing id', async () => {
      const blogs = await api.get('/api/blogs');
      const nonExistingId = mongoose.Types.ObjectId();
      const result = await Blog.findByIdAndRemove(nonExistingId);
      const blogsAfterDelAttempt = await api.get('/api/blogs');
      expect(result).toBe(null);
      expect(blogsAfterDelAttempt.body.length).toBe(blogs.body.length);
    });
  });
  describe('edit a blog', () => {
    test('edit a blog successfully by adding likes', async () => {
      const blogs = await api.get('/api/blogs');
      const newLikes = blogs.body[0].likes + 1;
      const id = blogs.body[0].id;
      const result = await Blog.findByIdAndUpdate(id, { likes: newLikes }, { new: true });
      expect(result.likes).toBe(newLikes);
    });
    test('try to edit a non existing blog', async () => {
      const nonExistingId = mongoose.Types.ObjectId();
      const result = await Blog.findByIdAndUpdate(nonExistingId, { likes: 0 }, { new: true });
      expect(result).toBe(null);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});