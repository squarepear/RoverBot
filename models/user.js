var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
  info: {
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
    note: {
      type: String,
      default: ''
    }
  },
  online: {
    type: Boolean,
    default: false
  },
  discordId: Number
})

module.exports = mongoose.model('User', userSchema)
