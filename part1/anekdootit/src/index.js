import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const randomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const handleVote = (selected, anecdotes, render) => {
  anecdotes[selected].votes += 1;
  render();
};

const Buttons = ({selected, handleNext, anecdotes, render}) => {
  return <div>
    <button onClick={() => handleVote(selected, anecdotes, render)}>Vote</button>
    <button onClick={() => handleNext(randomInt(anecdotes.length))}>Next anecdote</button>
  </div>;
};

const Header = ({text}) => {
  return <h1>{text}</h1>;
};

const MostVotesAnecdote = ({anecdotes}) => {
  let mostIndex = 0,
      mostVotes = 0;
  anecdotes.forEach((item, index) => {
    if(mostVotes < item.votes) {
      mostVotes = item.votes;
      mostIndex = index;
    }
  });
  return <div>
    <Header text="Anecdote with most votes" />
    {mostVotes ? <>
      <p>{anecdotes[mostIndex].content}</p>
      <p>Has {mostVotes} votes</p>
    </>
    :
      <p>No votes yet.</p>
    }
  </div>;
};

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(randomInt(anecdotes.length));

  return (
    <div>
      <Header text="Anecdote of the day" />
      <p>{anecdotes[selected].content}</p>
      <p>Has {anecdotes[selected].votes} votes</p>
      <Buttons
        selected={selected}
        handleNext={setSelected}
        anecdotes={anecdotes}
        render={render} />
      <MostVotesAnecdote anecdotes={anecdotes} />
    </div>
  );
};

const anecdotes = [
  {
    content: 'If it hurts, do it more often',
    votes: 0,
  },
  {
    content: 'Adding manpower to a late software project makes it later!',
    votes: 0,
  },
  {
    content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 0,
  },
  {
    content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 0,
  },
  {
    content: 'Premature optimization is the root of all evil.',
    votes: 0,
  },
  {
    content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0,
  },
];

const render = () => {
  ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
  );
};

render();
