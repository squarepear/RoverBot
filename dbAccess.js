const fs = require('fs')

this.getUserInfo = function (userID) {
  return require('./db/' + userID + '.json')
}

this.setUserInfo = function (userID, info) {
  let dbPath = require('path').join(__dirname, 'db', userID + '.JSON')
  try {
    var newInfo = require(dbPath)
  } catch (e) {
    if (newInfo == null) {
      newInfo = {}
    }
  } finally {
    Object.keys(info).forEach(function (key) {
      newInfo[key] = info[key].trim()
    })
    console.log('Saving now')
    let dbData = JSON.stringify(newInfo, null, 2)
    console.log(dbData)
    fs.writeFileSync(dbPath, dbData, { flag: 'wx', encoding: 'utf8' }, function (err) {
      if (err) {
        if (err.code === 'EEXIST') {
          console.error('MyFile Existed')
        }
      }
    })
    console.log('saved')
  }
}
