import React from 'react';
import Part from './Part';

const getParts = (parts) => {
    const allParts = [];
    parts.forEach(({name, exercises}) => {
        allParts.push(
            <Part part={name} exerciseCount={exercises} key={name.replace(" ", "")} />
        );
    });
    return allParts;
};

const Content = (props) => {
    return <div>{getParts(props.parts)}</div>;
};

export default Content;