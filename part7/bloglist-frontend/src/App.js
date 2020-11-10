import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import NotificationBox from './components/NotificationBox';
import CreateBlog from './components/CreateBlog';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import ls from './utils/localStorage';
import './styles/form-elements.css';
import './styles/buttons.css';

const App = () => {
  const blogRef = useRef();
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [note, setNote] = useState({ msg: '', type: 0, length: 0, phase :0 });

  useEffect(() => {
    ls.initLocalStorage();
    const loggedUserJSON = ls.getItem('blogAppUser');
    if(loggedUserJSON) {
      const u = JSON.parse(loggedUserJSON);
      setUser(u);
      blogService.setToken(u.token);
    }
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );
  }, []);

  const handleLikeClick = async (blog, loadingLike, setLoadingLike) => {
    if(loadingLike) return;
    setLoadingLike(true);
    try {
      const userId = blog.user.id;
      const newLikes = blog.likes + 1;
      const body = Object.assign({}, blog, { user: userId, likes: newLikes });
      await blogService.likeBlog(body);
      blog.likes = newLikes;
      let updatedList = blogs.filter((b) => {
        if(b.id !== blog.id) return b;
        return null;
      });
      updatedList = updatedList.concat(blog);
      setBlogs(updatedList);
      setLoadingLike(false);
    } catch (error) {
      setNote({
        msg: 'Error in saving like action.',
        type: 3,
        length: 0,
        phase: 1,
      });
      setLoadingLike(false);
    }
  };

  const handleDeleteClick = (blog) => {
    setNote({
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
          setNote({
            msg: 'Error in deleting blog.',
            type: 3,
            length: 0,
            phase: 1,
          });
        }
      }
    });
  };

  const handleCreateNew = async (
    title, author, url, setTitle, setAuthor, setUrl
  ) => {
    try {
      const result = await blogService.newBlog({
        title, author, url
      });
      const newBlogs = blogs.concat(result);
      setBlogs(newBlogs);
      setTitle('');
      setAuthor('');
      setUrl('');
      setNote({
        msg: `New blog (${title}) saved!`,
        type: 1,
        length: 5000,
        phase: 1,
      });
      if(blogRef) blogRef.current.toggleVisibility();
    } catch (error) {
      if(error.response && error.response.status === 400 && error.response.data.errors !== undefined) {
        const errors = error.response.data.errors;
        if(errors.title !== undefined) {
          setNote({
            msg: 'Title cannot be empty.',
            type: 2,
            length: 5000,
            phase: 1,
          });
          return;
        } else if(errors.url !== undefined) {
          setNote({
            msg: 'URL cannot be empty.',
            type: 2,
            length: 5000,
            phase: 1,
          });
          return;
        }
      }
      setNote({
        msg: 'Error, could not create new blog!',
        type: 3,
        length: 0,
        phase: 1,
      });
    }
  };

  return (
    <div style={{
      fontFamily:'sans-serif',
      color:'#333',
      maxWidth: '960px',
      margin: '0 auto'
    }}>
      <h2>Blogs</h2>
      <NotificationBox note={note} setNote={setNote} />
      <Login
        user={user}
        setUser={setUser}
        setLoginNote={setNote}
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