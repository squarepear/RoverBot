var db = require('../dbAccess.js')
const fcPattern = /^(\d{4}-\d{4}-\d{4})$/

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
// Test for arguments
  if (data.args.length === 0) { // Below should checks for FC
    let userInfo = db.getUserInfo(data.user.id) // getUserInfo of userID and set to userInfo

    if (userInfo.FriendCode != null) { // If there is entry, do this
      return `${data.user.username}'s' friend code is \`${userInfo.FriendCode}\`.`
    } else { // If no entry, do this
      return `${data.user.username} haven't set a Friend Code yet!\n To add a friend code, do \`!fc [insert your FC here]\`!`
    }
  } else { // If there is args
    let regexCheck = fcPattern.test(data.args.join(' ')) // Boolean. Check if message contains a correct FC
    if (regexCheck) { // If true
      let FC = fcPattern.exec(data.args.join(' ')) // Make FC the result of FCPattern
      db.setUserInfo(data.user.id, {'FriendCode': FC[0]})

      // Setting role
      data.message.member.addRole(data.message.guild.roles.find('name', 'Villager'), 'Added friend code')
      data.message.member.removeRole(data.message.guild.roles.find('name', 'Newbie'), 'Added friend code')
      return ' Your Friend Code is now `' + FC + '`'
    } else {
      return ' Invalid Friend Code or User! \n The code format should be `xxxx-xxxx-xxxx`'
    }
  }

//   } else if (data.args.length === 1) {
//     if (fcpattern.test(data.args[0])) {
//       var fctested = fcpattern.exec(data.args[0])
// // Adding / Removing Roles
//       data.message.member.addRole(data.message.guild.roles.find('name', 'Villager'), 'Added friend code')
//       data.message.member.removeRole(data.message.guild.roles.find('name', 'Newbie'), 'Added friend code')
//
// // Stores info in database
//
//       db.setUserInfo(data.user.id, { FriendCode: fctested })
//       return ' Your Friend Code is now `' + fctested + '`'
//     } else if (data.message.mentions.users.first() != null) {
//       usr = data.message.mentions.users.first()
//       usrinfo = db.getUserInfo(usr.id)
//       if (usrinfo.FriendCode != null) {
//         return usr.username + "'s Friend Code is: `" + usrinfo.FriendCode + '`'
//       } else {
//         return '' + usr.username + ' has not set a Friend Code yet'
//       }
//     } else {
//       return ' Invalid Friend Code or User! \n The code format should be `xxxx-xxxx-xxxx`'
//     }
//   } else {
//     return 'Usage: `!fc [code]` or `!fc [mention]`'
//   }
}
