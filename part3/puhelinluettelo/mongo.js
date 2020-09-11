const mongoose = require('mongoose');

if (process.argv.length<3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];

const url =
    `mongodb+srv://fullstack:${password}@cluster0.ey4jg.mongodb.net/<dbname>?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
});

const Contact = mongoose.model('Contact', contactSchema)

let contacts = {};

if(process.argv.length > 4) {
    const contact = new Contact({
        name: process.argv[3],
        number: process.argv[4],
    });
    contact.save().then(result => {
        console.log(`added ${result.name} ${result.number}`);
        mongoose.connection.close();
    }).catch(error => {
        console.log('Error in saving contact!');
        mongoose.connection.close();
    });
} else {
    Contact.find({}).then(results => {
        contacts.persons = results;
        console.log('phonebook:');
        results.forEach(contact => console.log(contact.name + " " + contact.number));
        mongoose.connection.close();
    }).catch(error => {
        console.log('Error in getting all contacts!');
        mongoose.connection.close();
    });
}
