const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const passport = require('passport');
const User = require('../models/User');
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
  res.render('dashboard', {membership: req.user.membership})
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

module.exports = router;
