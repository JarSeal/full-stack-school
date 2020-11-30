import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [authorToBeChanged, setAuthorToBeChanged] = useState('');
  const [newAuthorBirthYear, setNewAuthorBirthYear] = useState('');
  
  const [ modifyAuthor, modifyResult ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  });

  useEffect(() => {
    if(modifyResult.data && !modifyResult.data.editAuthor) {
      props.setNotification({
        msg: 'Error, author not found.',
        type: 3,
        time: 0,
        running: false
      });
    }
  }, [modifyResult.data])  // eslint-disable-line

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

    await modifyAuthor({ variables: {
      name: authorToBeChanged, setBornTo: parseInt(newAuthorBirthYear)
    }});

    setAuthorToBeChanged('');
    setNewAuthorBirthYear('');

    props.setNotification({
      msg: 'Author modified!',
      type: 1,
      time: 5000
    });
  };

  const birthYearForm = () => {
    if(!authors.length) return null;
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
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      { birthYearForm() }
    </div>
  );
};

export default Authors;
