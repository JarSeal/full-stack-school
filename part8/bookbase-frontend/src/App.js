import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';

let notificationTimer = null;

const App = () => {
  const [page, setPage] = useState('authors');
  const [notification, setNotification] = useState({
    msg: '',
    type: 0,
    time: 0,
    running: false
  });

  const clearNotification = () => {
    setNotification({
      msg: '',
      type: 0,
      time: 0,
      running: false
    });
  };

  if(notification.time > 0 && !notification.running)  {
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
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <div style={setNotificationStyle()} onClick={clearNotification}>
        { notification.msg.length ? notification.msg : null }
      </div>

      <Authors
        show={page === 'authors'}
        setNotification={setNotification}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setNotification={setNotification}
      />

    </div>
  );
};

export default App;