const Discord = require('discord.js')

this.info = {
  aliases: [],
  helpInfo: {
    show: true,
    category: 'GENERAL',
    name: 'Template',
    usage: 'temp [template]',
    desc: 'Templates a template'
  },
  notInDM: false
}

this.Command = function (data) {
  if (data.args.length === 0) { // If no arguments, do this!
    console.log(`[HELP] ${data.user.username} has requested help!`)
    data.message.channel.send(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setAuthor('RoverBot Help', data.bot.avatarURL)
      .setDescription('You need help? Take some help!')
      .addField(' Categories', helpCategory)
      .addField('Usage', helpUsage)
      .addField('More help?', helpMore)
      .addField('Author', 'This bot is made by <@237985610084777994> with help from <@189769721653100546> and GitHub Contributors!')
    )
  } else { // If people sends Categories
    switch (data.args[0].toUpperCase()) {
      case 'GENERAL':
        data.message.channel.send(helpCategoryGeneral)
        break
      case 'ACCF':
        data.message.channel.send(helpCategoryACCF)
        break
      default:
        data.message.channel.send('Category invalid!')
        break
    }
  }
}

// Please add variables here!

var helpCategory, helpUsage, helpMore, helpCategoryGeneral, helpCategoryACCF

helpCategory = '- **General**: General commands - for you when you need to know stuff \n'
helpCategory += '- **ACCF**: ACCF commands for ACCF information'

helpUsage = '**To find out what commands are in a category**, use `!help [Category]`. \n'
helpUsage += 'If you need additional information for each command, use `!command [Command].`'

helpMore = 'Need more help? Just ask directly to the creator of the bot or ask mods!'

helpCategoryGeneral = '```\n'
helpCategoryGeneral += 'General - General commands                                          \n'
helpCategoryGeneral += '                                                                    \n'
helpCategoryGeneral += 'Commands                              Description                   \n'
helpCategoryGeneral += '------------------------------------- ------------------------------\n'
helpCategoryGeneral += 'help [Category / Command]             Displays help message         \n'
helpCategoryGeneral += 'wiki [Wiki page name]                 Shows ACCF wiki page          \n'
helpCategoryGeneral += 'ping                                  Shows the bot latency         \n'
helpCategoryGeneral += '```'

helpCategoryACCF = '```\n'
helpCategoryACCF += 'ACCF Related commands                                                  \n'
helpCategoryACCF += '                                                                       \n'
helpCategoryACCF += 'Commands                                 Description                   \n'
helpCategoryACCF += '---------------------------------------- ------------------------------\n'
helpCategoryACCF += 'info [Optional mention]                  Shows town informations       \n'
helpCategoryACCF += 'fc [Mention / Your friend code]          Show / Set friend code        \n'
helpCategoryACCF += 'name [Mention / Your character name]     Show / Set character name     \n'
helpCategoryACCF += 'town [Mention / Your town name]          Show / Set town name          \n'
helpCategoryACCF += 'fruit [Mention / Your fruit type]        Show / Set fruit type         \n'
helpCategoryACCF += 'device [Mention / Your device type]       Show / Set device type       \n'
helpCategoryACCF += 'note [Mention / Your note to players]    Show / Set notes to players   \n'
helpCategoryACCF += 'whois [Friend code]                      Finds user with friend code   \n'
helpCategoryACCF += 'online                                   Set your town online          \n'
helpCategoryACCF += 'offline                                  Set your town offline         \n'
helpCategoryACCF += 'listonline                               List online towns             \n'
helpCategoryACCF += '```'
