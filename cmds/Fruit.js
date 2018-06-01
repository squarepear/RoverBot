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
  } else if (data.args.length === 1) {
    let sel = ''
      switch (data.args[0].toUpperCase()) {
        case 'ALL':
        case 'FULL':
          sel = 'All'
        case 'PEACH':
        case 'PEACHES':
          sel = 'Peach'
        case 'PEAR':
        case 'PEARS':
          sel = 'Pear'
        case 'APPLE':
        case 'APPLES':
          sel = 'Apple'
        case 'ORANGE':
        case 'ORANGES':
          sel = 'Orange'
        case 'CHERRY':
        case 'CHERRIES':
          sel = 'Cherry'
        default:
      }

      db.setUserInfo(data.user.id, {'fruit': sel}).then(() => {
        if (sel != '') data.message.channel.send(`Your fruit is now \`${sel}\``)
        else data.message.channel.send('Invalid fruit!')
      })
  } else {
    data.message.channel.send(`Usage: \`${data.prefix}fruit [fruit]\` or \`${data.prefix}fruit [mention]\``)
  }
}

const onFind = (userInfo, data) => {
  data.botVar.fetchUser(userInfo.discordId).then((user) => {
    if (userInfo.fruit != '') {
      data.message.channel.send(user.username + "'s fruit is: `" + userInfo.fruit + '`')
    } else {
      data.message.channel.send(user.username + ' hasn\'t set a fruit yet')
    }
  })
}
