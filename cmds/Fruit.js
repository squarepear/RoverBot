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
    db.getUserInfo(data.user.id, [onFind, data])
    return ''
  } else if (data.args.length === 1 && data.message.mentions.users.first() != null) {
    db.getUserInfo(data.message.mentions.users.first().id, [onFind, data])
    return ''
  } else if (data.args.length === 1) {
      switch (data.args[0].toUpperCase()) {
        case 'ALL':
        case 'FULL':
          db.setUserInfo(data.user.id, {'fruit': 'All'})
          return 'Your fruit is now `All`'
        case 'PEACH':
        case 'PEACHES':
          db.setUserInfo(data.user.id, {'fruit': 'Peach'})
          return '🍑 Your fruit is now `Peach`'
        case 'PEAR':
        case 'PEARS':
          db.setUserInfo(data.user.id, {'fruit': 'Pear'})
          return '🍐 Your fruit is now `Pear`'
        case 'APPLE':
        case 'APPLES':
          db.setUserInfo(data.user.id, {'fruit': 'Apple'})
          return '🍎 Your fruit is now `Apple`'
        case 'ORANGE':
        case 'ORANGES':
          db.setUserInfo(data.user.id, {'fruit': 'Orange'})
          return '🍊 Your fruit is now `Orange`'
        case 'CHERRY':
        case 'CHERRIES':
          db.setUserInfo(data.user.id, {'fruit': 'Cherry'})
          return '🍒 Your fruit is now `Cherry`'
        default:
          return ' Invalid fruit!'
      }
  } else {
    return `Usage: \`${data.prefix}fruit [fruit]\` or \`${data.prefix}fruit [mention]\``
  }
}

function onFind(userInfo, data) {
  data.botVar.fetchUser(userInfo.discordId).then((user) => {
    if (userInfo.fruit != '') {
      data.message.channel.send(user.username + "'s fruit is: `" + userInfo.fruit + '`')
    } else {
      data.message.channel.send(user.username + ' hasn\'t set a fruit yet')
    }
  })
}
