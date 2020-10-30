import React from 'react';
import Togglable from './Togglable';
import './Blog.css';

const Blog = ({ blog }) => {
  return (
    <div className='blog-item'>
      <h3>
        {blog.title}
        <span className='author'>by {blog.author || blog.user.name}</span>
        <span className='likes-big'>{blog.likes || ''}</span>
      </h3>
      <Togglable label='info'>
        <div style={{paddingBottom: '12px'}}>
          <div className='info-row'>
            <span className='info-row__label'>URL: </span><a href={blog.url}>{blog.url}</a>
          </div>
          <div className='info-row'>
            <span className='info-row__label'>Likes: </span>{blog.likes} <button className='like-button'>like</button>
          </div>
          <div className='info-row'>
            <span className='info-row__label'>Creator: </span>{blog.user.name}
          </div>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
