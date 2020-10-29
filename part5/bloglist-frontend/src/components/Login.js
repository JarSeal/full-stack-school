import React from 'react';
import loginService from './../services/login';

const handleLogin = async (e, username, password, setUser, setUsername, setPassword, setLoginNote, ls) => {
  e.preventDefault();
  try {
    const user = await loginService.login({
      username, password,
    });
    setUser(user);
    ls.setItem('blogAppUser', JSON.stringify(user));
    setUsername('');
    setPassword('');
    setLoginNote({
      msg: `Welcome ${user.name}!`,
      type: 1,
      length: 5000,
      phase: 1,
    });
  } catch (exception) {
    setLoginNote({
      msg: 'Wrong username or password!',
      type: 2,
      length: 5000,
      phase: 1,
    });
  }
};

const loginForm = (username, password, setUser, setUsername, setPassword, setLoginNote, ls) => {
  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={(e) => handleLogin(e, username, password, setUser, setUsername, setPassword, setLoginNote, ls)}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

const handleLogout = (e, setUser, setLoginNote, ls) => {
  ls.removeItem('blogAppUser');
  setUser(null);
  setLoginNote({
    msg: `You are now logged out!`,
    type: 1,
    length: 5000,
    phase: 1,
  });
};

const loginInfo = (user, setUser, setLoginNote, ls) => {
  return (
    <div className="logged-in-bar">
      {user.name} logged in
      &nbsp;
      <button onClick={(e) => handleLogout(e, setUser, setLoginNote, ls)}>logout</button>
    </div>
  );
};

const Login = ({user, username, password, setUser, setUsername, setPassword, setLoginNote, ls}) => {
  return (
    <div className="login-wrapper">
      { user === null
        ? loginForm(username, password, setUser, setUsername, setPassword, setLoginNote, ls)
        : loginInfo(user, setUser, setLoginNote, ls)
      }
    </div>
  );
};

export default Login;