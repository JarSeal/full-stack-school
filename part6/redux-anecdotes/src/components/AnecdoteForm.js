import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { newNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    if(!event.target.anecdote.value.trim().length) {
      dispatch(newNotification({
        msg: 'You need to write something..',
        type: 2
      }, 2));
      return;
    };
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createAnecdote(content));
    dispatch(newNotification({
      msg: 'Created new anecdote: \'' + content + '\'',
      type: 1
    }, 8));
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