require('dotenv').config();
const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(express.static('build'));
app.use(cors());
app.use(express.json());

const Blog = require('./models/blog');

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs);
    })
    .catch(error => next(error));
});

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body);
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result);
    })
    .catch(error => next(error));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  // if (error.name === 'CastError') {
  //   return res.status(400).send({ error: 'malformatted id' });
  // } else if (error.name === 'ValidationError') {
  //   return res.status(400).send({ error: error.message });
  // }

  return res.status(400).send({ error: 'unspecified error' });

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});