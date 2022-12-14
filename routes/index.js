const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const messageController = require('../controllers/messageController')
const passport = require('passport');
const User = require('../models/User');
const Message = require('../models/Message');
require('dotenv').config()

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Members Only' });
});

router.post('/', userController.user_signup_post)

router.get('/login', (req, res, next) => {
  res.render('login', {title:'Members Only'})
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
}) )

router.get('/dashboard', (req, res, next) => {
  // Implement middleware to find all the messages to pass them down below
  Message
    .find()
    .populate('user')
    .exec(function(err, messages){
      if(err) return next(err)
      res.locals.currentUser = req.user
      res.render('dashboard', {messages: messages})
    })
})

router.get('/create-member', (req, res, next) => {
  res.render('create-member')
})

router.post('/create-member', (req, res, next) => {
  if(req.body.member_pass === process.env.MEMBER_PASS){
    const user = new User({
      _id: req.user._id,
      fullname: req.user.fullname,
      username: req.user.username,
      password: req.user.password,
      membership: 'member'
    })
    User
      .findByIdAndUpdate(req.user._id, user, {}, function(err){
        if(err) return next(err)
        res.redirect('/dashboard')
      })
    }
})

router.get('/create-admin', (req, res, next) => {
  res.render('create-admin')
})

router.post('/create-admin', (req, res, next) => {
  if(req.body.admin_pass === process.env.ADMIN_PASS){
    const user = new User({
      _id: req.user._id,
      fullname: req.user.fullname,
      username: req.user.username,
      password: req.user.password,
      membership: 'admin'
    })
    User
      .findByIdAndUpdate(req.user._id, user, {}, function(err){
        if(err) return next(err)
        res.redirect('/dashboard')
      })
  }
})

router.get('/create-message', (req, res, next) => {
  res.render('create-message')
})

router.post('/create-message', messageController.message_create_post)

router.get('/delete-message/:id', (req, res, next) => {
  res.render('delete-message')
})

router.post('/delete-message/:id', (req, res, next) => {
  Message
    .findByIdAndDelete(req.params.id, function(err){
      if(err) return next(err)
      res.redirect('/dashboard')
    })
})

router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})

module.exports = router;
