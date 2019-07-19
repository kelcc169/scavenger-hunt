const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// route for signup
router.post('/signup', (req, res) => {
  // see if email is already in database
  User.findOne({email: req.body.email}, (err, user) => {
    if (user) {
      // if yes, return an error
      res.json({type: 'error', message: 'Email already exists'})
    } else {
      // if no, create a uesr
      let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      user.save( (err, user) => {
        if (err) {
          res.json({type: 'error', message: 'Database error while creating user'})
        } else {
          // sign a token (this is the login step)
          var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
            expiresIn: '1d'
          });
          //res.json the token - the browser needs to store this token
          res.status(200).json({type: 'success', user: user.toObject(), token})
        }
      })
    }
  })
})

//route for login
router.post('/login', (req, res) => {
  // find user in db by email
  User.findOne({email: req.body.email}, (err, user) => {
    if (!user) {
      // if not found, (err), return an error
      res.json({type: 'error', message: 'Account not found'})
    } else {
      // if found, check authentication
      if (user.authenticated(req.body.password)) {
        // if authenticated, sign a token (login)
        var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
          expiresIn: '1d'
        });
        // return the token to be saved by the browser
        res.status(200).json({type: 'success', user: user.toObject(), token})
      } else {
        res.json({type: 'error', message: 'Authentication failure'})
      }
    }
  })
})

// route for validating tokens
router.post('/me/from/token', (req, res) => {
  // make sure they sent us a token to check
  var token = req.body.token;
  if (!token) {
    // if no token, return an error
    res.json({type: 'error', message: 'You must submit a valid token'})
  } else {
    // if token, verify it
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      // if token invalid, return an error
      if (err) {
        res.json({type: 'error', message: 'Invalid token. Please log in again.'})
      } else {
        // if valid, look up user in db
        User.findById(user._id, (err, user) => {
          // if a user doesn't exist, return an error
          if (err) {
            res.json({type: 'error', message: 'Database error during validation'})
          } else {
            // right here, we could sign a new token, or we could just return the existing one
            // if user, send back user and existing token
            res.json({type: 'success', user: user.toObject(), token})
          }
        })
      }
    })
  }
})

module.exports = router;