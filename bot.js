// Setting variables

console.log('[INFO] I\'m starting up! Please wait until the next message!')

const botConfig = require('./botconfig.json')
const Discord = require('discord.js')
const fs = require('fs')
const cmd = require('node-cmd')
var express = require('express')

var app = express()
const bot = new Discord.Client()

var helpInfo = require('./help.json')
var commandsPath = require(`path`).join(__dirname, 'cmds')
var cmds = []

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
})

// on message

bot.on('message', async message => {
  // bot message or not start with prefix = return
  if (!message.content.startsWith(botConfig.prefix)) return
  if (message.author.bot) return

  let messageArray = message.content.trim().split(' ')
  let command = messageArray[0].replace(botConfig.prefix, '')
  let args = messageArray.slice(1)
  let data = {
    user: message.author,
    command: command,
    args: args,
    message: message,
    bot: bot.user
  }
  let cmd = cmds[command.toUpperCase()]

  if (cmd != null) {
    var result = cmd.Command(data) // Send data to each handler. Returns with var `result`

    if (result != null) { // There should be always a result on each command.
      message.channel.send(result)
    } else {
      message.channel.send('`Great. This is RoverBot speaking. Now whoever sends command just broke my brain. Please mention Server Programmer to fix this otherwise I can\'t continue working.`')
    }
  } else {
    message.channel.send('The command is invalid! Do `!help` if you need help.')
  }
})

// Express stuff for auto updating with GitHub
app.post('/github/update', function (req, res) {
  res.send('POST request to the homepage')
  cmd.run('git pull')
  cmd.run('npm install')
})

// Initalize!
app.listen(3000) // Auto Update GitHub
bot.login(botConfig.token) // Bot Itself
