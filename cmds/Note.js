var db = require('../dbAccess.js')

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
  }
}

this.Command = function (data) {
  if (data.args.length === 0) {
    db.getUserInfo(data.user.id, [onFind, data])
    return ''
  } else if (data.message.mentions.users.first() == null && data.args.length > 0) {
    db.setUserInfo(data.user.id, {'note': data.args.join(' ')})
    return ' Your note is now `' + data.args.join(' ') + '`'
  } else if (data.message.mentions.users.first() != null && data.args.length === 1) {
    db.getUserInfo(data.message.mentions.users.first().id, [onFind, data])
    return ''
  } else {
    return 'Usage: `!note [note]` or `!note [mention]`'
  }
}

function onFind(userInfo, data) {
  data.botVar.fetchUser(userInfo.discordId).then((user) => {
    if (userInfo.note != '') {
      data.message.channel.send(user.username + "'s note is: `" + userInfo.note + '`')
    } else {
      data.message.channel.send(user.username + ' hasn\'t set a note yet')
    }
  })
}
