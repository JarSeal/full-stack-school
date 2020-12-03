import React, { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import Recommend from './components/Recommend';

let notificationTimer = null;

const App = () => {
  const [token, setToken] = useState(null);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState('authors');
  const [notification, setNotification] = useState({
    msg: '',
    type: 0,
    time: 0,
    running: false
  });

  useEffect(() => {
    const localToken = localStorage.getItem('bookbase-user-token');
    if(localToken) {
      setToken(localToken);
    }
  }, [setToken]);
  
  const client = useApolloClient();
  const logout = () => {
    setToken(null);
    localStorage.removeItem('bookbase-user-token');
    client.resetStore();
    setPage('authors');
    setNotification({
      msg: 'You are now logged out.',
      type: 1,
      time: 5000
    });
  };

  const clearNotification = () => {
    setNotification({
      msg: '',
      type: 0,
      time: 0,
      running: false
    });
  };

  if(notification.time > 0 && !notification.running) {
    setNotification({ ...notification, running: true });
    clearTimeout(notificationTimer);
    notificationTimer = setTimeout(() => {
      clearNotification();
    }, notification.time);
  } else if(notification.time === 0 && !notification.running) {
    setNotification({ ...notification, running: true });
    clearTimeout(notificationTimer);
  }

  const setNotificationStyle = () => {
    let colors = {};
    switch(notification.type) {
    case 1: colors = { color: 'green', border: '1px solid green' }; break;
    case 2: colors = { color: 'orange', border: '1px solid orange' }; break;
    case 3: colors = { color: 'red', border: '1px solid red' }; break;
    default: return {};
    }
    return Object.assign(
      {},
      { padding: '5px', maxWidth: '500px', cursor: 'pointer' },
      colors
    );
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token !== null ?
          <span>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button>
          </span> :
          <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <div style={setNotificationStyle()} onClick={clearNotification}>
        { notification.msg.length ? notification.msg : null }
      </div>

      <Authors
        show={page === 'authors'}
        setNotification={setNotification}
        token={token}
      />

      <Books
        show={page === 'books'}
        genres={genres}
        setGenres={setGenres}
      />

      { token !== null &&
        <Recommend
          show={page === 'recommend'}
          setNotification={setNotification}
          genres={genres}
        />
      }

      { token !== null &&
        <NewBook
          show={page === 'add'}
          setNotification={setNotification}
          genres={genres}
          setGenres={setGenres}
        />
      }

      { token === null &&
        <Login
          show={page === 'login'}
          setNotification={setNotification}
          setToken={setToken}
          setPage={setPage}
        />
      }

    </div>
  );
};

export default App;