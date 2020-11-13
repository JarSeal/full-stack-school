import userService from '../services/user';
import blogService from '../services/blogs';
import { newNotification } from './notificationReducer';

export const initUser = (ls, location, history) => {
  return dispatch => {
    let user = null;
    ls.initLocalStorage();
    const loggedUserJSON = ls.getItem('blogAppUser');
    if(loggedUserJSON) {
      user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
    } else {
      if(location.pathname !== '' && location.pathname !== '/' && !location.pathname.includes('/blogs/')) {
        history.push('/');
      }
    }
    dispatch({
      type: 'LOGIN',
      data: user
    });
  };
};

export const login = (credentials, setUsername, setPassword, ls) => {
  return async dispatch => {
    let user = null;
    try {
      user = await userService.login(credentials);
      blogService.setToken(user.token);
      ls.setItem('blogAppUser', JSON.stringify(user));
      setUsername('');
      setPassword('');
      dispatch(newNotification({
        msg: `Welcome ${user.name}!`,
        type: 1,
      }));
    } catch (exception) {
      dispatch(newNotification({
        msg: 'Wrong username and/or password!',
        type: 2,
      }));
    }
    dispatch({
      type: 'LOGIN',
      data: user
    });
  };
};

export const logout = (ls) => {
  return dispatch => {
    ls.removeItem('blogAppUser');
    dispatch(newNotification({
      msg: 'You are now logged out!',
      type: 1,
    }));
    dispatch({
      type: 'LOGOUT'
    });
  };
};

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data;
  case 'LOGOUT':
    return null;
  default:
    return state;
  }
};

export default userReducer;