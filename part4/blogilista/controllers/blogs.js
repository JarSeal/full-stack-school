const blogsRouter = require('express').Router();
const logger = require('./../utils/logger');
const Blog = require('./../models/blog');

blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({});
  response.json(result);
});

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body);
    const savedBlog = await blog.save();
    response.json(savedBlog.toJSON());
});

module.exports = blogsRouter;