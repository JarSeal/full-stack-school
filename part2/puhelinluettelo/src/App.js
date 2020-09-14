import React, { useState, useEffect } from 'react';
import PersonsList from './components/PersonsList';
import Filter from './components/Filter';
import NewNumberForm from './components/NewNumberForm';
import numberService from './services/numberService';
import NotificationBox from './components/NotificationBox';

const App = () => {
  const [ note, setNote ] = useState({msg:"", type:0, length:0, phase:0});
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
        setLoadingList(false);
      })
      .catch(error => {
        console.log('Error in loading contacts!', error);
        setNote({
          msg: "Error in loading contacts!",
          type: 3,
          length: 0,
          phase: 1,
        });
        setLoadingList(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = newName.trim();
    const number = newNumber.trim();
    const existing = persons.filter(person => person.name.toUpperCase() === name.toUpperCase());
    if(!name.length) {
      setNote({
        msg: "Name cannot be empty!",
        type: 2,
        length: 4000,
        phase: 1,
      });
      return;
    } else if(!number.length) {
      setNote({
        msg: "Number cannot be empty!",
        type: 2,
        length: 4000,
        phase: 1,
      });
      return;
    } else if(!numberCheck.test(number)) {
      setNote({
        msg: "Number is in wrong format!",
        type: 2,
        length: 4000,
        phase: 1,
      });
      return;
    } else if(existing.length) {
      setNote({
        msg: `${existing[0].name} is already added to phonebook, replace the old number with a new one?`,
        type: 4,
        length: 0,
        phase: 1,
        action: () => {
          numberService.updateNumber(existing[0], number)
            .then(response => {
              setPersons(persons.map(person =>
                person.id === response.id ? response : person
              ));
              setNote({
                msg: "Number updated!",
                type: 1,
                length: 4000,
                phase: 1,
              });
              setNewName('');
              setNewNumber('');
            })
            .catch(error => {
              console.log('Error in updating a number!', error);
              setNote({
                msg: "Error in updating a number!",
                type: 3,
                length: 0,
                phase: 1,
              });
            });
        }
      });
      return;
    }
    numberService.create(name, number)
      .then(response => {
        setPersons(persons.concat(response));
        setNewName('');
        setNewNumber('');
        setLoadingList(false);
        setNote({
          msg: "Contact created!",
          type: 1,
          length: 4000,
          phase: 1,
        });
      })
      .catch(error => {
        console.log('Error in saving a new contact!', error);
        setNote({
          msg: "Error in saving a new contact!",
          type: 3,
          length: 0,
          phase: 1,
        });
      });
  };

  const handleDelete = (id, name) => {
    setNote({
      msg: `Delete ${name}?`,
      type: 4,
      length: 0,
      phase: 1,
      action: () => {
        numberService.remove(id)
          .then(response => {
            setPersons(persons.filter(person => person.id !== id));
            setNote({
              msg: "Contact removed!",
              type: 1,
              length: 4000,
              phase: 1,
            });
            setLoadingList(false);
          })
          .catch(error => {
            setPersons(persons.filter(person => person.id !== id));
            setNote({
              msg: `Information of ${name} has already been removed from the server.`,
              type: 3,
              length: 0,
              phase: 1,
            });
            setLoadingList(false);
          });
      }
    });
  };

  return (
    <div style={{fontFamily:"sans-serif",color:"#333"}}>
      <h2>Phonebook</h2>
      <NotificationBox note={note} setNote={setNote} />
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
