const mongoose = require('mongoose');

const beatSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  tempo: {
    type: Number,
    required: true,
  },
  keyLetter: {
    type: String,
    required: true,
  },
  keyAccidental: String,
  keyScale: String,
  price: {
    type: Number,
    required: true,
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  catalog: [beatSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
