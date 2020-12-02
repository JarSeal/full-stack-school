import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const Login = (props) => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      props.setNotification({
        msg: error.message,
        type: 2,
        time: 0,
        running: false
      });
    }
  });

  useEffect(() => {
    if(result.data) {
      const token = result.data.login.value;
      props.setToken(token);
      localStorage.setItem('bookbase-user-token', token);
      props.setNotification({
        msg: 'You are now logged in.',
        type: 1,
        time: 5000
      });
      props.setPage('authors');
    }
  }, [result.data]) // eslint-disable-line

  if(!props.show) {
    return null;
  }

  const handleLogin = (e) => {
    e.preventDefault();

    if(!username.trim().length) {
      props.setNotification({
        msg: 'Username is required.',
        type: 2,
        time: 5000
      });
      return;
    }
    if(!password.trim().length) {
      props.setNotification({
        msg: 'Password is required.',
        type: 2,
        time: 5000
      });
      return;
    }

    login({ variables: { username, password } });
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            type='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

export default Login;