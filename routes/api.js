const express = require('express');
const router = express.Router();
const User = require('../models/user');
const List = require('../models/list');
const Location = require('../models/location');

// get all lists from api
router.get('/lists', (req, res) => {
  List.find({}, (err, lists) => {
    if (err) res.json(err)
    res.json(lists)
  })
})

// get all the locations
router.get('/locations', (req, res) => {
  Location.find({}, (err, locations) => {
    if (err) res.json(err)
    res.json(locations)
  })
})

// get one list from the api and all associated locations
router.get('/lists/:id', (req, res) => {
  List.findById(req.params.id).populate('locations').exec( (err, list) => {
    if (err) res.json(err)
    res.json(list)
  })
})

// get one location (FOR TESTING PURPOSES)
router.get('/locations/:id', (req, res) => {
  Location.findById(req.params.id, (err, location) => {
    if (err) res.json(err)
    res.json(location)
  })
})

// post a list
router.post('/lists', (req, res) => {
  let newList = new List({
    name: req.body.name,
    // createdBy: user._id
  })
  newList.save( (err,list) => {
    if (err) res.json(err)
    res.json(list)
  })
})

// post a location
router.post('/lists/:id/locations', (req, res) => {
  List.findById(req.params.id, (err, list) => {
    let newLocation = new Location({
      latitude: req.body.lat,
      longitude: req.body.lng,
      pictureUrl: req.body.pictureUrl,
      listIndex: req.body.listIndex
    })
    newLocation.save( (err, location) => {
      list.locations.push(location)
      list.save( (err, list) => {
        if (err) res.json(err)
        res.json(list)
      })
    })
  })
})

// update? -maybe user, add completed lists to a user

// delete a list
router.delete('/lists/:id', (req, res) => {
  List.findByIdAndDelete(req.params.id, (err) => {
    if (err) res.json(err)
    res.json('deleted the list!')
  })
})

router.get('/', (req, res) => {
  res.json({type: 'success', message: 'You accessed the protected api routes'})
});


module.exports = router;