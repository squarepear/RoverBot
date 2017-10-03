const fs = require('fs')
var Path = require(`path`).join(__dirname, 'db')

this.getUserInfo = function (userID) {
  return require('./db/' + userID + '.json')
}

this.setUserInfo = function (userID, info) {
  var newInfo = require('./db/' + userID + '.json')

  if (newInfo == null) {
    newInfo = {}
  }

  Object.keys(info).forEach(function (key) {
    newInfo.FriendCode = info[key].trim()
  })

  fs.writeFile('./db/' + userID + '.json', JSON.stringify(newInfo, null, 2), { flag: 'wx' }, function (err) {
    if (err) return console.log('ERROR: ' + err)
    console.log('writing to ' + './db/' + userID + '.json')
  })
}
