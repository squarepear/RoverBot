var mongoose = require('mongoose')
var User = require('./models/user')

// const JsonDB = require('node-json-db')
// var friendcodeDB = new JsonDB('./db/friendcodeDB', true, true)
// var onlineDB = new JsonDB('./db/onlineDB', true, true)

this.getUserInfo = function (userID) {
  User.findOne({ 'discordId' : userID }, (err, user) => {
    if (err) {
      throw err
    }
    console.log('1: ' + user)
    if (!user) {
      user = new User()
      user.discordId = userID
      user.save(function (err) {
        if (err) {
          throw err
        }
      })
    }
    console.log('2: ' + user)
    return user
  })

  // friendcodeDB.reload()
  // try {
  //   return friendcodeDB.getData(`/${userID}`)
  // } catch (e) {
  //   return ''
  // }
}

this.setUserInfo = function (userID, info) {
  Object.keys(info).forEach(key => {
    User.findOneAndUpdate({ 'discordId' : userID }, { key : info[key] }, (err, resp) => {
      if (err) {
        throw err
      }
    })

    // friendcodeDB.push(`/${userID}/${key}/`, info[key])
  })
}

// Online Towns DB

this.setOnlineTown = function (userID) {
  User.findOne({ 'discordId' : userID }, (err, user) => {
    if (err) {
      throw err
    }

    if (user.online) {
      return 'alreadyOnline'
    } else {
      User.findOneAndUpdate({ 'discordId' : userID }, { 'online' : true }, (err, resp) => {
          if (err) {
            throw err
          }

          return 'online'
      })
    }
  })

  // let townsOnline = this.getOnlineTowns()
  //
  // for (var i = townsOnline.length - 1; i >= 0; i--) {  // Checks if town already online
  //   if (townsOnline[i] === userID) {
  //     return 'alreadyOnline'
  //   }
  // }
  //
  // onlineDB.push(`/online[]`, userID)  // If na, push this
  // return 'pushed'
}

this.setOfflineTown = function (userID) {
  User.findOne({ 'discordId' : userID }, (err, user) => {
    if (err) {
      throw err
    }

    if (!user.online) {
      return 'alreadyOffline'
    } else {
      User.findOneAndUpdate({ 'discordId' : userID }, { 'online' : false }, (err, resp) => {
          if (err) {
            throw err
          }

          return 'offline'
      })
    }
  })

  // let townsOnline = this.getOnlineTowns()
  //
  // for (var i = townsOnline.length - 1; i >= 0; i--) {  // Checks is online
  //   if (townsOnline[i] === userID) {
  //     onlineDB.delete(`/online[${i}]`)
  //     return 'deleted'
  //   }
  // }
  // return 'alreadyOffline'
}

this.getOnlineTowns = function () {
  User.find({ 'online' : true }, (err, users) => {
    return users
  })

  // try {
  //   return onlineDB.getData('/online')
  // } catch (e) {
  //   return '[]'
  // }
}
