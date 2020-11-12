import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotificationBox from './components/NotificationBox';
import Users from './components/Users';
import Blogs from './components/Blogs';
import MainMenu from './components/MainMenu'
import { getBlogs } from './reducers/blogReducer';
import { initUser } from './reducers/userReducer';
import ls from './utils/localStorage';
import './styles/form-elements.css';
import './styles/buttons.css';

const App = () => {
  const dispatch = useDispatch();

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
      <Router>
        <NotificationBox />
        <h2>Blogs</h2>
        <MainMenu ls={ls} />
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Blogs ls={ls} />
          </Route>
        </Switch>
        <footer style={{
          opacity: 0.2, fontSize: '12px', textAlign: 'center', marginTop: '-18px', marginBottom: '50px'
        }}>by Kai Forsman</footer>
      </Router>
    </div>
  );
};

export default App;