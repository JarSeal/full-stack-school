import React from 'react';

const totalExercises = (parts) => {
    let total = 0;
    parts.forEach(({exercises}) => {
        if(exercises) total += exercises;
    });
    return total;
};

const Total = (props) => {
    return <p>
        Number of exercises {totalExercises(props.parts)}
    </p>;
};

export default Total;