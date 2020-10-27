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
    const user = new User({ username: 'root', passwordHash });
  
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
});

afterAll(() => {
  mongoose.connection.close();
});