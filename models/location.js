const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema ({
  name: String,
  latitude: Number,
  longitude: Number,
  pictureUrl: String,
  listId: {type: mongoose.Schema.Types.ObjectId, ref: "List"},
  listIndex: Number
})

const Location = mongoose.model('Location', locationSchema)

module.exports = Location;