var db = require('../dbAccess')
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
  },
  notInDM: true
}

this.Command = function (data) {
// Test for arguments
  if (data.args.length === 0) { // Below should checks for FC
    db.getUserInfo(data.user.id).then((userInfo) => {
      onFind(userInfo, data)
    })
  } else if (data.args.length === 1 && data.message.mentions.users.first() != null) {
    db.getUserInfo(data.message.mentions.users.first().id).then((userInfo) => {
      onFind(userInfo, data)
    })
  } else { // If there are args
    let regexCheck = fcPattern.test(data.args.join(' ')) // Boolean. Check if message contains a correct FC
    if (regexCheck) { // If true
      let FC = fcPattern.exec(data.args.join(' ')) // Make FC the result of FCPattern
      db.setUserInfo(data.user.id, {'fc': FC[0]}).then(() => {
        // Setting role
        data.message.member.addRole(data.message.guild.roles.find('name', 'Villager'), 'Added friend code')
        data.message.member.removeRole(data.message.guild.roles.find('name', 'Newbie'), 'Added friend code')

        console.log(`[FC] ${data.user.username}#${data.user.discriminator} has set their FC to ${FC[0]}`)
        data.message.channel.send(`Your Friend Code is now \`${FC[0]}\``)
      })
    } else {
      console.log(`[FC] ${data.user.username}#${data.user.discriminator} failed to set their FC!`)
      data.message.channel.send('Invalid Friend Code or User!\nThe code format should be `xxxx-xxxx-xxxx`')
    }
  }
}

const onFind = (userInfo, data) => {
  data.botVar.fetchUser(userInfo.discordId).then((user) => {
    if (userInfo.fc != '') { // If there is entry, do this
      data.message.channel.send(`${user.username}'s friend code is \`${userInfo.fc}\`.`)
    } else { // If no entry, do this
      data.message.channel.send(`${user.username} hasn't set a Friend Code yet!\nTo add a friend code, do \`!fc [insert your FC here]\`!`)
    }
  })
}
