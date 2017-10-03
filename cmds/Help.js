const Discord = require('discord.js')

this.info = {
  aliases: [
    'SomeAlias',
    'AnoutherAlias'
  ],
  helpInfo: {
    show: true,
    catagory: 'GENERAL',
    name: 'Template',
    usage: 'temp [template]',
    desc: 'Templates a template'
  }
}

this.Command = function(data) {
  let helpCategory, helpUsage, helpMore, helpCategoryGeneral, helpCategoryACCF

  helpCategory = '- **General**: General commands - for you when you need to know stuff \n'
  helpCategory += '- **ACCF**: ACCF commands for ACCF informations'

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
  helpCategoryGeneral += '```'

  helpCategoryACCF = '```\n'
  helpCategoryACCF += 'ACCF - Villager informations                                           \n'
  helpCategoryACCF += '                                                                       \n'
  helpCategoryACCF += 'Commands                                 Description                   \n'
  helpCategoryACCF += '---------------------------------------- ------------------------------\n'
  helpCategoryACCF += 'info [Optional mentions]                 Shows town informations       \n'
  helpCategoryACCF += 'name [Mentions / Your character name]    Show / Set character name     \n'
  helpCategoryACCF += 'town [Mentions / Your town name]         Show / Set town name          \n'
  helpCategoryACCF += 'fruit [Mentions / Your fruit type]       Show / Set fruit type         \n'
  helpCategoryACCF += 'note [Mentions / Your note to players]   Show / Set notes to players   \n'
  helpCategoryACCF += '```'

  if (data.args.length == 0) { // If no arguments, do this!
    let helpMessage = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setAuthor('RoverBot Help', data.bot.avatarURL)
      .setDescription('Help has been sent!')
      .addField(' Categories', helpCategory)
      .addField('Usage', helpUsage)
      .addField('More help?', helpMore)
      .addField('Author', 'This bot is made by <@237985610084777994> with help from <@189769721653100546> and GitHub Contributors!')
    return { embed: helpMessage }

  }else { // If people sends Categories
    switch (data.args[0].toUpperCase()) {
      case 'GENERAL':
        return helpCategoryGeneral
        break
      case 'ACCF':
        return helpCategoryACCF
        break
      default:
        return ' Category invalid!'
    }
  }
  console.log(`[HELP] ${data.user.username} has requested help!`);
}
