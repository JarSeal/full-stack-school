import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import Login from './components/Login';
import NotificationBox from './components/NotificationBox';
import CreateBlog from './components/CreateBlog';
import Togglable from './components/Togglable';
import { getBlogs } from './reducers/blogReducer';
import { initUser } from './reducers/userReducer';
import ls from './utils/localStorage';
import './styles/form-elements.css';
import './styles/buttons.css';

const App = () => {
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const blogRef = useRef();

  useEffect(() => {
    dispatch(initUser(ls));
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <div style={{
      fontFamily:'sans-serif',
      color:'#333',
      maxWidth: '960px',
      margin: '0 auto'
    }}>
      <h2>Blogs</h2>
      <NotificationBox />
      <Login ls={ls} />
      {user !== null &&
        <Togglable label='+ New blog' ref={blogRef}>
          <CreateBlog blogRef={blogRef} />
        </Togglable>
      }
      <div className='blog-list'>
        {blogs.sort((a, b) => {
          return b.likes - a.likes;
        }).map(blog =>
          <Blog
            key={blog.id}
            blog={blog} />
        )}
      </div>
      <footer style={{
        opacity: 0.2, fontSize: '12px', textAlign: 'center', marginTop: '-18px', marginBottom: '50px'
      }}>by Kai Forsman</footer>
    </div>
  );
};

export default App;