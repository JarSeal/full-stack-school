import React, { useState } from 'react';
import loginService from './../services/login';
import { useDispatch } from 'react-redux';
import { newNotification } from '../reducers/notificationReducer';

const Login = ({ user, setUser, ls }) => {
  const dispatch = useDispatch();

  const handleLogin = async (e, username, password, setUser, setUsername, setPassword, ls) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username, password,
      });
      setUser(user);
      ls.setItem('blogAppUser', JSON.stringify(user));
      setUsername('');
      setPassword('');
      dispatch(newNotification({
        msg: `Welcome ${user.name}!`,
        type: 1,
        length: 5000,
        phase: 1,
      }));
    } catch (exception) {
      dispatch(newNotification({
        msg: 'Wrong username or password!',
        type: 2,
        length: 5000,
        phase: 1,
      }));
    }
  };

  const loginForm = (username, password, setUser, setUsername, setPassword, ls) => {
    return (
      <div className="login-form form-wrapper">
        <h3>Login</h3>
        <form onSubmit={(e) => handleLogin(e, username, password, setUser, setUsername, setPassword, ls)}>
          <div className="form-elem form-elem__input-text">
            <label htmlFor="login-user">
              <span className="label-text">Username:</span>
              <input
                id="login-user"
                className="input-text"
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div className="form-elem form-elem__input-text">
            <label htmlFor="login-pass">
              <span className="label-text">Password:</span>
              <input
                id="login-pass"
                className="input-text"
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <div className="form-elem form-elem__submit">
            <button type="submit" id="login-button">login</button>
          </div>
        </form>
      </div>
    );
  };

  const handleLogout = (setUser, ls) => {
    ls.removeItem('blogAppUser');
    setUser(null);
    dispatch(newNotification({
      msg: 'You are now logged out!',
      type: 1,
      length: 5000,
      phase: 1,
    }));
  };

  const loginInfo = (user, setUser, ls) => {
    return (
      <div className="logged-in-bar" style={{
        marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px dashed #bbb'
      }}>
        {user.name} logged in
        &nbsp;
        <button onClick={() => handleLogout(setUser, ls)}>logout</button>
      </div>
    );
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-wrapper">
      { user === null
        ? loginForm(username, password, setUser, setUsername, setPassword, ls)
        : loginInfo(user, setUser, ls)
      }
    </div>
  );
};

export default Login;