const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
});

personSchema.virtual('fullName').get(function() {
  return this.firstName+' '+this.lastName;
});

personSchema.virtual('fullName').set(function(name) {
  const string = name.split(' ');

  this.firstName = string[0];
  this.lastName = string[1];
});

personSchema.methods.getInitial = function() {
  return this.firstName[0] + this.lastName[0];
};

personSchema.statics.getPersons = function(cb) {
  return this.find(
    {}, // empty object to find all of persons
    null, // no need to use projection
    { sort: "firstName" }, // ascending sort
    (err, res) => {
      cb(err, res);
    }
  );
}

module.exports = mongoose.model('Person', personSchema);
