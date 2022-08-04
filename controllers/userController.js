const User = require('../models/User')
const {body, validationResult} = require('express-validator')

exports.user_signup_post = [
  // Sanitize inputs
  // 
  // 
  body('username'),
  body('password'),
  body('password-confirm'),

  (req, res, next) => {
  }
]