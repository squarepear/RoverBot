const jsonfile = require('jsonfile')

this.getUserInfo = function (userID) {
  let dbPath = require('path').join(__dirname, 'db', userID + '.JSON')
  let data = jsonfile.readFileSync(dbPath)
  return data
}

this.setUserInfo = function (userID, info) {
  let dbPath = require('path').join(__dirname, 'db', userID + '.JSON')
  var newInfo
  try {
    newInfo = require(dbPath)
  } catch (e) {
    if (newInfo == null) {
      newInfo = {}
    }
  } finally {
    Object.keys(info).forEach(function (key) {
      newInfo[key] = info[key].trim()
    })
    jsonfile.writeFileSync(dbPath, newInfo)
  }
}
