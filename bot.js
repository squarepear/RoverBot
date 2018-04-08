console.log('[INFO] I\'m starting up! Please wait until the next message!')

const botConfig = require('./botconfig.json')
const Discord = require('discord.js')
const fs = require('fs')
const schedule = require('node-schedule')
var express = require('express')
var path = require('path')
var filter = require('leo-profanity')
var mongoose = require('mongoose')

var app = express()
const bot = new Discord.Client()

var helpInfo = require('./help.json')
var messageReactions = require('./messageReactions.json')
var dbAccess = require('./dbAccess.js')
var commandsPath = require(`path`).join(__dirname, 'cmds')
var cmds = []
var startupTime = Date.now()

mongoose.connect(botConfig.mongodb.uri)

// Reading Commands
fs.readdirSync(commandsPath).forEach(function (file) { // For each file read, create a function
  let cmd = require('./cmds/' + file)
  console.log('[COMMANDS] Loaded ' + file)
  cmds[file.slice(0, -3).toUpperCase()] = cmd
  cmd.info.aliases.forEach(function (alias) {
    cmds[alias.toUpperCase()] = cmd
  })
  if (cmd.info.helpInfo.show) {
    helpInfo[cmd.info.helpInfo.category.toUpperCase()].commands.push(cmd.info.helpInfo)
  }
})

JSON.parse(fs.readFileSync('./events.json')).forEach((data) => { // Reading Events from events.json
  schedule.scheduleJob(data.date, () => {
    let color
    if (data.color) {
      color = data.color
    } else {
      color = 'RANDOM'
    }

    bot.channels.get(botConfig.channelID.event).send(new Discord.RichEmbed()
    .setTitle(data.name)
    .setColor(color)
    .setDescription(data.info)
    .setFooter(`Current Server Time: ${new Date().toString()}`)
    )
    console.log(`[EVENTS] Running ${data.name} on ${new Date()}`)
  })
  console.log(`[EVENTS] Loaded ${data.name}`)
})

// Launching bot
bot.on('ready', async () => {
  console.log(`[INFO] I'm logged on as ${bot.user.username}!`)
  console.log('[INFO] I\'m ready!')
  try {
    let link = await bot.generateInvite(['READ_MESSAGES', 'SEND_MESSAGES'])
    console.log('[INFO] Here is my invite link: ' + link)
  } catch (e) {
    console.log('[ERROR] Can\'t create invite link! Am I a normal user?')
    console.log(e.stack)
  }
  bot.user.setGame(`Do ${botConfig.prefix}help to get help!`)
})

// on message

bot.on('message', async message => {
  if (message.author.bot) return

  if (filter.check(message.content.trim())) {
    console.log(`[FILTER] ${message.author.username}#${message.author.discriminator} cursed. Message: ${filter.clean(message.content, '*')}`)
    bot.channels.get(botConfig.channelID.log).send(new Discord.RichEmbed()
    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
    .setDescription(`<@${message.author.id}> just said \`${filter.clean(message.content, '*')}\` in <#${message.channel.id}>`)
    .setColor('ORANGE')
    .setFooter(`Current Server Time: ${new Date().toString()}`))
    message.channel.send(`${message.author.username} said \`${filter.clean(message.content, '*')}\``)
    message.delete()
    return
  }

  Object.keys(messageReactions).forEach(key => {
    if (new RegExp(key, 'i').test(message.content)) {
      message.react(messageReactions[key])
    }
  })

  // bot message or not start with prefix = return
  if (!message.content.startsWith(botConfig.prefix)) return

  let messageArray = message.content.trim().split(' ')
  let command = messageArray[0].replace(botConfig.prefix, '')
  let args = messageArray.slice(1)
  let data = {
    user: message.author,
    command: command,
    args: args,
    message: message,
    bot: bot.user,
    botVar: bot,
    startup: startupTime
  }
  let cmd = cmds[command.toUpperCase()]

  if (cmd != null) {
    let result = cmd.Command(data) // Send data to each handler. Returns with var `result`
    if (result === '') {
    } else if (result != null) { // There should be always a result on each command.
      message.channel.send(result)
    } else {
      message.channel.send(new Discord.RichEmbed()
      .setTitle('❌ Something isn\'t looking right...')
      .setURL('https://github.com/rey2952/RoverBot/issues')
      .setDescription('Your command returned something weird! 😱')
      .setColor('DARK_RED')
      .addField(`Returned Value`, `\`${result}\``)
      .addField('What should I do?', 'If you see this, please report this to the bot developer or create an issue on GitHub by clicking the title of this text!'))
      .setFooter(`Current Server Time: ${new Date().toString()}`)
    }
  } else {
    message.channel.send('The command is invalid! Do `!help` if you need help.')
  }
})

bot.on('messageReactionAdd', (reaction, user) => {
  if (user.bot) return
  if (reaction.emoji.name === '💾') {
    if (reaction.message.embeds.length === 0) {
      let embed = new Discord.RichEmbed()
      .setTitle(`Saved message from ${reaction.message.author.username}#${reaction.message.author.discriminator}`)
      .setDescription(reaction.message.content)
      .setFooter(`Current Server Time: ${new Date().toString()}`)
      user.send(embed).then(message => {
        message.pin()
      })
    } else {
      reaction.message.channel.send('I don\'t support saving embeds yet 😞')
    }
  }
})

bot.on('presenceUpdate', (oldMember, newMember) => { // Set town Offline
  if (newMember.presence.status === 'offline' && dbAccess.setOfflineTown(newMember.id) === 'deleted') {
    bot.channels.get(botConfig.channelID.townAnnouncement).send(`<@${newMember.id}>'s Town has been set offline automatically! *(The user is offline on Discord) \n @here*`)
    console.log(`[AUTOOFFLINE] ${newMember.user.username}#${newMember.user.discriminator}'s town has been set offline automatically (Discord offline)`)
  }
})

/*
Logging things should start from here. Send to channel `logs` please
*/

bot.on('guildMemberAdd', async guildMember => { // When someone joins a guild that Bot joins
  if (!botConfig.log) return

  let user = guildMember.user
  let sendData = new Discord.RichEmbed()
  .setColor([35, 209, 96])
  .setAuthor('Member Joined', user.displayAvatarURL)
  .setDescription(`<@${user.id}> ${user.username}#${user.discriminator}`)
  .setFooter(`UserID: ${user.id} | ${new Date()}`)

  bot.channels.get(botConfig.channelID.log).send(sendData)
})

bot.on('guildBanAdd', async (guild, user) => {
  if (!botConfig.log) return

  let sendData = new Discord.RichEmbed()
  .setColor(`RED`)
  .setAuthor('Member Banned', user.displayAvatarURL)
  .setDescription(`<@${user.id}> ${user.username}#${user.discriminator}`)
  .setFooter(`UserID: ${user.id} | ${new Date()}`)

  bot.channels.get(botConfig.channelID.log).send(sendData)
})

bot.on('guildMemberUpdate', async (oldMember, newMember) => {
  // TODO: Detect Changes between old and new, Output the corresponding RichEmbed.
})

/*
EXPRESS STUFF STARTS HERE
*/

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/index'))
app.use('/edituserinfo', require('./routes/edituserinfo'))
app.use('/github/update', require('./routes/githubupdate'))

// Initalize!
app.listen(botConfig.port) // Auto Update GitHub
bot.login(botConfig.token) // Bot Itself

// On exit

process.on('exit', (code) => {
  bot.destroy()
  console.log(`[EXIT] About to exit with code ${code}`)
})
