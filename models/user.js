var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
  fc: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  town: {
    type: String,
    default: ''
  },
  fruit: {
    type: String,
    default: ''
  },
  device: {
    type: String,
    default: ''
  },
  note: {
    type: String,
    default: ''
  },
  online: {
    type: Boolean,
    default: false
  },
  discordId: String
})

module.exports = mongoose.model('User', userSchema)
