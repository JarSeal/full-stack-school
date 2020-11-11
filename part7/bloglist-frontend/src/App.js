import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newNotification } from './reducers/notificationReducer';
import Blog from './components/Blog';
import Login from './components/Login';
import NotificationBox from './components/NotificationBox';
import CreateBlog from './components/CreateBlog';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import { getBlogs, likeBlog, deleteBlog, createBlog } from './reducers/blogReducer';
import ls from './utils/localStorage';
import './styles/form-elements.css';
import './styles/buttons.css';

const App = () => {
  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();
  const blogRef = useRef();
  const [user, setUser] = useState(null);

  useEffect(() => {
    ls.initLocalStorage();
    const loggedUserJSON = ls.getItem('blogAppUser');
    if(loggedUserJSON) {
      const u = JSON.parse(loggedUserJSON);
      setUser(u);
      blogService.setToken(u.token);
    }
    dispatch(getBlogs());
  }, [dispatch]);

  const handleLikeClick = (blog, loadingLike, setLoadingLike) => {
    if(loadingLike) return;
    setLoadingLike(true);
    dispatch(likeBlog(blog, blogs));
    setLoadingLike(false);
  };

  const handleDeleteClick = (blog) => {
    dispatch(newNotification({
      msg: `Delete blog: ${blog.title}?`,
      type: 4,
      length: 0,
      action: () => {
        dispatch(deleteBlog(blog, blogs));
      }
    }));
  };

  const handleCreateNew = async (
    title, author, url, setTitle, setAuthor, setUrl
  ) => {
    dispatch(createBlog(
      { title, author, url }, blogs, blogRef, setTitle, setAuthor, setUrl
    ));
    // try {
    //   const result = await blogService.newBlog({
    //     title, author, url
    //   });
    //   // const newBlogs = blogs.concat(result);
    //   // setBlogs(newBlogs);
    //   setTitle('');
    //   setAuthor('');
    //   setUrl('');
    //   dispatch(newNotification({
    //     msg: `New blog (${title}) saved!`,
    //     type: 1,
    //   }));
    //   if(blogRef) blogRef.current.toggleVisibility();
    // } catch (error) {
    //   if(error.response && error.response.status === 400 && error.response.data.errors !== undefined) {
    //     const errors = error.response.data.errors;
    //     if(errors.title !== undefined) {
    //       dispatch(newNotification({
    //         msg: 'Title cannot be empty.',
    //         type: 2,
    //       }));
    //       return;
    //     } else if(errors.url !== undefined) {
    //       dispatch(newNotification({
    //         msg: 'URL cannot be empty.',
    //         type: 2,
    //       }));
    //       return;
    //     }
    //   }
    //   dispatch(newNotification({
    //     msg: 'Error, could not create new blog!',
    //     type: 3,
    //     length: 0,
    //   }));
    // }
  };

  return (
    <div style={{
      fontFamily:'sans-serif',
      color:'#333',
      maxWidth: '960px',
      margin: '0 auto'
    }}>
      <h2>Blogs</h2>
      <NotificationBox />
      <Login
        user={user}
        setUser={setUser}
        ls={ls} />
      {user !== null &&
        <Togglable label='+ New blog' ref={blogRef}>
          <CreateBlog
            handleCreateNew={handleCreateNew}
            blogRef={blogRef} />
        </Togglable>
      }
      <div className='blog-list'>
        {blogs.sort((a, b) => {
          return b.likes - a.likes;
        }).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleLikeClick={handleLikeClick}
            handleDeleteClick={handleDeleteClick}
            user={user} />
        )}
      </div>
      <footer style={{
        opacity: 0.2, fontSize: '12px', textAlign: 'center', marginTop: '-18px', marginBottom: '50px'
      }}>by Kai Forsman</footer>
    </div>
  );
};

export default App;