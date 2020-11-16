const commentsRouter = require('express').Router();
const Comment = require('./../models/comment');
const Blog = require('./../models/blog');

commentsRouter.get('/:id', async (request, response) => {
  const result = await Comment.find({ blogId: request.params.id });
  response.json(result);
});

commentsRouter.post('/', async (request, response) => {
  const body = request.body;
  
  const blog = await Blog.findById(body.blogId);

  const comment = new Comment({
    content: body.content,
    blogId: body.blogId
  });
  const savedComment = await comment.save();
  blog.comments = blog.comments.concat(savedComment.id);
  await blog.save();
  const newBlog = await Blog.findById(blog.id)
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1, id: 1, blogId: 1 });
  response.json(newBlog.toJSON());
});

module.exports = commentsRouter;