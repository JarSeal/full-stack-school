import React, { useState, useEffect } from 'react';
import PersonsList from './components/PersonsList';
import Filter from './components/Filter';
import NewNumberForm from './components/NewNumberForm';
import numberService from './services/numberService';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterVal, setFilterVal ] = useState('');
  const [ loadingList, setLoadingList ] = useState(true);
  const numberCheck = new RegExp(/^(\d+-?)+\d+$/);

  useEffect(() => {
    numberService.getAll()
      .then(response => {
        setPersons(response);
      })
      .catch(error => {
        console.log('Error in getting all contacts!', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = newName.trim();
    const number = newNumber.trim();
    const existing = persons.filter(person => person.name.toUpperCase() === name.toUpperCase());
    if(!name.length) {
      alert('Name cannot be empty!');
      return;
    } else if(!number.length) {
      alert('Number cannot be empty!');
      return;
    } else if(!numberCheck.test(number)) {
      alert('Number is in wrong format!');
      return;
    } else if(existing.length) {
      if(window.confirm(`${existing[0].name} is already added to phonebook, replace the old number with a new one?`)) {
        numberService.updateNumber(existing[0], number)
          .then(response => {
            console.log('db updated', response);
            setPersons(persons.map(person =>
              person.id === response.id ? response : person
            ));
          })
          .catch(error => {
            console.log('Error in updating number!', error);
          });
      }
      setNewName('');
      setNewNumber('');
      return;
    }
    numberService.create(name, number)
      .then(response => {
        setPersons(persons.concat(response));
        setNewName('');
        setNewNumber('');
        setLoadingList(false);
      })
      .catch(error => {
        console.log('Error in saving new contact!', error);
      });
  };

  const handleDelete = (id, name) => {
    if(window.confirm(`Delete ${name}?`)) {
      numberService.remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          console.log('Error in removing id ' + id + '.', error);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterVal={filterVal} setFilterVal={setFilterVal} />
      <h3>Add a new</h3>
      <NewNumberForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit} />
      <h3>Numbers</h3>
      <PersonsList
        persons={persons}
        filterVal={filterVal}
        loadingList={loadingList}
        handleDelete={handleDelete} />
    </div>
  );
};

export default App;
