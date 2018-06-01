var db = require('../dbAccess')

this.info = {
  aliases: [
    'townName',
    'City'
  ],
  helpInfo: {
    show: true,
    category: 'ACCF',
    name: 'Template',
    usage: 'temp [template]',
    desc: 'Templates a template'
  },
  notInDM: true
}

this.Command = function (data) {
  if (data.args.length === 0) {
    db.getUserInfo(data.user.id).then((userInfo) => {
      onFind(userInfo, data)
    })
  } else if (data.args.length === 1 && data.message.mentions.users.first() != null) {
    db.getUserInfo(data.message.mentions.users.first().id).then((userInfo) => {
      onFind(userInfo, data)
    })
  } else if (data.args.join(' ').length <= 8 && data.message.mentions.users.first() == null) {
    db.setUserInfo(data.user.id, {'town': data.args.join(' ')}).then(() => {
      data.message.channel.send('Your town is now `' + data.args.join(' ') + '`')
    })
  } else if (data.args.join(' ').length > 8 && data.message.mentions.users.first() == null) {
    data.message.channel.send('Your town Name can\'t be longer than 8 letters')
  } else {
    data.message.channel.send('Usage: `!town [town]` or `!town [mention]`')
  }
}

const onFind = (userInfo, data) => {
  data.botVar.fetchUser(userInfo.discordId).then((user) => {
    if (userInfo.town != '') {
      data.message.channel.send(user.username + "'s town is: `" + userInfo.town + '`')
    } else {
      data.message.channel.send(user.username + ' hasn\'t set a town name yet!')
    }
  })
}
