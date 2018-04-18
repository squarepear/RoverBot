const Discord = require('discord.js')
var db = require('../dbAccess')

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
    'onlineList',
    'onlinesList',
    'GiveMeTheListOfOnlineTowns'
  ],
  helpInfo: {
    show: false,
    category: 'TEMPLATE',
    name: 'Template',
    usage: 'temp [template]',
    desc: 'Templates a template'
  },
  notInDM: false
}

// Function to run when user uses this command (Don't change the function name)
this.Command = function (data) {
  console.log(`[LISTONLINE] ${data.user.username}#${data.user.discriminator} requested for online towns!`)
  db.getOnlineTowns([onFind, data])
  return ''
}

function onFind(onlineTowns, data) {
  if (onlineTowns == null || onlineTowns.length === 0) { // If there is no online town
    data.message.channel.send(new Discord.RichEmbed()
    .setColor('DARK_RED')
    .setTitle('❌ Whoops!')
    .addField(`There aren't any online towns right now! 😔`, `Online towns should appear here.`)
    .addField('How do I set my town online?', `Do \`!online\` in #bot-commands to set your town online!`))
  }

  let townlist = ''

  onlineTowns.forEach((town) => { // For each ID of online towns, add to variable
    townlist += `<@${town.discordId}>\n`
  })

  data.message.channel.send(new Discord.RichEmbed()
  .setColor('GREEN')
  .addField('🏙️  Towns that are online:', townlist))
}
