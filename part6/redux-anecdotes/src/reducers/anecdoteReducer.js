import anecdoteService from '../services/anecdotes';

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    });
  };
};

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const response = await anecdoteService.vote(newAnecdote);
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: response
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_NOTES',
      data: anecdotes,
    });
  };
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [ ...state, action.data ];
    case 'VOTE_ANECDOTE':
      const newState = state.map(anecdote => {
        if(anecdote.id === action.data.id) return action.data;
        return anecdote;
      });
      return newState;
    case 'INIT_NOTES':
      return action.data;
    default:
      return state;
  };
};

export default anecdoteReducer;