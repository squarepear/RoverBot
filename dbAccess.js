var User = require('./models/user')

this.getUserInfo = (userID) => {
  return new Promise((resolve, reject) => {
    User.findOne({ 'discordId' : userID }, (err, user) => {
      if (err) reject(err)

      if (!user) {
        user = new User()
        user.discordId = userID
        user.save(function (err) {
          if (err) reject(err)
        })
      }

      resolve(user)
    })
  })
}

this.getUserInfoFromFC = (fc) => {
  return new Promise((resolve, reject) => {
    User.findOne({ 'fc' : fc }, (err, user) => {
      if (err) reject(err)

      resolve(user)
    })
  })
}

this.setUserInfo = (userID, info) => {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ 'discordId' : userID }, info, (err, resp) => {
      if (err) reject(err)

      resolve(resp)
    })
  })
}

this.setOnlineTown = (userID) => {
  return new Promise((resolve, reject) => {
    User.findOne({ 'discordId' : userID }, (err, user) => {
      if (err) reject(err)

      if (!user) {
        user = new User()
        user.discordId = userID
        user.save(function (err) {
          if (err) reject(err)
        })
      }

      if (user.online) {
        resolve('alreadyOnline')
      } else {
        User.findOneAndUpdate({ 'discordId' : userID }, { 'online' : true }, (err, resp) => {
            if (err) reject(err)

            resolve('online')
        })
      }
    })
  })
}

this.setOfflineTown = (userID) => {
  return new Promise((resolve, reject) => {
    User.findOne({ 'discordId' : userID }, (err, user) => {
      if (err) reject(err)

      if (!user) {
        user = new User()
        user.discordId = userID
        user.save(function (err) {
          if (err) reject(err)
        })
      }

      if (!user.online) {
        resolve('alreadyOffline')
      } else {
        User.findOneAndUpdate({ 'discordId' : userID }, { 'online' : false }, (err, resp) => {
            if (err) reject(err)

            resolve('offline')
        })
      }
    })
  })
}

this.getOnlineTowns = () => {
  return new Promise((resolve, reject) => {
    User.find({ 'online' : true }, (err, users) => {
      if (err) reject(err)

      resolve(users)
    })
  })
}
