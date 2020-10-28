const blogsRouter = require('express').Router();
const logger = require('./../utils/logger');
const Blog = require('./../models/blog');
const User = require('./../models/user');

blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(result);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = await User.find({}); // TODO, remove this after the user is passed with request.body.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user[0].id // TODO, change later
  });
  const savedBlog = await blog.save();
  user[0].blogs = user[0].blogs.concat(savedBlog.id); // TODO, change later
  await user[0].save(); // TODO, change later
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