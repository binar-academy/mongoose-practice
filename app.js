const mongoose = require('mongoose');
const Kitten = require('./db/models/kitten');
const Person = require('./db/models/person');
mongoose.connect('mongodb://localhost/mongoose-tutorial', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connect success');
});

// instantiate an object from Kitten, this won't save it to database yet.
const silence = new Kitten({
  name: 'Silence',
  age: 1
});

// save the instantiated object, if the save process is successful, 
// the doc object will contains the document that just saved.
silence.save((err, doc) => {
  if(err) return console.log(err);
  console.log(`Kitten ${doc.name} is ${doc.age} year(s) old`);
});

// find all of kitten documents from MongoDB, the res object will 
// contains an Array object of kitten.
Kitten.find((err, res) => {
  if(err) return console.log(err);
  console.log(`Found ${res.length} kittens`);
  console.log(res);
});

// findOne will return a single object, so we need to check if the res object
// is null or not.
Kitten.findOne({ name: "Silence" }, (err, res) => {
  if(err) return console.log(err);
  if(!res) return console.log("Kitten not found");
  console.log(`Found kitten ${res.name}`);
});


// find one of document based on conditions, if the document is found then 
// update it with the new values, if the process is succesful, the doc object
// will return the old value of the updated document.
Kitten.findOneAndUpdate(
  { name: 'Silence' }, // conditions
  { name: 'Golden', age: 3 }, // new values
  (err, doc) => {
    if(err) return console.log(err);
    console.log(doc)
  }
);


const person = new Person();

// use the Virtual Property like other fields
person.fullName = 'Peter Griffin';

person.save((err, doc) => {
  if(err) return console.log(err);
  console.log(doc);
});

console.log(person.fullName);
// since the Virtual Property won't be shown by default, we need to add
// { virtuals : true } for showing the virtual fields.
console.log(person.toJSON({ virtuals: true }));
console.log(person.getInitial());

// using Static Method directly to the model
Person.getPersons((err, res) => {
  if(err) return console.log(err);
  console.log(res);
});
