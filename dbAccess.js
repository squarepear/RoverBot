const JsonDB = require('node-json-db')
var friendcodeDB = new JsonDB('./db/friendcodeDB', true, true)
var onlineDB = new JsonDB('./db/onlineDB', true, true)

// Friend Code DB

this.getUserInfo = function (userID) {
  friendcodeDB.reload()
  try {
    return friendcodeDB.getData(`/${userID}`)
  } catch (e) {
    return ''
  }
}

this.setUserInfo = function (userID, info) {
  friendcodeDB.push(`/${userID}/`, info)
}

// Online Towns DB

this.setOnlineTown = function (userID) {
  onlineDB.push(`[]`, userID)
}

this.setOfflineTown = function (userID) {
  onlineDB.delete(`[]`, userID)
}

this.getOnlineTown = function () {
  try {
    return onlineDB.getData('[]')
  } catch (e) {
    return ''
  }
}
