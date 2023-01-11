const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarScheme = new Schema({
    categories: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  registrationNo: {
    type: String,
    required: true
  },
  make: {
    type: String,
    required: true
  },
  image: {
    type:String,
    required:true
  },
  background:{
    type:String,
    required:true
  }
});
const Car=mongoose.model('Cars',CarScheme);
module.exports = Car;
