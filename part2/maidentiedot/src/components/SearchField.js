import React from 'react';

const SearchField = ({search, handleSearch}) => {
    return <div>
        Find countries <input value={search} onChange={(e) => handleSearch(e)} />
    </div>;
};

export default SearchField;
