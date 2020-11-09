import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { newNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    if(!event.target.anecdote.value.trim().length) {
      props.newNotification({
        msg: 'You need to write something..',
        type: 2
      }, 2);
      return;
    };
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    props.createAnecdote(content);
    props.newNotification({
      msg: 'Created new anecdote: \'' + content + '\'',
      type: 1
    }, 8);
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

const mapDispatchToProps = {
  createAnecdote,
  newNotification
};

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm);
export default ConnectedAnecdoteForm;