const Discord = require('discord.js')
var db = require('../dbAccess.js')

this.info = {
  aliases: [
    'ListOnlineTown',
    'ListOnlineTowns',
    'OnlineTownList',
    'OnlineTownsList',
    'OnlineTowns',
    'OnlineTown',
    'TownOnline',
    'TownsOnline',
    'GiveMeTheListOfOnlineTowns'
  ],
  helpInfo: {
    show: false,
    category: 'TEMPLATE',
    name: 'Template',
    usage: 'temp [template]',
    desc: 'Templates a template'
  }
}

// Function to run when user uses this command (Don't change the function name)
this.Command = function (data) {
  console.log(`[LISTONLINE] ${data.user.username}#${data.user.discriminator} requested for online towns!`)

  let onlineTowns = db.getOnlineTown()
  if (onlineTowns[0] == null) { // If there is no online town
    return new Discord.RichEmbed()
    .setColor('RED')
    .setTitle('❌ Whoops!')
    .addField(`There isn't any online towns right now! 😔`, `Online towns should appear here.`)
    .addField('How do I set my town online?', `Do \`!online\` in #bot-commands to set your town online!`)
  }

  let townlist = ''

  onlineTowns.forEach(function (ID) { // For each ID of online towns, add to variable
    townlist += `<@${ID}>\n`
  })

  return new Discord.RichEmbed()
  .setColor('GREEN')
  .addField('🏙️  Towns that are online:', townlist)
}
