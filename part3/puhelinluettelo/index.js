require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(express.static('build'));
app.use(express.json());
morgan.token('body', (req, res) =>
    Object.keys(req.body).length
        ? JSON.stringify(req.body)
        : null
);
app.use(morgan(
    ':method :url :status :res[content-length] - :response-time ms :body'
));
app.use(cors());

const Contact = require('./models/contact');

app.get('/info', (req, res) => {
    Contact.count({}).then(total => {
        const time = new Date();
        res.send(`
            <p>Phonebook has info for ${total} people.</p>
            <p>${time}</p>
        `);
    })
    .catch(error => next(error));
});

app.get('/api/persons', (req, res) => {
    Contact.find({}).then(results => {
        res.json(results);
    })
    .catch(error => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
    Contact.findById(req.params.id).then(contact => {
        if(contact) {
            res.json(contact);
        } else {
            res.status(404).end();
        }
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
    Contact.findByIdAndRemove(req.params.id).then(result => {
        console.log('result', result);
        if(result) {
            res.status(204).end();
        } else {
            res.status(404).end();
        }
    })
    .catch(error => next(error));
});

app.post('/api/persons', (req, res) => {
    const contact = req.body;
    let error,
        errorStatus = 400,
        contacts = { persons: [] };
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

    const newContact = new Contact({
        name: contact.name,
        number: contact.number,
    });

    newContact.save().then(savedContact => {
        res.json(savedContact);
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body;
  
    const contact = {
        name: body.name,
        number: body.number,
    };
  
    Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
        .then(updatedContact => {
            res.json(updatedContact);
        })
        .catch(error => next(error));
});

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
    console.error(error.name);
    console.error(error.message);

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    } else {
        return res.status(500).send({ error: 'error occurred' });
    }
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});