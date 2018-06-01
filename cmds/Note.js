var db = require('../dbAccess')

this.info = {
  aliases: [
    'notes',
    'Message'
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
  } else if (data.message.mentions.users.first() == null && data.args.length > 0) {
    db.setUserInfo(data.user.id, {'note': data.args.join(' ')}).then(() => {
      data.message.channel.send('Your note is now `' + data.args.join(' ') + '`')
    })
  } else if (data.message.mentions.users.first() != null && data.args.length === 1) {
    db.getUserInfo(data.message.mentions.users.first().id).then((userInfo) => {
      onFind(userInfo, data)
    })
  } else {
    data.message.channel.send('Usage: `!note [note]` or `!note [mention]`')
  }
}

const onFind = (userInfo, data) => {
  data.botVar.fetchUser(userInfo.discordId).then((user) => {
    if (userInfo.note != '') {
      data.message.channel.send(user.username + "'s note is: `" + userInfo.note + '`')
    } else {
      data.message.channel.send(user.username + ' hasn\'t set a note yet')
    }
  })
}
