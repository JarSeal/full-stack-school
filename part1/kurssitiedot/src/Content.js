import React from 'react';
import Part from './Part';

const Content = (props) => {
    return <div>
        <Part part={props.part1} exerciseCount={props.exercises1} />
        <Part part={props.part2} exerciseCount={props.exercises2} />
        <Part part={props.part3} exerciseCount={props.exercises3} />
    </div>;
};

export default Content;