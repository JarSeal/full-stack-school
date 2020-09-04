import React from 'react';

const handleSearch = (e, countries, setSearchedCountries, setSearch) => {
    let value = e.target.value.toUpperCase();
    setSearch(e.target.value);
    if(!value.length) {
        setSearchedCountries([]);
        return;
    }
    setSearchedCountries(
        countries.filter(
            country => country.name.toUpperCase().includes(value)
        )
    );
};

const SearchField = ({countries, setSearchedCountries, search, setSearch}) => {
    return <div>
        Find countries <input value={search} onChange={(e) => handleSearch(e, countries, setSearchedCountries, setSearch)} />
    </div>;
};

export default SearchField;
