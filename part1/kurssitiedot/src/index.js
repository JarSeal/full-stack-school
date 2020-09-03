import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({courseName}) => {
  return <h1>{courseName}</h1>;
};

const Content = ({parts}) => {
  const allParts = [];
  parts.forEach(({name, exercises}) => {
      allParts.push(
          <Part part={name} exerciseCount={exercises} key={name.replace(" ", "")} />
      );
  });
  return <div>{allParts}</div>;
};

const Part = ({part, exerciseCount}) => {
  return <p>{part} {exerciseCount}</p>;
};

const Total = ({parts}) => {
  let total = 0;
  parts.forEach(({exercises}) => {
      total += exercises;
  });
  return <p>
      Number of exercises {total}
  </p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
    ],
  };

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));
