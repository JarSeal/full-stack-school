import React from 'react';

const Header = ({courseName}) => {
    return <h2>{courseName}</h2>;
};

const Content = ({parts}) => {
    return <div>{
        parts.map(({name, exercises, id}) => {
            return <Part part={name} exerciseCount={exercises} key={id} />
        })
    }</div>;
};

const Part = ({part, exerciseCount}) => {
    return <p>{part} {exerciseCount}</p>;
};

const Total = ({parts}) => {
    return <p style={{fontWeight: 700}}>
        Number of exercises {
            parts.reduce((sum, part) => {
                return sum + part.exercises;
            }, 0)
        }
    </p>;
};

const Course = ({course}) => {
    return (
        <div>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

export default Course;