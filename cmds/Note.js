var db = require('../dbAccess.js')

this.info = {
  aliases: [
    'Notes',
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
  try {
    if (data.args.length === 0) {
      let usr = data.user
      let usrinfo = db.getUserInfo(usr.id)
      if (usrinfo.Note != null) {
        return usr.username + "'s Note is: `" + usrinfo.Note + '`'
      } else {
        return ' ' + usr.username + ' hasn\'t set a Note yet'
      }
    } else if (data.message.mentions.users.first() == null && data.args.length > 0) {
      db.setUserInfo(data.user.id, {'Note': data.args.join(' ')})
      return ' Your Note is now `' + data.args.join(' ') + '`'
    } else if (data.message.mentions.users.first() != null && data.args.length === 1) {
      let usr = data.message.mentions.users.first()
      let usrinfo = db.getUserInfo(usr.id)
      if (usrinfo.Note != null) {
        return usr.username + "'s Note is: `" + usrinfo.Note + '`'
      } else {
        return ' ' + usr.username + ' hasn\'t set a Note yet'
      }
    } else {
      return 'Usage: `!note [note]` or `!note [mention]`'
    }
  } catch (e) {
    return ' ' + data.user.username + ' hasn\'t set a Note yet'
  }
}
