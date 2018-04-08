var User = require('./models/user')

this.getUserInfo = (userID, onFind) => {
  User.findOne({ 'discordId' : userID }, (err, user) => {
    if (err) {
      throw err
    }
    if (!user) {
      user = new User()
      user.discordId = userID
      user.save(function (err) {
        if (err) {
          throw err
        }
      })
    }

    if (onFind) {
      onFind[0](user, onFind[1])
    } else {
      return user
    }
  })
}

this.getUserInfoFromFC = (fc, onFind) => {
  User.findOne({ 'fc' : fc }, (err, user) => {
    if (err) {
      throw err
    }
    if (!user) {
      user = new User()
      user.discordId = userID
      user.save(function (err) {
        if (err) {
          throw err
        }
      })
    }

    if (onFind) {
      onFind[0](user, onFind[1])
    } else {
      return user
    }
  })
}

this.setUserInfo = (userID, info) => {
    User.findOneAndUpdate({ 'discordId' : userID }, info, (err, resp) => {
      if (err) {
        throw err
      }
    })
}

this.setOnlineTown = (userID, onFind) => {
  User.findOne({ 'discordId' : userID }, (err, user) => {
    if (err) {
      throw err
    }

    if (!user) {
      user = new User()
      user.discordId = userID
      user.save(function (err) {
        if (err) {
          throw err
        }
      })
    }

    if (user.online) {
      onFind[0]('alreadyOnline', onFind[1])
    } else {
      User.findOneAndUpdate({ 'discordId' : userID }, { 'online' : true }, (err, resp) => {
          if (err) {
            throw err
          }

          onFind[0]('online', onFind[1])
      })
    }
  })
}

this.setOfflineTown = (userID, onFind) => {

  User.findOne({ 'discordId' : userID }, (err, user) => {
    if (err) {
      throw err
    }

    if (!user) {
      user = new User()
      user.discordId = userID
      user.save(function (err) {
        if (err) {
          throw err
        }
      })
    }

    if (!user.online) {
      onFind[0]('alreadyOffline', onFind[1])
    } else {
      User.findOneAndUpdate({ 'discordId' : userID }, { 'online' : false }, (err, resp) => {
          if (err) {
            throw err
          }

          onFind[0]('offline', onFind[1])
      })
    }
  })
}

this.getOnlineTowns = (onFind) => {
  User.find({ 'online' : true }, (err, users) => {
    if (onFind) {
      onFind[0](users, onFind[1])
    } else {
      return users
    }
  })
}
