import React from 'react';

const handleFilterChange = (e, setFilterVal) => {
    setFilterVal(e.target.value);
};

const Filter = ({filterVal, setFilterVal}) => {
    return <div>
        Filter shown with: <input value={filterVal} onChange={(e) => handleFilterChange(e, setFilterVal)} />
        {filterVal.length ? <button onClick={() => setFilterVal('')}>x</button> : null}
    </div>;
};

export default Filter;
