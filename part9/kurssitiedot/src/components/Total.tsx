import React from 'react';
import { CoursePart } from '../types';

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
    return (
        <p style={{fontWeight:700,paddingTop:'16px'}}>
            Number of exercises{" "}
            {courseParts.reduce((carry, part) => {
                if(!isNaN(part.exerciseCount)) return carry + part.exerciseCount;
                return carry;
            }, 0)}
        </p>
    );
};

export default Total;