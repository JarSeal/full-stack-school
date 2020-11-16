const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = require('./../app');
const Blog = require('./../models/blog');
const User = require('../models/user');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 7,
    comments: [],
    user: null,
  },
  {
    title: 'Rocket Science',
    author: 'Paul Mooney',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 7,
    comments: [],
    user: null,
  },
  {
    title: 'This is another post',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 2,
    comments: [],
    user: null,
  },
  {
    title: 'Some title',
    author: 'Richard Nixon',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 2,
    comments: [],
    user: null,
  },
  {
    title: 'Some title 2',
    author: 'Richard Nixon',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 0,
    comments: [],
    user: null,
  },
  {
    title: 'Yet another post',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 0,
    comments: [],
    user: null,
  },
];

beforeAll(async () => {
  jest.setTimeout(10000);
});

let token = null;
let decodedToken = {};

describe('api tests', () => {
  beforeAll(async () => {
    const credentials = {
      username: 'root',
      password: 'salainen'
    };
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash(credentials.password, 10);
    const user = new User({
      username: credentials.username,
      name: 'Admin',
      passwordHash
    });
    await user.save();
    const result = await api
      .post('/api/login')
      .send(credentials);
    token = result.body.token;
    try {
      decodedToken = jwt.verify(token, process.env.SECRET);
    } catch(e) {
      console.error('token could not be decoded', e);
    }
    for(let i=0; i<initialBlogs.length; i++) {
      if(i !== initialBlogs.length - 1) {
        initialBlogs[i].user = decodedToken.id;
      } else {
        initialBlogs[i].user = mongoose.Types.ObjectId();
      }
    }
  });
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);
  });
  test('there are '+initialBlogs.length+' initial blogs with id\'s', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length);
    for(let blog of response.body) {
      expect(blog.id).toBeDefined();
    }
  });
  describe('add a blog', () => {
    test('new blog is added succesfully', async () => {
      const blog = {
        title: 'Lets test this blog',
        author: 'Bot',
        url: 'http://www.yle.fi',
        likes: 0
      };
      await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(blog)
        .expect(200);
      const response = await api.get('/api/blogs');
      expect(response.body).toHaveLength(initialBlogs.length + 1);
    });
    test('new blog is added unsuccesfully because missing token', async () => {
      const blog = {
        title: 'Lets test this blog',
        author: 'Bot',
        url: 'http://www.yle.fi',
        likes: 0
      };
      await api
        .post('/api/blogs')
        .send(blog)
        .expect(401);
      const response = await api.get('/api/blogs');
      expect(response.body).toHaveLength(initialBlogs.length);
    });
    test('new blog without likes is added succesfully and the number of likes is defaulted to zero', async () => {
      const blog = {
        title: 'Lets test a blog without defining likes',
        author: 'Bot',
        url: 'http://www.yle.fi'
      };
      const result = await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(blog)
        .expect(200);
      const savedBlog = result.body;
      expect(savedBlog.likes).toBe(0);
    });
    test('new blog without title fails as bad request (400)', async () => {
      const blog = {
        author: 'Bot',
        url: 'http://www.yle.fi'
      };
      await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(blog)
        .expect(400);
    });
    test('new blog without url fails as bad request (400)', async () => {
      const blog = {
        title: 'Test blog',
        author: 'Bot'
      };
      await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(blog)
        .expect(400);
    });
  });
  describe('delete a blog', () => {
    test('delete a blog successfully', async () => {
      const blogs = await api.get('/api/blogs');
      const delId = blogs.body[0].id;
      await api
        .delete('/api/blogs/' + delId)
        .set('Authorization', 'bearer ' + token)
        .expect(204);
      const blogsAfterDel = await api.get('/api/blogs');
      expect(blogsAfterDel.body.length).toBe(blogs.body.length - 1);
    });
    test('try to delete a blog with a non existing id', async () => {
      const blogs = await api.get('/api/blogs');
      const nonExistingId = mongoose.Types.ObjectId();
      await api
        .delete('/api/blogs/' + nonExistingId)
        .set('Authorization', 'bearer ' + token)
        .expect(404);
      const blogsAfterDelAttempt = await api.get('/api/blogs');
      expect(blogsAfterDelAttempt.body.length).toBe(blogs.body.length);
    });
    test('try to delete a blog that is not created by current user', async () => {
      const result = await api.get('/api/blogs');
      const blogs = result.body;
      const notOwnBlogs = blogs.filter(blog => !blog.user); // created by a user that does not exist (blog.user: null)
      await api
        .delete('/api/blogs/' + notOwnBlogs[0].id)
        .set('Authorization', 'bearer ' + token)
        .expect(401);
      const blogsAfterDelAttempt = await api.get('/api/blogs');
      expect(blogsAfterDelAttempt.body.length).toBe(blogs.length);
    });
  });
  describe('edit a blog', () => {
    test('edit a blog successfully by adding likes', async () => {
      const blogs = await api.get('/api/blogs');
      const newLikes = blogs.body[0].likes + 1;
      const id = blogs.body[0].id;
      const result = await api
        .put('/api/blogs/' + id)
        .set('Authorization', 'bearer ' + token)
        .send({ likes: newLikes })
        .expect(200);
      expect(result.body.likes).toBe(newLikes);
    });
    test('try to edit a non existing blog', async () => {
      const nonExistingId = mongoose.Types.ObjectId();
      await api
        .put('/api/blogs/' + nonExistingId)
        .set('Authorization', 'bearer ' + token)
        .send({ likes: 0 })
        .expect(404);
    });
  });
  describe('comment a blog', () => {
    test('comment a blog twice successfully and get comments for that blog', async () => {
      const blogs = await api.get('/api/blogs');
      const id = blogs.body[0].id;
      const result = await api
        .post('/api/comments')
        .send({ content: 'New comment', blogId: id })
        .expect(200);
      expect(result.body.comments.length).toBe(1);
      const result2 = await api
        .post('/api/comments')
        .send({ content: 'Another comment', blogId: id })
        .expect(200);
      expect(result2.body.comments.length).toBe(2);
      const result3 = await api
        .get('/api/comments/' + id);
      expect(result3.body.length).toBe(2);
    });
    test('try to comment a non existing blog', async () => {
      const nonExistingId = mongoose.Types.ObjectId();
      await api
        .post('/api/comments')
        .send({ content: 'New comment', blogId: nonExistingId })
        .expect(404);
      const result = await api
        .get('/api/comments/' + nonExistingId);
      expect(result.body.length).toBe(0);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});