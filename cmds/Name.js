var db = require('../dbAccess')

this.info = {
  aliases: [
    'Ign',
    'Gamename'
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
    db.setUserInfo(data.user.id, {'name': data.args.join(' ')}).then(() => {

    })
    data.message.channel.send('Your name is now `' + data.args.join(' ') + '`')
  } else if (data.args.join(' ').length > 8 && data.message.mentions.users.first() == null) {
    data.message.channel.send('Your name can\'t be longer than 8 letters')
  } else {
    data.message.channel.send('Usage: `!name [name]` or `!name [mention]`')
  }
}

const onFind = (userInfo, data) => {
  data.botVar.fetchUser(userInfo.discordId).then((user) => {
    if (userInfo.name != '') {
      data.message.channel.send(user.username + "'s name is: `" + userInfo.name + '`')
    } else {
      data.message.channel.send(user.username + ' hasn\'t set a name yet')
    }
  })
}
