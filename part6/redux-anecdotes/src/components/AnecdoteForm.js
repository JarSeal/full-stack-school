import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    if(!event.target.anecdote.value.trim().length) return;
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createAnecdote(content));
  };

  return (
    <div className='anecdote-form'>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input
            className='anecdote-input'
            name='anecdote' />
        </div>
        <button className='anecdote-submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;