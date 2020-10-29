import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import NotificationBox from './components/NotificationBox';
import CreateBlog from './components/CreateBlog';
import blogService from './services/blogs';
import ls from './utils/localStorage';
import './styles/form-elements.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [note, setNote] = useState({msg:"", type:0, length:0, phase:0});

  useEffect(() => {
    ls.initLocalStorage();
    const loggedUserJSON = ls.getItem('blogAppUser');
    if(loggedUserJSON) {
      const u = JSON.parse(loggedUserJSON);
      setUser(u);
      blogService.setToken(u.token);
    }
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, []);

  return (
    <div style={{fontFamily:"sans-serif",color:"#333"}}>
      <h2>Blogs</h2>
      <NotificationBox note={note} setNote={setNote} />
      <Login
        user={user}
        setUser={setUser}
        setLoginNote={setNote}
        ls={ls}
      ></Login>
      {user !== null &&
        <CreateBlog></CreateBlog>
      }
      {user !== null && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
};

export default App;