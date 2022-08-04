const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref:'UserSchema', required: true},
  title: {type: String, required: true},
  timestamp: {type: Date},
  text: {type: String, required: true}
})


MessageSchema
  .virtual('url')
  .get(function() {
    return '/user/' + this._id
  })

module.exports = mongoose.model('MessageSchema', MessageSchema)