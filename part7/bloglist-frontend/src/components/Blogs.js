import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import Blog from './Blog';
import Login from './Login';
import CreateBlog from './CreateBlog';
import Togglable from './Togglable';
import { BlogList } from './BlogStyles';

const Blogs = ({ ls }) => {
  const user = useSelector(state => state.user);
  const blogs = useSelector(state => state.blogs);
  const blogRef = useRef();

  return (
    <div>
      <Login ls={ls} />
      {user !== null &&
        <Togglable label='+ New blog' ref={blogRef}>
          <CreateBlog blogRef={blogRef} />
        </Togglable>
      }
      <BlogList>
        {blogs.sort((a, b) => {
          return b.likes - a.likes;
        }).map(blog =>
          <Blog
            key={blog.id}
            blog={blog} />
        )}
      </BlogList>
    </div>
  );
};

export default Blogs;