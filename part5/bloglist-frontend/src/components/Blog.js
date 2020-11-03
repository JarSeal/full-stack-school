import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Togglable from './Togglable';
import './Blog.css';

const deleteButton = (user, blog, handleDeleteClick) => {
  if(!user) return null;
  return (
    <div className='info-row align-right'>
      <button className='delete-button' onClick={
        () => handleDeleteClick(blog)
      }>delete</button>
    </div>
  );
};

const Blog = ({ blog, handleLikeClick, handleDeleteClick, user }) => {
  const [loadingLike, setLoadingLike] = useState(false);

  return (
    <div className='blog-item'>
      <h3 className='title'>
        {blog.title}
        <span className='author'>{blog.author ? 'by ' + blog.author : blog.user ? 'by ' + blog.user.name : ''}</span>
        <span className='likes-big'>{blog.likes}<span>likes</span></span>
      </h3>
      <Togglable label='info' keepButtonVisible='true'>
        <div style={{ paddingBottom: '12px' }}>
          <div className='info-row info-row--url'>
            <span className='info-row__label'>URL: </span><a href={blog.url}>{blog.url}</a>
          </div>
          <div className='info-row info-row--likes'>
            <span className='info-row__label'>Likes: </span>
            {blog.likes}
            <button
              className={loadingLike ? 'like-button loading' : 'like-button'}
              onClick={() => handleLikeClick(blog, loadingLike, setLoadingLike)}>
              {loadingLike ? 'saving..' : 'like'}
            </button>
          </div>
          <div className='info-row'>
            <span className='info-row__label'>Creator: </span>{blog.user.name}
          </div>
          {deleteButton(user, blog, handleDeleteClick)}
        </div>
      </Togglable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    author: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      name: PropTypes.string
    })
  }),
  handleLikeClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default Blog;
