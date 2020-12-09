import React from "react";

const Content: React.FC = (props) => {
    return (
        <div>
            {props.courseParts.map(
                p => <p key={p.name}>{p.name} {p.exerciseCount}</p>
            )}
        </div>
    );
};

export default Content;