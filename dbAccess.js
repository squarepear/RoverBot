const fs = require('fs')
var Path = require(`path`).join(__dirname, 'db')

function getUserInfo (userID) {
  return require('./db/' + userID + '.json')
}

function setUserInfo (userID, info) {
  var newInfo = require('./db/' + userID + '.json')

  if (newInfo == null) {
    newInfo = {}
  }

  info.forEach(function (data) {
    newInfo.FriendCode = data.trim()
  })

  fs.writeFile('./db/' + userID + '.json', JSON.stringify(newInfo, null, 2), { flag: 'wx' }, function (err) {
    if (err) return console.log('ERROR: ' + err)
    console.log('writing to ' + './db/' + userID + '.json')
  })
}
