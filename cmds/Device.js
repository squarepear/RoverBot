var db = require('../dbAccess')

this.info = {
  aliases: [],
  helpInfo: {
    show: true,
    category: 'ACCF',
    name: 'Device',
    usage: 'device [Mention / Your device type]',
    desc: 'Show / Set device type'
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
        case 'WII':
          db.setUserInfo(data.user.id, {'device': 'Wii'})
          return 'Your device is now `Wii`'
        case 'WIIU':
        case 'WII U':
          db.setUserInfo(data.user.id, {'device': 'Wii U'})
          return 'Your device is now `Wii U`'
        case 'DOLPHIN':
        case 'PC':
        case 'MAC':
          db.setUserInfo(data.user.id, {'device': 'Dolphin'})
          return 'Your fruit is now `Dolphin`'
        default:
          return ' Invalid device! (Wii, Wii U, Dolphin)'
      }
  } else {
    return `Usage: \`${data.prefix}device [device]\` or \`${data.prefix}device [mention]\``
  }
}

function onFind(userInfo, data) {
  data.botVar.fetchUser(userInfo.discordId).then((user) => {
    if (userInfo.device != '') {
      data.message.channel.send(user.username + '\'s device is: `' + userInfo.device + '`')
    } else {
      data.message.channel.send(user.username + ' hasn\'t set a device yet')
    }
  })
}
