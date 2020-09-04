import React, { useState } from 'react';
import PersonsList from './components/PersonsList';
import Filter from './components/Filter';
import NewNumberForm from './components/NewNumberForm';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterVal, setFilterVal ] = useState('');

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
