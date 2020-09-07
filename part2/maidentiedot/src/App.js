import React, { useState, useEffect } from 'react';
import SearchField from './components/SearchField';
import SearchResults from './components/SearchResults';
import axios from 'axios';

const App = () => {
  const [ countries, setCountries ] = useState([]);
  const [ searchedCountries, setSearchedCountries ] = useState([]);
  const [ search, setSearch ] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      })
  }, []);

  const handleSearch = (e) => {
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

  const handleShowCountry = (country) => {
    setSearch(country.name);
    setSearchedCountries([country]);
  };

  return (
    <div className="App">
      <SearchField
        search={search}
        handleSearch={handleSearch} />
      <SearchResults
        searchR={searchedCountries}
        handleShowCountry={handleShowCountry} />
    </div>
  );
}

export default App;
