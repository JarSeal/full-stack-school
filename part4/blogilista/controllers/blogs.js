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

blogsRouter.delete('/:id', async (req, res, next) => {
  const result = await Blog.findByIdAndRemove(req.params.id);
  if(result) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

blogsRouter.put('/:id', async (req, res, next) => {
  const body = req.body;
  const result = await Blog.findByIdAndUpdate(req.params.id, body, { new: true });
  if(result) {
    res.json(result);
  } else {
    res.status(404).end();
  }
});

module.exports = blogsRouter;