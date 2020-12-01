import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  const books = result.data
    ? result.data.allBooks
    : [];

  if(result.loading)  {
    return (<div>
      <h2>books</h2>
      loading...
    </div>);
  }

  return (
    <div>
      <h2>books</h2>
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
  );
};

export default Books;