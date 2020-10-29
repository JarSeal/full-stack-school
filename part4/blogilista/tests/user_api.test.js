const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('./../app');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const api = supertest(app);

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  
    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({
      username: 'root',
      name: 'Admin',
      passwordHash
    });
  
    await user.save();
  });
  test('creation succeeds with a fresh username', async () => {
    let usersAtStart = await User.find({});
    usersAtStart = usersAtStart.map(u => u.toJSON());

    const newUser = {
      username: 'keppiSeppo',
      name: 'Seppo Räty',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    let usersAtEnd = await User.find({});
    usersAtEnd = usersAtEnd.map(u => u.toJSON());
    const usernames = usersAtEnd.map(u => u.username);
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with an existing username', async () => {
    const newUser = {
      username: 'root',
      name: 'Epic Fail',
      password: 'salainen',
    };

    // Fails with existing username
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });

  test('creation fails with an empty username', async () => {
    const newUser = {
      username: '',
      name: 'Epic Fail',
      password: 'salainen',
    };

    // Fails with an empty username
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });

  test('creation fails with too short username', async () => {
    const newUser = {
      username: 'ab',
      name: 'Epic Fail',
      password: 'salainen',
    };

    // Fails with too short username
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });
  test('creation fails with an empty password', async () => {
    const newUser = {
      username: 'someUsername',
      name: 'Epic Fail',
      password: '',
    };

    // Fails with an empty password
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });

  test('creation fails with too short password', async () => {
    const newUser = {
      username: 'someUsername',
      name: 'Epic Fail',
      password: 'ab',
    };

    // Fails with too short password
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});