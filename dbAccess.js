const fs = require('fs')

this.getUserInfo = function (userID) {
  return require('./db/' + userID + '.json')
}

this.setUserInfo = function (userID, info) {
  try {
    var newInfo = require('./db/' + userID + '.json')
  } catch (e) {
    if (newInfo == null) {
      newInfo = {}
    }
  } finally {
    Object.keys(info).forEach(function (key) {
      newInfo.FriendCode = info[key].trim()
    })
    console.log('Saving now')
    fs.writeFileSync('./db/' + userID + '.json', JSON.stringify(newInfo, null, 2), { flag: 'wx' }, function (err) {
      if (err) return console.log('ERROR: ' + err)
      console.log('writing to ' + './db/' + userID + '.json')
    })
    console.log('saved')
  }
}
