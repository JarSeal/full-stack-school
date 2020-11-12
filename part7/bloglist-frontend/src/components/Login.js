import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/userReducer';

const Login = ({ ls }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e, username, password, setUsername, setPassword) => {
    e.preventDefault();
    dispatch(login({ username, password }, setUsername, setPassword, ls));
  };

  const loginForm = (username, password, setUsername, setPassword) => {
    return (
      <div className="login-form form-wrapper">
        <h3>Login</h3>
        <form onSubmit={(e) => handleLogin(e, username, password, setUsername, setPassword)}>
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

  return (
    <div className="login-wrapper">
      { user === null
        ? loginForm(username, password, setUsername, setPassword)
        : null
      }
    </div>
  );
};

export default Login;