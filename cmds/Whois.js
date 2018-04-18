var db = require('../dbAccess')
var infoCommand = require('./Info')
const fcPattern = /^(\d{4}-\d{4}-\d{4})$/

this.info = {
  aliases: [
    'lookupfc',
    'whoisfc',
    'whofc'
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
  let regexCheck = fcPattern.test(data.args.join(' ')) // Boolean. Check if message contains a correct FC
  if (regexCheck) { // If true
    let FC = fcPattern.exec(data.args.join(' '))
    data.CreateRichEmbed = infoCommand.CreateRichEmbed
    db.getUserInfoFromFC(data.user.id, FC[0], [onFind, data])
    return ''
  } else {
    return ' Invalid Friend Code! \n The code format should be `xxxx-xxxx-xxxx`'
  }

  // if (data.args.length === 0) { // Below should checks for FC
  //   db.getUserInfo(data.user.id, [onFind, data])
  //   return ''
  // } else if (data.args.length === 1 && data.message.mentions.users.first() != null) {
  //   db.getUserInfo(data.message.mentions.users.first().id, [onFind, data])
  //   return ''
  // } else { // If there is args
  //   let regexCheck = fcPattern.test(data.args.join(' ')) // Boolean. Check if message contains a correct FC
  //   if (regexCheck) { // If true
  //     let FC = fcPattern.exec(data.args.join(' ')) // Make FC the result of FCPattern
  //     db.setUserInfo(data.user.id, {'fc': FC[0]})
  //
  //     // Setting role
  //     data.message.member.addRole(data.message.guild.roles.find('name', 'Villager'), 'Added friend code')
  //     data.message.member.removeRole(data.message.guild.roles.find('name', 'Newbie'), 'Added friend code')
  //
  //     console.log(`[FC] ${data.user.username}#${data.user.discriminator} has set their FC to ${FC[0]}`)
  //     return ` Your Friend Code is now \`${FC[0]}\``
  //   } else {
  //     console.log(`[FC] ${data.user.username}#${data.user.discriminator} failed to set their FC!`)
  //     return ' Invalid Friend Code or User! \n The code format should be `xxxx-xxxx-xxxx`'
  //   }
  // }
}

function onFind(userInfo, data) {
  if (userInfo === null) {
    data.message.channel.send('Nobody has registered with that friend code')
  } else {
    data.botVar.fetchUser(userInfo.discordId).then((user) => {
      data.message.channel.send(data.CreateRichEmbed(userInfo, user))
    })
  }
}
