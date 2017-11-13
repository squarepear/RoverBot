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
      console.log(`[FC] ${data.user.username}#${data.user.discriminator} has checked their FC`)
      return `${data.user.username}'s' friend code is \`${userInfo.FriendCode}\`.`
    } else { // If no entry, do this
      return `${data.user.username} hasn't set a Friend Code yet!\n To add a friend code, do \`!fc [insert your FC here]\`!`
    }
  } else { // If there is args
    let regexCheck = fcPattern.test(data.args.join(' ')) // Boolean. Check if message contains a correct FC
    if (regexCheck) { // If true
      let FC = fcPattern.exec(data.args.join(' ')) // Make FC the result of FCPattern
      db.setUserInfo(data.user.id, {'FriendCode': FC[0]})

      // Setting role
      data.message.member.addRole(data.message.guild.roles.find('name', 'Villager'), 'Added friend code')
      data.message.member.removeRole(data.message.guild.roles.find('name', 'Newbie'), 'Added friend code')

      console.log(`[FC] ${data.user.username}#${data.user.discriminator} has set their FC to ${FC[0]}`)
      return ` Your Friend Code is now \`${FC[0]}\``
    } else {
      console.log(`[FC] ${data.user.username}#${data.user.discriminator} failed to set their FC!`)
      return ' Invalid Friend Code or User! \n The code format should be `xxxx-xxxx-xxxx`'
    }
  }
}
