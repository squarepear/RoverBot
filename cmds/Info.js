const Discord = require('discord.js')
var db = require('../dbAccess')

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
  },
  notInDM: true
}

this.Command = (data) => {
  data.CreateRichEmbed = this.CreateRichEmbed
  if (data.args.length === 0) { // Self info
    db.getUserInfo(data.user.id).then((userInfo) => {
      onFind(userInfo, data)
    })
  } else if (data.args.length === 1 && data.message.mentions.users.first()) { // If there is args and mentions
    db.getUserInfo(data.message.mentions.users.first().id).then((userInfo) => {
      onFind(userInfo, data)
    })
  } else { // If na
    console.log(`[ERROR] ${data.user.username}#${data.user.discriminator} had an error running \`!info\``)
    data.message.channel.send(`Unknown Error! Did you mention a username?\nPlease report this to the developer!`)
  }
}

this.CreateInfoEmbed = (userInfo, user, guild) => {
  let name = user.username

  if (guild.members.get(user.id) && guild.members.get(user.id).nickname) {
    name = guild.members.get(user.id).nickname
  }

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

  if (userInfo.device != '') { // Device
    constructedTownInfo += `**Device**: ${userInfo.device}\n`
  } else {
    constructedTownInfo += `**Device**: User hasn't set their device!\n`
  }

  if (userInfo.note != '') {
    constructedTownInfo += `**User Note**: ${userInfo.note}`
  } else {
    constructedTownInfo += `**User Note**: User didn't set any notes!`
  }

  return new Discord.RichEmbed()
  .setColor(`GREEN`)
  .setAuthor(`${name}'s Details`, user.displayAvatarURL)
  .addField(`ACCF Town Info`, constructedTownInfo)
}

const onFind = (userInfo, data) => {
  data.message.channel.send(this.CreateInfoEmbed(userInfo, data.message.author, data.message.channel.guild))
}
