import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import NotificationBox from './components/NotificationBox';
import Users from './components/Users';
import User from './components/User';
import Blogs from './components/Blogs';
import SingleBlog from './components/SingleBlog';
import MainMenu from './components/MainMenu';
import { getBlogs } from './reducers/blogReducer';
import { initUser } from './reducers/userReducer';
import ls from './utils/localStorage';
import './styles/form-elements.css';
import './styles/buttons.css';

const AppWrapper = styled.div`
  font-family: sans-serif;
  color: #333;
  max-width: 960px;
  margin: 0 auto;
`;

const Footer = styled.footer`
  font-size: 12px;
  color: #ccc;
  text-align: center;
  margin-bottom: 50px;
  margin-top: 10px;
  padding-top: 20px;
  border-top: 2px dashed #bbb;
`;

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    dispatch(initUser(ls, location, history));
    dispatch(getBlogs());
  }, [dispatch, history, location]);

  return (
    <AppWrapper>
      <NotificationBox />
      <h2>My Blogs App</h2>
      <MainMenu ls={ls} />
      <Switch>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/blogs/:id'>
          <SingleBlog />
        </Route>
        <Route path='/'>
          <Blogs ls={ls} />
        </Route>
      </Switch>
      <Footer>by Kai Forsman</Footer>
    </AppWrapper>
  );
};

export default App;