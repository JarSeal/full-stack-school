import React from 'react';
import { CoursePart } from '../types';

const Part: React.FC<{ coursePart: CoursePart }> = ({ coursePart }) => {
    let description = null,
        groupProjectCount = null,
        exerciseSubmissionLink = null,
        length = null;
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };
    const newLineStyle = () => ({display:'inline-block',width: '100%'});
    const setDescription = (desc: string) => {
        description = <span style={newLineStyle()}>Description: {desc}</span>
    };
    switch(coursePart.name) {
        case 'Fundamentals':
            setDescription(coursePart.description);
            break;
        case 'Using props to pass data':
            groupProjectCount = <span style={newLineStyle()}>
                Group project count:
            {" " + coursePart.groupProjectCount}</span>
            break;
        case 'Deeper type usage':
            setDescription(coursePart.description);
            exerciseSubmissionLink = <a
                style={newLineStyle()}
                href={coursePart.exerciseSubmissionLink}>{coursePart.exerciseSubmissionLink}</a>
            break;
        case 'Lengthy course':
            setDescription(coursePart.description);
            length = <span style={newLineStyle()}>
                Length: {coursePart.length} {coursePart.length === 1 ? 'hour' : 'hours'}
            </span>
            break;
        default:
            return assertNever(coursePart);
    }
    return (
        <p>
            {coursePart.name}, {coursePart.exerciseCount}
            {coursePart.exerciseCount === 1 ? ' exercise' : ' exercises'}
            {description}
            {length}
            {groupProjectCount}
            {exerciseSubmissionLink}
        </p>
    );
};

export default Part;