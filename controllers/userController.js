const User = require('../models/User')
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')

exports.user_signup_post = [
  // Sanitize inputs
  // Store errors with validationResult(req)
  // Encrypt password
  // Create a User using the imported Model
  // If errors
    // Reload template with errors.array() passed in 
  // If no errors
    // Save the user to the database with user.save()
    // Redirect the user to the desired page within the user.save() callback

  body('username')
    .exists()
    .trim()
    .isAlphanumeric()
    .escape(),
  body('password')
    .exists(),
  body('password-confirm')
    .exists()
    .custom((value, {req}) => value === req.body.password)
    .withMessage('Passwords must match.')
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      res.render('index', {title:'Members Only', errors: errors.array()})
    } else {
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if(err) return next(err)
        const user = new User({
          fullname: req.body.fullname,
          username: req.body.username,
          password: hashedPassword,
        })
        user.save(function(err){
          res.redirect('/')
        })
      })
    }
  }
]