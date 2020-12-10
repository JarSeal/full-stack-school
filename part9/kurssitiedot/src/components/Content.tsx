import React from 'react';
import { CourseParts } from '../types';

const Content: React.FC<{ courseParts: CourseParts[] }> = ({ courseParts }) => {
    return (
        <div>
            {courseParts.map(
                p => <p key={p.name}>{p.name} {p.exerciseCount}</p>
            )}
        </div>
    );
};

export default Content;