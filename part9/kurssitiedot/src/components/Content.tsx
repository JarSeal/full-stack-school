import React from 'react';
import Part from './Part';
import { CoursePart } from '../types';

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
    return (
        <div>
            {courseParts.map(
                p => <Part key={p.name} coursePart={p} />
            )}
        </div>
    );
};

export default Content;