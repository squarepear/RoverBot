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
  friendcodeDB.push(`/${userID}/`, prevInfo, false)
}

// Online Towns DB

this.setOnlineTown = function (userID) {
  let townsOnline = this.getOnlineTown()

  for (var i = townsOnline.length - 1; i >= 0; i--) {  // Checks if town already online
    if (townsOnline[i] === userID) {
      return 'alreadyOnline'
    }
  }

  onlineDB.push(`/online[]`, userID)  // If na, push this
  return 'pushed'
}

this.setOfflineTown = function (userID) {
  let townsOnline = this.getOnlineTown()

  for (var i = townsOnline.length - 1; i >= 0; i--) {  // Checks is online
    if (townsOnline[i] === userID) {
      onlineDB.delete(`/online[${i}]`)
      return 'deleted'
    }
  }
  return 'alreadyOffline'
}

this.getOnlineTown = function () {
  try {
    return onlineDB.getData('/online')
  } catch (e) {
    return '[]'
  }
}
