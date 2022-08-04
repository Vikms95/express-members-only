const User = require('../models/User')
const Message = require('../models/Message')
const {body, validationResult} = require('express-validator')

exports.message_create_post = [
  body('title')
    .exists()
    .escape(),
  body('text')
    .exists()
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req)
    const message = new Message({
      user: req.user._id,
      title: req.body.title,
      text: req.body.text
    })

    if(!errors.isEmpty()) {
      res.render('create-message', {errors: errors.array()})
    } else {
      message.save(function(err) {
        res.redirect('/dashboard')
      })
    }
  }
]