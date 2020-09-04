import React from 'react';

const handleSubmit = (e, newName, setNewName, newNumber, setNewNumber, persons, setPersons) => {
    e.preventDefault();
    newName = newName.trim();
    newNumber = newNumber.trim();
    if(!newName.length) {
        alert('Name cannot be empty!');
        return;
    } else if(!newNumber.length) {
        alert('Number cannot be empty!');
        return;
    } else if(persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
        alert(`${newName} is already added to phonebook!`);
        return;
    }

    setPersons(persons.concat({
        name: newName,
        number: newNumber,
    }));
    setNewName('');
    setNewNumber('');
};

const NewNumberForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {
    return <form onSubmit={(e) => handleSubmit(e, newName, setNewName, newNumber, setNewNumber, persons, setPersons)}>
        <div>
            name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
            number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>;
};

export default NewNumberForm;
