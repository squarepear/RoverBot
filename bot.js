console.log('[INFO] I\'m starting up! Please wait until the next message!')

const botConfig = require('./botConfig.json')
const Discord = require('discord.js')
const fs = require('fs')
const schedule = require('node-schedule')
var express = require('express')
var path = require('path')
var badWords = require('bad-words')
var filter = new badWords()
var mongoose = require('mongoose')

var app = express()
const bot = new Discord.Client()

var helpInfo = require('./help.json')
var messageReactions = require('./messageReactions.json')
var dbAccess = require('./dbAccess')
var commandsPath = require(`path`).join(__dirname, 'cmds')
var cmds = []
var startupTime = Date.now()
var townChannel

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

    bot.channels.get(botConfig.channelIDs.events).send(new Discord.RichEmbed()
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
  townChannel = bot.channels.get(botConfig.channelIDs.onlineTowns)
  bot.user.setGame(`Do ${botConfig.prefix}help to get help!`)
})

// on message

bot.on('message', async message => {
  if (message.author.bot) return

  // if (filter.isProfane(message.content)) {
  //   console.log(`[FILTER] ${message.author.username}#${message.author.discriminator} cursed. Message: ${filter.clean(message.content)}`)
  //   bot.channels.get(botConfig.channelIDs.logs).send(new Discord.RichEmbed()
  //   .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
  //   .setDescription(`<@${message.author.id}> just said \`${filter.clean(message.content)}\` in <#${message.channel.id}>`)
  //   .setColor('ORANGE')
  //   .setFooter(`Current Server Time: ${new Date().toString()}`))
  //   message.channel.send(`<@${message.author.id}> just said bad words. Don't you know that's illegal?`)
  //   message.delete()
  //   return
  // }

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
    onlineChannel: townChannel,
    startup: startupTime
  }
  let cmd = cmds[command.toUpperCase()]

  if (cmd != null) {

    if (cmd.info.notInDM && message.channel.type == 'dm') {
      message.channel.send('You can\'t use this command in a dm channel')
      return
    }

    cmd.Command(data)
  } else {
    message.channel.send('The command is invalid! Do `!help` if you need help.')
  }
})

bot.on('messageReactionAdd', async (reaction, user) => {
  if (user.bot) return

  console.log(botConfig.channelIDs.onlineTowns)
  // bot.channels.get(botConfig.channelIDs.onlineTowns).send(botConfig.channelIDs.onlineTowns)

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

bot.on('presenceUpdate', async (oldMember, newMember) => { // Set town Offline
  if (newMember.presence.status === 'offline') {
    dbAccess.setOfflineTown(newMember.id).then((offline) => {
      if (offline === 'offline') {
        data.channel.send(`<@${data.newMember.id}>'s Town has been set offline automatically! *(The user is offline on Discord)*`)
        console.log(`[AUTOOFFLINE] ${data.newMember.user.username}#${data.newMember.user.discriminator}'s town has been set offline automatically (Discord offline)`)
      }
    })
  }

  // if (newMember.presence.status === 'offline') {
  //   dbAccess.setOfflineTown(newMember.id, [(offline, data) => {
  //     if (offline === 'offline') {
  //       data.channel.send(`<@${data.newMember.id}>'s Town has been set offline automatically! *(The user is offline on Discord)*`)
  //       console.log(`[AUTOOFFLINE] ${data.newMember.user.username}#${data.newMember.user.discriminator}'s town has been set offline automatically (Discord offline)`)
  //     }
  //   }, { 'newMember' : newMember, 'channel' : townChannel }])
  // }
})

/*
Logging things should start from here. Send to channel `logs` please
*/

bot.on('guildMemberAdd', async guildMember => { // When someone joins a guild that Bot joins
  if (!botConfig.channelIDs.logs) return

  let user = guildMember.user
  let sendData = new Discord.RichEmbed()
  .setColor([35, 209, 96])
  .setAuthor('Member Joined', user.displayAvatarURL)
  .setDescription(`<@${user.id}> ${user.username}#${user.discriminator}`)
  .setFooter(`UserID: ${user.id} | ${new Date()}`)

  bot.channels.get(botConfig.channelIDs.logs).send(sendData)
})

bot.on('guildBanAdd', async (guild, user) => {
  if (!botConfig.channelIDs.logs) return

  let sendData = new Discord.RichEmbed()
  .setColor(`RED`)
  .setAuthor('Member Banned', user.displayAvatarURL)
  .setDescription(`<@${user.id}> ${user.username}#${user.discriminator}`)
  .setFooter(`UserID: ${user.id} | ${new Date()}`)

  bot.channels.get(botConfig.channelIDs.logs).send(sendData)
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
