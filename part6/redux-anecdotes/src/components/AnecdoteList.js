import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Filter from './Filter';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { newNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter);
  let anecdotes = useSelector(state => state.anecdotes);
  const dispatch = useDispatch();

  if(filter.length > 2) {
    anecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()));
  }

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(newNotification({
      msg: 'You voted \'' + anecdote.content + '\'',
      type: 1
    }));
  };

  return (
    <div className='anecdote-list'>
      <Filter />
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}&nbsp;
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnecdoteList;