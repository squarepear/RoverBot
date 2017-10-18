var db = require('../dbAccess.js')

this.info = {
  aliases: [
    'fruits'
  ],
  helpInfo: {
    show: true,
    category: 'ACCF',
    name: 'Template',
    usage: 'temp [template]',
    desc: 'Templates a template'
  }
}

this.Command = function (data) {
  if (data.args.length === 0) {
    let usr = data.user
    let usrinfo = db.getUserInfo(usr.id)
    if (usrinfo.Fruit != null) {
      return usr.username + "'s Fruit is: `" + usrinfo.Fruit + '`'
    } else {
      return ' ' + usr.username + ' has not set a Fruit yet'
    }
  } else if (data.args.length === 1) {
    if (data.message.mentions.users.first() != null) {
      let usr = data.message.mentions.users.first()
      let usrinfo = db.getUserInfo(usr.id)
      if (usrinfo.Fruit != null) {
        return usr.username + "'s Fruit is: `" + usrinfo.Fruit + '`'
      } else {
        return ' ' + usr.username + ' has not set a Fruit yet'
      }
    } else {
      switch (data.args[0].toUpperCase()) {
        case 'ALL':
        case 'FULL':
          db.setUserInfo(data.user.id, 'Fruit', 'All')
          return 'Your Fruit is now `All`'
        case 'PEACH':
        case 'PEACHES':
          db.setUserInfo(data.user.id, 'Fruit', 'Peach')
          return '🍑 Your Fruit is now `Peach`'
        case 'PEAR':
        case 'PEARS':
          db.setUserInfo(data.user.id, 'Fruit', 'Pear')
          return '🍐 Your Fruit is now `Pear`'
        case 'APPLE':
        case 'APPLES':
          db.setUserInfo(data.user.id, 'Fruit', 'Apple')
          return '🍎 Your Fruit is now `Apple`'
        case 'ORANGE':
        case 'ORANGES':
          db.setUserInfo(data.user.id, 'Fruit', 'Orange')
          return '🍊 Your Fruit is now `Orange`'
        case 'CHERRY':
        case 'CHERRIES':
          db.setUserInfo(data.user.id, 'Fruit', 'Cherry')
          return '🍒 Your Fruit is now `Cherry`'
        default:
          return ' Invalid Fruit!'
      }
    }
  } else {
    return 'Usage: `!fruit [fruit]` or `!fruit [mention]`'
  }
}
