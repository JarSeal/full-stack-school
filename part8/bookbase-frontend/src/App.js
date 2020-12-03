import React, { useState, useEffect } from 'react';
import { useApolloClient, useSubscription } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import Recommend from './components/Recommend';
import { ALL_BOOKS, BOOK_ADDED } from './queries';

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

  const client = useApolloClient();

  const updateBooksCacheWith = (client, addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.title).includes(object.title);

    const newBookGenres = addedBook.genres;
    newBookGenres.map(genre => {
      let dataInStore = null;
      try {
        dataInStore = client.readQuery({ query: ALL_BOOKS, variables: { genre } });
      } catch(e) {
        return null;
      }
      if(!includedIn(dataInStore.allBooks, addedBook)) {
        client.writeQuery({
          query: ALL_BOOKS,
          variables: { genre },
          data: {
            ...dataInStore,
            allBooks: [ ...dataInStore.allBooks, addedBook ]
          }
        });
      }
      return null;
    });

    const dataInStore = client.readQuery({ query: ALL_BOOKS, variables: {} });
    if(!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        variables: {},
        data: {
          ...dataInStore,
          allBooks: [ ...dataInStore.allBooks, addedBook ]
        }
      });
    }

    let tempGenres = genres.map(genre => genre);
    newBookGenres.forEach(newGenre => {
      let genreFound = false;
      tempGenres = tempGenres.map(genre => {
        if(newGenre === genre.g) {
          genreFound = true;
          return { g: genre.g, c: genre.c + 1 };
        }
        return genre;
      });
      if(!genreFound) {
        tempGenres = tempGenres.concat({ g: newGenre, c: 1 });
      }
    });
    setGenres(tempGenres);
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      setNotification({
        msg: `New book, ${addedBook.title}, added.`,
        type: 1,
        time: 8000
      });
      updateBooksCacheWith(client, addedBook);
    }
  });

  useEffect(() => {
    const localToken = localStorage.getItem('bookbase-user-token');
    if(localToken) {
      setToken(localToken);
    }
  }, [setToken]);
  
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
          updateBooksCacheWith={updateBooksCacheWith}
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