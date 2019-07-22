const mongoose = require('mongoose');

const listSchema = new mongoose.Schema ({
  name: String,
  locations: [{type: mongoose.Schema.Types.ObjectId, ref: "Location"}],
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

const List = mongoose.model('List', listSchema);

module.exports = List;