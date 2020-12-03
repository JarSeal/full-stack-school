import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_BOOKS, ME, CHANGE_FAVORITE } from '../queries';

const Recommend = (props) => {
  const myData = useQuery(ME);
  let favGenre = myData.data ? myData.data.me.favGenre : null;
  const result = useQuery(ALL_BOOKS, { variables: favGenre ? { genre: favGenre } : {} });
  const [ changeGenre, setChangeGenre ] = useState(false);

  const [ setNewFavorite ] = useMutation(CHANGE_FAVORITE, {
    refetchQueries: [ { query: ME } ],
    onError: (error) => {
      props.setNotification({
        msg: error.message,
        type: 2,
        time: 0,
        running: false
      });
    }
  });

  const books = result.data
    ? result.data.allBooks
    : [];

  if(!props.show) {
    return null;
  }

  if(result.loading)  {
    return (<div>
      <h2>recommendations</h2>
      loading...
    </div>);
  }

  const handleChangeGenre = () => {
    setChangeGenre(!changeGenre);
  };
  
  const handleSetNewGenre = async (newFavorite) => {
    if(myData.data && myData.data.me) {
      const result = await setNewFavorite({ variables: { newFavorite } });
      if(result) {
        props.setNotification({
          msg: `New favorite genre (${newFavorite}) set.`,
          type: 1,
          time: 5000
        });
      }
    }
    handleChangeGenre();
  };

  return (
    <div>
      <h2>recommendations</h2>
      { !changeGenre ?
        <div>
          { favGenre && <span>Books in your favorite genre: <b>{favGenre}</b> </span> }
          { !favGenre && <span>You don't have a favorite genre yet. </span> }
          (<button
            style={{border:'none', background:'transparent', textDecoration:'underline', cursor:'pointer'}}
            onClick={handleChangeGenre}>Choose new favorite genre</button>)
        </div> :
        <div style={{background: '#bbb', padding: '8px'}}>
          <button
            style={{background: '#333', display: 'block', color: '#fff', borderColor: '#333'}}
            onClick={handleChangeGenre}>Cancel</button>
            &nbsp;Pick favorite genre:&nbsp;
          { props.genres.map(
            genre => <button
              onClick={() => handleSetNewGenre(genre.g)}
              key={genre.g}
              style={favGenre === genre.g ? {fontWeight: '700'} : {fontWeight: '400'}}>{genre.g}</button>)
          }
        </div>
      }
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

export default Recommend;