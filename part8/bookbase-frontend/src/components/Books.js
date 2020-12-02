import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [ genreFilter, setGenreFilter ] = useState({});
  const result = useQuery(ALL_BOOKS, { variables: genreFilter });

  const books = result.data
    ? result.data.allBooks
    : [];

  useEffect(() => {
    if(books) {
      let genresList = [],
        genresListWCount = [];
      books.map(b => {
        b.genres.map(g => {
          const index = genresList.indexOf(g);
          if(index === -1) {
            genresList.push(g);
            genresListWCount.push({g, c: 1});
          } else {
            genresListWCount[index].c++;
          }
          return null;
        });
        return null;
      });
      props.genres.map(genre => {
        const index = genresList.indexOf(genre.g);
        if(index === -1) {
          genresList.push(genre.g);
          genresListWCount.push({g: genre.g, c: 1});
        }
        return null;
      });
      console.log('CHECK UPDATE', genresListWCount.toString() !== props.genres.toString(), books, props.genres);
      if(genresListWCount.toString() !== props.genres.toString()) {
        console.log('Updating************************************', props.genres, genresListWCount);
        props.setGenres(genresListWCount);
      }
    }
  }, [books, props]);

  if(!props.show) {
    return null;
  }

  if(result.loading)  {
    return (<div>
      <h2>books</h2>
      loading...
    </div>);
  }

  const displayGenreSelection = () => {
    if(!books || !props.genres.length) return null;
    let genreList = props.genres.sort((a, b) => {
      return b.c - a.c === 0
        ? a.g.toLowerCase().localeCompare(b.g.toLowerCase())
        : b.c - a.c;
    }).map(g =>
      <button
        key={g.g}
        onClick={() => setGenreFilter({genre:g.g})}
        style={{fontWeight: genreFilter.genre === g.g ? '700' : '400'}}>
        {g.g}{g.c > 1 ? ' ('+g.c+')' : null}
      </button>
    );
    genreList = genreList.concat(
      <button
        key='allGenresKey-fdhsakhfkdsa'
        onClick={() => setGenreFilter({})}
        style={{background: '#333', display: 'block', color: '#fff', borderColor: '#333'}}>
        All genres
      </button>
    );
    return genreList;
  };

  return (
    <div>
      <h2>books</h2>
      <div style={{maxWidth: '500px', display: 'inline-block', verticalAlign: 'top', marginRight: '20px'}}>
        <table>
          <tbody>
            <tr style={!books.length ? {display:'none'} : null}>
              <th>title</th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
            {books.length ? books.map(b =>
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ) : <tr><td colSpan='3' style={{color:'#ccc'}}>No books found..</td></tr>}
          </tbody>
        </table>
      </div>
      <div style={{
        maxWidth: '500px', minWidth: '300px', display: 'inline-block', verticalAlign: 'top', background: '#bbb', padding: '8px'
      }}>
        <h4 style={{marginTop: 0}}>{genreFilter.genre ? 'genre: '+genreFilter.genre : 'genres'}</h4>
        {displayGenreSelection()}
      </div>
    </div>
  );
};

export default Books;