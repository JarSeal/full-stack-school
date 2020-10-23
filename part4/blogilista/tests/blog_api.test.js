const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('./../app');
const Note = require('./../models/blog');

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
beforeEach(async () => {
  await Note.deleteMany({});
  await Note.insertMany(initialBlogs);
});

describe('api tests', () => {
  test('there are six blogs', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(6);
  });
});

afterAll(() => {
  mongoose.connection.close();
});