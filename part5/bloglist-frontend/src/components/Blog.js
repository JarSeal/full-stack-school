import React, { useState } from 'react';
import blogService from './../services/blogs';
import Togglable from './Togglable';
import './Blog.css';

const handleLikeClick = async (e, blog, blogs, setBlogs, loadingLike, setLoadingLike, setBlogNote) => {
  if(loadingLike) return;
  setLoadingLike(true);
  try {
    const userId = blog.user.id;
    const newLikes = blog.likes + 1;
    const body = Object.assign({}, blog, { user: userId, likes: newLikes });
    blog.likes = newLikes;
    await blogService.likeBlog(body);
    let updatedList = blogs.filter((b) => {
      if(b.id !== blog.id) return b;
      return null;
    });
    updatedList = updatedList.concat(blog);
    setBlogs(updatedList);
    setLoadingLike(false);
  } catch (error) {
    setBlogNote({
			msg: 'Error in saving like action.',
			type: 3,
			length: 0,
			phase: 1,
    });
    setLoadingLike(false);
  }
};

const handleDeleteClick = (e, blog, blogs, setBlogs, setBlogNote) => {
  setBlogNote({
    msg: `Delete blog: ${blog.title}?`,
    type: 4,
    length: 0,
    phase: 1,
    action: async () => {
      try {
        await blogService.deleteBlog(blog.id);
        let updatedList = blogs.filter((b) => {
          if(b.id !== blog.id) return b;
          return null;
        });
        setBlogs(updatedList);
      } catch (error) {
        setBlogNote({
          msg: 'Error in deleting blog.',
          type: 3,
          length: 0,
          phase: 1,
        });
      }
    }
  });
};

const deleteButton = (user, blog, blogs, setBlogs, setBlogNote) => {
  if(!user) return null;
  return (
    <div className='info-row align-right'>
      <button className='delete-button' onClick={
        (e) => handleDeleteClick(e, blog, blogs, setBlogs, setBlogNote)
      }>delete</button>
    </div>
  );
}

const Blog = ({ blog, blogs, setBlogs, setBlogNote, user }) => {
  const [loadingLike, setLoadingLike] = useState(false);

  return (
    <div className='blog-item'>
      <h3>
        {blog.title}
        <span className='author'>by {blog.author || blog.user.name}</span>
        <span className='likes-big'>{blog.likes}<span>likes</span></span>
      </h3>
      <Togglable label='info' keepButtonVisible='true'>
        <div style={{paddingBottom: '12px'}}>
          <div className='info-row'>
            <span className='info-row__label'>URL: </span><a href={blog.url}>{blog.url}</a>
          </div>
          <div className='info-row'>
            <span className='info-row__label'>Likes: </span>
            {blog.likes}
            <button
              className={loadingLike ? 'like-button loading' : 'like-button'}
              onClick={(e) => handleLikeClick(e, blog, blogs, setBlogs, loadingLike, setLoadingLike, setBlogNote)}>
              {loadingLike ? 'saving..' : 'like'}
            </button>
          </div>
          <div className='info-row'>
            <span className='info-row__label'>Creator: </span>{blog.user.name}
          </div>
          {deleteButton(user, blog, blogs, setBlogs, setBlogNote)}
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
