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
  const [note, setNote] = useState({msg:'', type:0, length:0, phase:0});

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
            setBlogNote={setNote}
            setBlogs={setBlogs}
            blogs={blogs}
            blogRef={blogRef} />
        </Togglable>
      }
      <div className='blog-list'>
        {user !== null && blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        ).reverse()}
      </div>
      <footer style={{
        opacity: 0.2, fontSize: '12px', textAlign: 'center', marginTop: '-18px', marginBottom: '50px'
      }}>by Kai Forsman</footer>
    </div>
  );
};

export default App;