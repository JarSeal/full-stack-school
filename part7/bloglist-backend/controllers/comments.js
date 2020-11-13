const mongoose = require('mongoose');
const commentsRouter = require('express').Router();
const Comment = require('./../models/comment');

commentsRouter.get('/:id', async (request, response) => {
  const result = await Comment.find({ blogId: request.params.id });
  response.json(result);
});

commentsRouter.post('/', async (request, response) => {
  const body = request.body;

  const comment = new Comment({
    comment: body.comment,
    blogId: body.blogId
  });
  const savedComment = await comment.save();
  response.json(savedComment.toJSON());
});

module.exports = commentsRouter;