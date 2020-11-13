import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import { BlogItem } from './BlogStyles';

const Blog = ({ blog }) => {
  const history = useHistory();

  const handleBlogClick = () => {
    history.push('/blogs/' + blog.id);
  };

  return (
    <BlogItem onClick={handleBlogClick}>
      <h3 className='title'>
        {blog.title}
        <span className='author'>{blog.author ? 'by ' + blog.author : blog.user ? 'by ' + blog.user.name : ''}</span>
        <span className='likes-big'>{blog.likes}<span>{blog.likes === 1 ? 'like' : 'likes'}</span></span>
      </h3>
    </BlogItem>
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
};

export default Blog;
