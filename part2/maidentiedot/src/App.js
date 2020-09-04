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

  return (
    <div className="App">
      <SearchField countries={countries} setSearchedCountries={setSearchedCountries} search={search} setSearch={setSearch} />
      <SearchResults searchR={searchedCountries} setSearch={setSearch} setSearchedCountries={setSearchedCountries} />
    </div>
  );
}

export default App;
