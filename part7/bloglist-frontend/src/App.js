import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import NotificationBox from './components/NotificationBox';
import Users from './components/Users';
import Blogs from './components/Blogs';
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
  opacity: 0.2;
  font-size: 12px;
  text-align: center;
  margin-top: -18px;
  margin-bottom: 50px;
`;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUser(ls));
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <AppWrapper>
      <Router>
        <NotificationBox />
        <h2>Blogs</h2>
        <MainMenu ls={ls} />
        <Switch>
          <Route path='/users'>
            <Users />
          </Route>
          <Route path='/'>
            <Blogs ls={ls} />
          </Route>
        </Switch>
        <Footer>by Kai Forsman</Footer>
      </Router>
    </AppWrapper>
  );
};

export default App;