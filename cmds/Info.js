var db = require('../dbAccess.js')

this.info = {
  aliases: [
    'Userinfo'
  ],
  helpInfo: {
    show: true,
    category: 'GENERAL',
    name: 'Template',
    usage: 'temp [template]',
    desc: 'Templates a template'
  }
}

this.Command = function (data) {
  try {
    if (data.args.length === 1) {
      if (data.message.mentions.users.first() != null) {
        let usr = data.message.mentions.users.first()
        let usrinfo = db.getUserInfo(usr.id)
        console.log(usrinfo)
        if (usrinfo.FriendCode != null) {
          return usr.username + "'s info is: \n Friend Code: `" + usrinfo.FriendCode + '` \n Name: `' + usrinfo.Name + '` \n Town: `' + usrinfo.Town + '` \n Fruit: `' + usrinfo.Fruit + '` \n Note: `' + usrinfo.Note + '`'
        } else {
          return ' ' + usr.username + ' has not set a Friend Code yet'
        }
      } else {
        return 'Usage: `!info [mention]`'
      }
    } else if (data.args.length === 0) {
      let usr = data.user
      let usrinfo = db.getUserInfo(usr.id)
      if (usrinfo.FriendCode != null) {
        return usr.username + "'s info is: \n Friend Code: `" + usrinfo.FriendCode + '` \n Name: `' + usrinfo.Name + '` \n Town: `' + usrinfo.Town + '` \n Fruit: `' + usrinfo.Fruit + '` \n Note: `' + usrinfo.Note + '`'
      } else {
        return ' ' + usr.username + ' has not set a Friend Code yet'
      }
    } else {
      return 'Usage: `!info [mention]`'
    }
  } catch (e) {
    return ' The user hasn\'t given any information to the bot!'
  }
}
