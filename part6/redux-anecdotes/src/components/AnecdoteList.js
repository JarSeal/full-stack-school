import React from 'react';
import { connect } from 'react-redux';
import Filter from './Filter';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { newNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const filter = props.filter;
  let anecdotes = props.anecdotes;

  if(filter.length > 1) {
    anecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()));
  }

  const vote = (anecdote) => {
    props.voteAnecdote(anecdote);
    props.newNotification({
      msg: 'You voted \'' + anecdote.content + '\'',
      type: 1
    });
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

const mapDispatchToProps = {
  voteAnecdote,
  newNotification
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdoteList;