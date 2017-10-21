var db = require('../dbAccess.js')

this.info = {
  aliases: [
    'TownName',
    'City'
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
    var usr = data.user
    var usrinfo = db.getUserInfo(usr.id)
    if (usrinfo.Town != null) {
      return usr.username + "'s Town is: `" + usrinfo.Town + '`'
    } else {
      return ' ' + usr.username + ' has not set a Town Name yet!'
    }
  } else if (data.args.length === 1 && data.message.mentions.users.first() != null) {
    usr = data.message.mentions.users.first()
    usrinfo = db.getUserInfo(usr.id)
    if (usrinfo.Town != null) {
      return usr.username + "'s Town is: `" + usrinfo.Town + '`'
    } else {
      return ' ' + usr.username + ' has not set a Town Name yet'
    }
  } else if (data.args.join(' ').length <= 8 && data.message.mentions.users.first() == null) {
    db.setUserInfo(data.user.id, {'Town': data.args.join(' ')})
    return ' Your Town is now `' + data.args.join(' ') + '`'
  } else if (data.args.join(' ').length > 8 && data.message.mentions.users.first() == null) {
    return ' Your Town Name can\'t be longer than 8 letters'
  } else {
    return 'Usage: `!town [town]` or `!town [mention]`'
  }
}
