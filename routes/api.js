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

// get all lists associated with user
router.get('/users/:id', (req, res) => {
  User.findById(req.params.id).populate('lists').exec( (err, user) => {
    if (err) res.json(err)
    res.json(user)
  })
})

// post a list
router.post('/:id/lists', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    let newList = new List({
      name: req.body.name,
    })
    newList.save( (err,list) => {
      user.lists.push(list)
      user.save()
      if (err) res.json(err)
      res.json(list)
    })
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

// delete a list
router.delete('/:uid/lists/:lid', (req, res) => {
  User.findById(req.params.uid, (err, user) => {
    user.lists.pull(req.params.lid)
    user.save( err => {
      if (err) res.json(err)
      List.findByIdAndDelete(req.params.lid, (err) => {
        if (err) res.json(err)
        res.json(user)
      })
    })
  })
})

router.get('/', (req, res) => {
  res.json({type: 'success', message: 'You accessed the protected api routes'})
});


module.exports = router;