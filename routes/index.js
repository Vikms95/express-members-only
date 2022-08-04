var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Members Only' });
});

router.post('/', userController.user_signup_post)

router.get('/login', (req, res, next) => {
  res.render('login', {title:'Members Only'})
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}) )


module.exports = router;
