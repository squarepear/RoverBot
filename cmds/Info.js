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
  let userInfo, user
  let constructedTownInfo = ''
  if (data.args.length === 0) { // Self info
    user = data.user
    userInfo = db.getUserInfo(data.user.id)
  } else if (data.args.length === 1 && data.message.mentions.users.first()) { // If there is args and mentions
    user = data.message.mentions.users.first()
    userInfo = db.getUserInfo(data.message.mentions.users.first().id)
  } else { // If na
    console.log(`[ERROR] ${data.user.username}#${data.user.discriminator} have error running \`!info\``)
    return `Unknown Error! Did you mention a username?\n Please report this to the developer!`
  }
/*
Start constructing returns!
*/
  if (userInfo.Name) { // Character Name
    constructedTownInfo += `**Character Name**: ${userInfo.Name}\n`
  } else {
    constructedTownInfo += `**Character Name**: User haven't set their Character Name!\n`
  }

  if (userInfo.Town) { // Town Name
    constructedTownInfo += `**Town Name**: ${userInfo.Town}\n`
  } else {
    constructedTownInfo += `**Town Name**: User haven't set their Town Name!\n`
  }

  if (userInfo.FriendCode) { // Friend Code
    constructedTownInfo += `**Friend Code**: \`${userInfo.FriendCode}\`\n`
  } else {
    constructedTownInfo += `**Friend Code**: User haven't set their Friend Code!\n`
  }

  if (userInfo.Fruit) { // Fruits
    constructedTownInfo += `**Town Fruit**: ${userInfo.Fruit}\n`
  } else {
    constructedTownInfo += `**Town Fruit**: User haven't set their Town Fruit!\n`
  }

  if (userInfo.Note) {
    constructedTownInfo += `**User Note**: ${userInfo.Note}`
  } else {
    constructedTownInfo += `**User Note**: User didn't set any notes!`
  }

  return new Discord.RichEmbed()
  .setColor(`GREEN`)
  .setAuthor(`${user.username}'s Details`, user.displayAvatarURL)
  .addField(`ACCF Town Info`, constructedTownInfo)
}

  // try {
  //   if (data.args.length === 1) {
  //     if (data.message.mentions.users.first() != null) {
  //       let usr = data.message.mentions.users.first()
  //       let usrinfo = db.getUserInfo(usr.id)
  //       if (usrinfo.FriendCode != null) {
  //         return usr.username + "'s info is: \n Friend Code: `" + usrinfo.FriendCode + '` \n Name: `' + usrinfo.Name + '` \n Town: `' + usrinfo.Town + '` \n Fruit: `' + usrinfo.Fruit + '` \n Note: `' + usrinfo.Note + '`'
  //       } else {
  //         return ' ' + usr.username + ' has not set a Friend Code yet'
  //       }
  //     } else {
  //       return 'Usage: `!info [mention]`'
  //     }
  //   } else if (data.args.length === 0) {
  //     let usr = data.user
  //     let usrinfo = db.getUserInfo(usr.id)
  //     if (usrinfo.FriendCode != null) {
  //       return usr.username + "'s info is: \n Friend Code: `" + usrinfo.FriendCode + '` \n Name: `' + usrinfo.Name + '` \n Town: `' + usrinfo.Town + '` \n Fruit: `' + usrinfo.Fruit + '` \n Note: `' + usrinfo.Note + '`'
  //     } else {
  //       return ' ' + usr.username + ' has not set a Friend Code yet'
  //     }
  //   } else {
  //     return 'Usage: `!info [mention]`'
  //   }
  // } catch (e) {
  //   return ' The user hasn\'t given any information to the bot!'
  // }
