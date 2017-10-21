const Discord = require('discord.js')
const config = require('../botconfig.json')
const thisPackage = require('../package.json')

this.info = {
  aliases: [
    'infoBot',
    'botinformation',
    'botinformations',
    'botStats',
    'botStat',
    'stat',
    'stats'
  ],
  helpInfo: {
    show: false,
    category: 'ACCF',
    name: 'Template',
    usage: 'temp [template]',
    desc: 'Templates a template'
  }
}

// Function to run when user uses this command (Don't change the function name)
this.Command = function (data) {
  return new Discord.RichEmbed()
  .setAuthor(`About ${data.botVar.user.username}`, data.botVar.user.avatarURL)
  .setColor('GOLD')
  .setThumbnail(data.botVar.user.avatarURL)
  .setDescription('In-Depth Bot Information')
  .setURL('https://github.com/rey2952/RoverBot')
  .setTimestamp()

  .addField('Bot ID', data.botVar.user.id, true)
  .addField('Bot Library', 'discord.js', true)

  .addField('Bot Creator', '<@237985610084777994>\n<@189769721653100546>', true)
  .addField('Node.js Version', process.version, true)

  .addField('Platform', process.platform, true)
  .addField('Memory Usage', `${Math.round(process.memoryUsage().rss / 1000000)} MB`, true)

  .addField('Command Prefix', config.prefix, true)
  .addField('Used Modules', Object.keys(process.versions).length, true)

  .addField('Bot Version', thisPackage.version, true)
  .addField('Bot Uptime', uptimeCount(Date.now(), data.startup), true)

  .setFooter('Get help with bot commands using !help')
}

function uptimeCount (newTime, oldTime) {
  let time = newTime - oldTime
  let seconds = Math.floor(time / 1000 % 60)
  let minutes = Math.floor(time / 1000 / 60 % 60)
  let hours = Math.floor(time / 1000 / 60 / 60 % 24)
  let days = Math.floor(time / 1000 / 60 / 60 / 24)

  return `${days} Days, ${hours} Hours, ${minutes} Minutes and ${seconds} seconds`
}
