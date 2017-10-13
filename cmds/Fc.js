var db = require('../dbAccess.js')
const fcpattern = new RegExp(/^(\d{4}-\d{4}-\d{4})$/g)

this.info = {
  aliases: [
    'Friendcode'
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

    if (usrinfo.FriendCode != null) {
      return usr.username + "'s Friend Code is: `" + usrinfo.FriendCode + '`'
    } else {
      return ' ' + usr.username + ' has not set a Friend Code yet!'
    }
  } else if (data.args.length === 1) {
    if (fcpattern.test(data.args[0])) {
// Adding / Removing Roles
      data.message.member.addRole(data.message.guild.roles.find('name', 'Villager'), 'Added friend code')
      data.message.member.removeRole(data.message.guild.roles.find('name', 'Newbie'), 'Added friend code')

// Stores info in database

      db.setUserInfo(data.user.id, { FriendCode: data.args[0] })
      return ' Your Friend Code is now `' + data.args[0] + '`'
    } else if (data.message.mentions.users.first() != null) {
      usr = data.message.mentions.users.first()
      usrinfo = db.getUserInfo(usr.id)
      if (usrinfo.FriendCode != null) {
        return usr.username + "'s Friend Code is: `" + usrinfo.FriendCode + '`'
      } else {
        return '' + usr.username + ' has not set a Friend Code yet'
      }
    } else {
      return ' Invalid Friend Code or User! \n The code format should be `xxxx-xxxx-xxxx` \n Input: ' + data.args[0]
    }
  } else {
    return 'Usage: `!fc [code]` or `!fc [mention]`'
  }
}
