const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  UserName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  }
});
const USer=mongoose.model('User',UserSchema);
module.exports = USer;
