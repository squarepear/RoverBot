var db = require('../dbAccess')

this.info = {
  aliases: [],
  helpInfo: {
    show: true,
    category: 'ACCF',
    name: 'Device',
    usage: 'device [Mention / Your device type]',
    desc: 'Show / Set device type'
  },
  notInDM: true
}

this.Command = function (data) {
  if (data.args.length === 0) {
    db.getUserInfo(data.user.id).then((userInfo) => {
      onFind(userInfo, data)
    })
  } else if (data.args.length === 1 && data.message.mentions.users.first() != null) {
    db.getUserInfo(data.message.mentions.users.first()).then((userInfo) => {
      onFind(userInfo, data)
    })
  } else if (data.args.length >= 1) {
      switch (data.args.join(' ').trim().toUpperCase()) {
        case 'WII':
          db.setUserInfo(data.user.id, {'device': 'Wii'})
          data.message.channel.send('Your device is now `Wii`')
        case 'WIIU':
        case 'WII U':
          db.setUserInfo(data.user.id, {'device': 'Wii U'})
          data.message.channel.send('Your device is now `Wii U`')
        case 'DOLPHIN':
        case 'PC':
        case 'MAC':
          db.setUserInfo(data.user.id, {'device': 'Dolphin'})
          data.message.channel.send('Your fruit is now `Dolphin`')
        default:
          data.message.channel.send(' Invalid device! (Wii, Wii U, Dolphin)')
      }
  } else {
    data.message.channel.send(`Usage: \`${data.prefix}device [device]\` or \`${data.prefix}device [mention]\``)
  }
}

const onFind = (userInfo, data) => {
  data.botVar.fetchUser(userInfo.discordId).then((user) => {
    if (userInfo.device != '') {
      data.message.channel.send(user.username + '\'s device is: `' + userInfo.device + '`')
    } else {
      data.message.channel.send(user.username + ' hasn\'t set a device yet')
    }
  })
}
