const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.static('build'));
morgan.token('body', (req, res) =>
    Object.keys(req.body).length
        ? JSON.stringify(req.body)
        : null
);
app.use(morgan(
    ':method :url :status :res[content-length] - :response-time ms :body'
));
app.use(cors());

let contacts = {
    persons: [
        {
          name: "Dan Abramov",
          number: "12-43-234345",
          id: 1
        },
        {
          name: "Mary Poppendieck",
          number: "39-23-6423122",
          id: 2
        },
        {
          name: "Risto",
          number: "123",
          id: 3
        },
        {
          name: "Skeba",
          number: "43432432432",
          id: 4
        },
        {
          name: "Pekka",
          number: "321343432",
          id: 5
        },
    ],
};

app.get('/info', (req, res) => {
    const time = new Date();
    res.send(`
        <p>Phonebook has info for ${contacts.persons.length} people.</p>
        <p>${time}</p>
    `);
});

app.get('/api/persons', (req, res) => {
  res.json(contacts.persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const contact = contacts.persons.find(contact => contact.id === id);
    if(contact) {
        res.json(contact);
    } else {
        res.status(404).end();
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    contacts.persons = contacts.persons.filter(contact => contact.id !== id);
    res.status(204).end();
});

const generateId = () => {
    return Math.floor((Math.random() * 1000000) + 1);
};

app.post('/api/persons', (req, res) => {
    const contact = req.body;
    let error,
        errorStatus = 400;
    if(!contact.name.trim()) {
        error = 'Name is missing.';
    } else
    if(!contact.number.trim()) {
        error = 'Number is missing.';
    } else
    if(contacts.persons.find(person =>
        person.name.toUpperCase() === contact.name.toUpperCase().trim())) {
        error = 'Name must be unique.';
    }

    if(error) return res.status(errorStatus).json({error});
    
    contacts.persons = contacts.persons.concat({
        name: contact.name,
        number: contact.number,
        id: generateId(),
    });
  
    res.json(contact);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});