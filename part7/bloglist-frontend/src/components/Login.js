import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/userReducer';

const Login = ({ ls }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogin = (e, username, password, setUsername, setPassword, ls) => {
    e.preventDefault();
    dispatch(login({ username, password }, setUsername, setPassword, ls));
  };

  const loginForm = (username, password, setUsername, setPassword, ls) => {
    return (
      <div className="login-form form-wrapper">
        <h3>Login</h3>
        <form onSubmit={(e) => handleLogin(e, username, password, setUsername, setPassword, ls)}>
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

  const handleLogout = (ls) => {
    console.log('Getting before logout', user);
    dispatch(logout(ls));
    setTimeout(() => {
      console.log('Getting after logout', user);
    }, 2000);
  };

  const loginInfo = (user, ls) => {
    return (
      <div className="logged-in-bar" style={{
        marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px dashed #bbb'
      }}>
        {user.name} logged in
        &nbsp;
        <button onClick={() => handleLogout(ls)}>logout</button>
      </div>
    );
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-wrapper">
      { user === null
        ? loginForm(username, password, setUsername, setPassword, ls)
        : loginInfo(user, ls)
      }
    </div>
  );
};

export default Login;