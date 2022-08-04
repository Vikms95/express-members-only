const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  fullname: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  membership: {type: String}
  // Should I store a messages array? 
  // Would it be a string or an id?
})

UserSchema
  .virtual('url')
  .get(function() {
    return '/user/' + this._id
  })

module.exports = mongoose.model('UserSchema', UserSchema)