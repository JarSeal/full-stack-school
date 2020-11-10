import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CreateBlog = ({ handleCreateNew, blogRef }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (e) => {
    e.preventDefault();
    handleCreateNew(title, author, url, setTitle, setAuthor, setUrl);
  };

  return (
    <div className='create-blog-form form-wrapper'>
      <h3>Create new blog</h3>
      <form onSubmit={addBlog} id='new-blog-form'>
        <div className='form-elem form-elem__input-text'>
          <label htmlFor='create-title'>
            <span className='label-text'>Title *</span>
            <input
              id='create-title'
              className='input-text'
              type='text'
              value={title}
              name='Title'
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div className='form-elem form-elem__input-text'>
          <label htmlFor='create-author'>
            <span className='label-text'>Author</span>
            <input
              id='create-author'
              className='input-text'
              type='text'
              value={author}
              name='Author'
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div className='form-elem form-elem__input-text'>
          <label htmlFor='create-url'>
            <span className='label-text'>URL *</span>
            <input
              id='create-url'
              className='input-text'
              type='text'
              value={url}
              name='URL'
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <div className='form-elem form-elem__submit'>
          <button type='submit' id='create-new-button'>Create new</button>
          {blogRef &&
            <button
              type='button'
              className='cancel-button'
              onClick={() => blogRef.current.toggleVisibility()}>Cancel</button>
          }
        </div>
      </form>
    </div>
  );
};

CreateBlog.propTypes = {
  handleCreateNew: PropTypes.func.isRequired,
  blogRef: PropTypes.object.isRequired
};

export default CreateBlog;