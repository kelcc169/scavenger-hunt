const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema ({
  name: String,
  latitude: Number,
  longitude: Number,
  pictureUrl: String,
  listIndex: Number
})

const Location = mongoose.model('Location', locationSchema)

module.exports = Location;