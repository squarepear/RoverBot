var db = require('../dbAccess.js')

var info = {
  aliases: [
  ],
  helpInfo: {
    show: true,
    name: 'Template',
    usage: 'temp [template]',
    desc: 'Templates a template'
  }
}

function Command(data) {
  if (data.args.length === 0) {
    usr = data.user
    usrinfo = db.getUserInfo(usr.id)
    if (usrinfo.Fruit != null) {
      return usr.username + "'s Fruit is: `" + usrinfo.Fruit + '`')
    } else {
      return ' ' + usr.username + ' has not set a Fruit yet')
    }
  } else if (data.args.length === 1) {
    if (data.message.mentions.users.first() != null) {
      usr = data.message.mentions.users.first()
      usrinfo = db.getUserInfo(usr.id)
      if (usrinfo.Fruit != null) {
        return usr.username + "'s Fruit is: `" + usrinfo.Fruit + '`')
      } else {
        return ' ' + usr.username + ' has not set a Fruit yet')
      }
    } else {
      switch (data.args[0].toUpperCase()) {
        case 'ALL':
        case 'FULL':
          db.setUserInfo(data.user.id, { Fruit: 'All' })
          return 'Your Fruit is now `All`')
          break
        case 'PEACH':
        case 'PEACHES':
          db.setUserInfo(data.user.id, { Fruit: 'Peach' })
          return '🍑 Your Fruit is now `Peach`')
          break
        case 'PEAR':
        case 'PEARS':
          db.setUserInfo(data.user.id, { Fruit: 'Pear' })
          return '🍐 Your Fruit is now `Pear`')
          break
        case 'APPLE':
        case 'APPLES':
          db.setUserInfo(data.user.id, { Fruit: 'Apple' })
          return '🍎 Your Fruit is now `Apple`')
          break
        case 'ORANGE':
        case 'ORANGES':
          db.setUserInfo(data.user.id, { Fruit: 'Orange' })
          return '🍊 Your Fruit is now `Orange`')
          break
        case 'CHERRY':
        case 'CHERRIES':
          db.setUserInfo(data.user.id, { Fruit: 'Cherry' })
          return '🍒 Your Fruit is now `Cherry`')
          break
        default:
          return ' Invalid Fruit!')
          break
      }
    }
  } else {
    return 'Usage: `!fruit [fruit]` or `!fruit [mention]`')
  }
}
