import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonsList from './components/PersonsList';
import Filter from './components/Filter';
import NewNumberForm from './components/NewNumberForm';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterVal, setFilterVal ] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterVal={filterVal} setFilterVal={setFilterVal} />
      <h3>Add a new</h3>
      <NewNumberForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber} />
      <h3>Numbers</h3>
      <PersonsList persons={persons} filterVal={filterVal} />
    </div>
  );
};

export default App;
