// Import necessary libraries
const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const mongoose = require('mongoose')

require('dotenv').config()

// Setup database
const DEV_URI = 'mongodb+srv://vikms:ustdedt8@cluster0.uhrhj8a.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(
  process.env.MONGODB_URI || DEV_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(console.log(proces.env.MONGODB_URI))
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error'))

// Import routes
var router = require('./routes/index');
const User = require('./models/User');

// Initialize app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// setup passport
app.use(session(
  {
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized: true,
  })
)
  
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({username: username}, (err, user) =>{
      if(err) {
        return done(err)
      }
      if(!user) {
        return done(null, false, {message: 'Incorrect username'})
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if(res) {
          return done(null, user)
        } else {
          return done(null, false, {message: 'Incorrect password'})
        }
      })
    } )
  })
)
passport.serializeUser(function(user, done) {
  done(null, user.id)
})
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user)
  })
})
app.use(passport.initialize())
app.use(passport.session())

// setup application level middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// make user available to all the app
app.use(function(req, res, next) {
  res.locals.currentUser = req.user
  next()
})


// routes where router specific middleware and controllers are declared
app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
