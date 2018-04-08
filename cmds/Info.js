const Discord = require('discord.js')
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
  if (data.args.length === 0) { // Self info
    db.getUserInfo(data.user.id, [onFind, data])
    return ''
  } else if (data.args.length === 1 && data.message.mentions.users.first()) { // If there is args and mentions
    db.getUserInfo(data.message.mentions.users.first().id, [onFind, data])
    return ''
  } else { // If na
    console.log(`[ERROR] ${data.user.username}#${data.user.discriminator} had an error running \`!info\``)
    return `Unknown Error! Did you mention a username?\n Please report this to the developer!`
  }
}

function onFind(userInfo, data) {
  data.botVar.fetchUser(userInfo.discordId).then((user) => {
    let constructedTownInfo = ''

    if (userInfo.name != '') { // Character Name
      constructedTownInfo += `**Character Name**: ${userInfo.name}\n`
    } else {
      constructedTownInfo += `**Character Name**: User hasn't set their Character Name!\n`
    }

    if (userInfo.town != '') { // Town Name
      constructedTownInfo += `**Town Name**: ${userInfo.town}\n`
    } else {
      constructedTownInfo += `**Town Name**: User hasn't set their Town Name!\n`
    }

    if (userInfo.fc != '') { // Friend Code
      constructedTownInfo += `**Friend Code**: \`${userInfo.fc}\`\n`
    } else {
      constructedTownInfo += `**Friend Code**: User hasn't set their Friend Code!\n`
    }

    if (userInfo.fruit != '') { // Fruits
      constructedTownInfo += `**Town Fruit**: ${userInfo.fruit}\n`
    } else {
      constructedTownInfo += `**Town Fruit**: User hasn't set their Town Fruit!\n`
    }

    if (userInfo.note != '') {
      constructedTownInfo += `**User Note**: ${userInfo.note}`
    } else {
      constructedTownInfo += `**User Note**: User didn't set any notes!`
    }

    data.message.channel.send(new Discord.RichEmbed()
    .setColor(`GREEN`)
    .setAuthor(`${user.username}'s Details`, user.displayAvatarURL)
    .addField(`ACCF Town Info`, constructedTownInfo))
  })
}
