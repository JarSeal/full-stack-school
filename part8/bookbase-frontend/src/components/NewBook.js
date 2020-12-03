import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, ADD_BOOK } from '../queries';

const NewBook = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [ createBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    update: (store, response) => {
      const newBook = response.data.addBook;
      props.updateBooksCacheWith(store, newBook);
      // const newBookGenres = newBook.genres;
      // newBookGenres.map(genre => {
      //   let dataInStore = null;
      //   try {
      //     dataInStore = store.readQuery({ query: ALL_BOOKS, variables: { genre } });
      //   } catch(e) {
      //     return null;
      //   }
      //   store.writeQuery({
      //     query: ALL_BOOKS,
      //     variables: { genre },
      //     data: {
      //       ...dataInStore,
      //       allBooks: [ ...dataInStore.allBooks, newBook ]
      //     } 
      //   });
      //   return null;
      // });
      // const dataInStore = store.readQuery({ query: ALL_BOOKS, variables: {} });
      // store.writeQuery({
      //   query: ALL_BOOKS,
      //   variables: {},
      //   data: {
      //     ...dataInStore,
      //     allBooks: [ ...dataInStore.allBooks, newBook ]
      //   }
      // });
      // let tempGenres = props.genres.map(genre => genre);
      // newBookGenres.forEach(newGenre => {
      //   let genreFound = false;
      //   tempGenres = tempGenres.map(genre => {
      //     if(newGenre === genre.g) {
      //       genreFound = true;
      //       return { g: genre.g, c: genre.c + 1 };
      //     }
      //     return genre;
      //   });
      //   if(!genreFound) {
      //     tempGenres = tempGenres.concat({ g: newGenre, c: 1 });
      //   }
      // });
      // props.setGenres(tempGenres);
    },
    onError: (error) => {
      props.setNotification({
        msg: error.message,
        type: 2,
        time: 0,
        running: false
      });
    }
  });

  if(!props.show) {
    return null;
  }

  const validateNewBook = () => {
    if(!title.length) {
      props.setNotification({
        msg: 'Title is required.',
        type: 2,
        time: 5000,
      });
      return false;
    } else if(!author.length) {
      props.setNotification({
        msg: 'Author is required.',
        type: 2,
        time: 5000,
      });
      return false;
    } else if(!published.length) {
      props.setNotification({
        msg: 'Published year is required.',
        type: 2,
        time: 5000,
      });
      return false;
    }
    return true;
  };

  const submit = async (event) => {
    event.preventDefault();

    if(validateNewBook()) {
      const result = await createBook({ variables: { title, published: parseInt(published), author, genres } });
      if(result) {
        setTitle('');
        setPublished('');
        setAuthor('');
        setGenres([]);
        setGenre('');

        props.setNotification({
          msg: 'New book created!',
          type: 1,
          time: 5000
        });
      }
    }
  };

  const addGenre = () => {
    const g = genre.trim();
    if(g.length) {
      setGenres(genres.concat(g));
      setGenre('');
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  );
};

export default NewBook;