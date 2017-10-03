var db = require('../dbAccess.js')

this.info = {
  aliases: [
    'Ign',
    'Gamename'
  ],
  helpInfo: {
    show: true,
    catagory: 'ACCF',
    name: 'Template',
    usage: 'temp [template]',
    desc: 'Templates a template'
  }
}

this.Command = function(data) {
  if (data.args.length === 0) {
    usr = data.user
    usrinfo = db.getUserInfo(usr.id)
    if (usrinfo.Name != null) {
      return usr.username + "'s Name is: `" + usrinfo.Name + '`'
    } else {
      return ' ' + usr.username + ' has not set a Name yet'
    }
  } else if (data.args.length === 1 && data.message.mentions.users.first() != null) {
    usr = data.message.mentions.users.first()
    usrinfo = db.getUserInfo(usr.id)
    if (usrinfo.Name != null) {
      return usr.username + "'s Name is: `" + usrinfo.Name + '`'
    } else {
      return ' ' + usr.username + ' has not set a Name yet'
    }
  } else if (data.args.join(' ').length <= 8 && data.message.mentions.users.first() == null) {
    db.setUserInfo(data.user.id, { Name: data.args.join(' ') })
    return ' Your Name is now `' + data.args.join(' ') + '`'
  } else if (data.args.join(' ').length > 8 && data.message.mentions.users.first() == null) {
    return ' Your Name can\'t be longer than 8 letters'
  } else {
    return 'Usage: `!name [name]` or `!name [mention]`'
  }
}
