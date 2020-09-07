import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherTemplate = (country) => {
    const apiKey = process.env.REACT_APP_WEATHER;
    const [ loading, setLoading ] = useState(true);
    const [ weatherData, setWeatherData ] = useState({});
    useEffect(() => {
        axios
            .get('http://api.weatherstack.com/current?access_key=' + apiKey + '&query=' + country.capital)
            .then(response => {
                setLoading(false);
                setWeatherData(response.data.current);
                console.log('promise fulfilled', response.data);
            });
    }, [apiKey, country.capital]);
    return <div>
        <h3>Weather in {country.capital}</h3>
        {
            loading
                ? <div>Loading...</div>
                : <div>
                    <div>
                        <span style={{fontWeight:'bold'}}>Temperature: </span>
                        {weatherData.temperature} Celcius
                    </div>
                    <div>
                        <img src={weatherData.weather_icons} alt={'Weather icon'} />
                    </div>
                    <div>
                        <span style={{fontWeight:'bold'}}>Wind: </span>
                        {weatherData.wind_speed} mph direction {weatherData.wind_dir}
                    </div>
                </div>
        }
    </div>;
};

const CountryTemplate = (data) => {
    return <div>
        <h2>{data.name}</h2>
        <div>Capital: {data.capital}</div>
        <div>Population: {data.population}</div>
        <h3>Languages</h3>
        <ul>
            {
                data.languages.map(lang => <li key={lang.name}>{lang.name}</li>)
            }
        </ul>
        <img src={data.flag} alt={"Flag of " + data.name} style={{height: "100px", boxShadow: "1px 2px 15px rgba(0,0,0,0.3)"}} />
        {WeatherTemplate(data)}
    </div>;
};

const SearchResults = ({searchR, handleShowCountry}) => {
    let result = '';
    if(searchR.length === 1) {
        result = CountryTemplate(searchR[0]);
    } else if(searchR.length > 10) {
        result = 'Too many matches, specify another filter';
    } else {
        result = searchR.map(
            country => <div key={country.numericCode}>
                {country.name} <button onClick={() => handleShowCountry(country)}>show</button>
            </div>
        );
    }

    return <div>
        {result}
    </div>;
};

export default SearchResults;
