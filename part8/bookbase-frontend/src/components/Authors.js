import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [authorToBeChanged, setAuthorToBeChanged] = useState('');
  const [newAuthorBirthYear, setNewAuthorBirthYear] = useState('');
  
  const [ modifyAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
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
  };

  let authors = result.data
    ? result.data.allAuthors
    : [];

  if(result.loading)  {
    return (<div>
      <h2>authors</h2>
      loading...
    </div>);
  }

  const handleAuthorSelection = (e) => {
    const selectedAuthor = authors.filter(a => a.name === e.target.value);
    if(selectedAuthor.length && selectedAuthor[0].born) {
      setNewAuthorBirthYear(selectedAuthor[0].born);
    } else {
      setNewAuthorBirthYear('');
    }
    setAuthorToBeChanged(e.target.value);
  };

  const handleNewAuthorBirthYear = (e) => {
    setNewAuthorBirthYear(e.target.value);
  };

  const handleUpdateAuthorBirth = async (e) => {
    e.preventDefault();
    if(newAuthorBirthYear === '') {
      props.setNotification({
        msg: 'Birth year is required.',
        type: 2,
        time: 5000
      });
      return;
    }

    const result = await modifyAuthor({ variables: {
      name: authorToBeChanged, setBornTo: parseInt(newAuthorBirthYear)
    }});

    if(result) {
      setAuthorToBeChanged('');
      setNewAuthorBirthYear('');
      props.setNotification({
        msg: 'Author modified!',
        type: 1,
        time: 5000
      });
    }
  };

  const birthYearForm = () => {
    if(!authors.length || !props.token) return null;
    return (
      <form onSubmit={handleUpdateAuthorBirth}>
        <h2>Set birthyear</h2>
        <select
          value={authorToBeChanged}
          onChange={handleAuthorSelection}>
          <option
            key='no-selection'
            value={''}>
            Select an author..
          </option>
          {authors.map(a =>
            <option
              key={a.name}
              value={a.name}>
              {a.name}
            </option>
          )}
        </select>
        { authorToBeChanged.length > 0 &&
          <div>
            Born <input
                  type='number'
                  name='newAuthorBirthYear'
                  value={newAuthorBirthYear}
                  onChange={handleNewAuthorBirthYear} /><br />
            <button type='submit'>Update author</button>
          </div>
        }
      </form>
    );
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr style={!authors.length ? {display:'none'} : null}>
            <th>name</th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.length ? authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ) : <tr><td colSpan='3' style={{color:'#ccc'}}>No authors found..</td></tr>}
        </tbody>
      </table>
      { birthYearForm() }
    </div>
  );
};

export default Authors;
