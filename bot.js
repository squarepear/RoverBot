// Setting variables

console.log('Hello World! I\'m starting!')

const botConfig = require('./botconfig.json')
const Discord = require('discord.js')
const Wikia = require('node-wikia')
const Database = require('better-sqlite3')

const bot = new Discord.Client()
const fcpattern = new RegExp(/^(\d{4}-\d{4}-\d{4})$/g)

var wikia = new Wikia('animalcrossing')
var db = new Database('userInfo.db')

// Launching bot
bot.on('ready', async () => {
  console.log(`${bot.user.username} is ready!`)

  try {
    let link = await bot.generateInvite(['READ_MESSAGES', 'SEND_MESSAGES'])
    console.log(link)
  } catch (e) {
    console.log(e.stack)
  }
})

// on message

bot.on('message', async message => {
  // bot message or not start with prefix = return
  if (message.author.bot) return
  if (!message.content.startsWith(botConfig.prefix)) return

  let user = message.author
  let messageArray = message.content.trim().split(' ')
  let command = messageArray[0].replace(botConfig.prefix, '')
  let args = messageArray.slice(1)

  switch (command.toUpperCase()) {
    // !userinfo
    case 'USERINFO':
      let userinfo = new Discord.RichEmbed()
        .setColor(getRandomColor())
        .setAuthor(user.username)
        .setDescription(`#${user.discriminator}`)
        .addField('Created on: ', user.createdAt)
        .setThumbnail(user.avatarURL)
      message.channel.send({ embed: userinfo })
      break
    // !wiki
    case 'WIKI':
      if (args.length > 0) {
        wikia.getSearchList({'query': args.join(' ')}).then(function (data) {
          message.channel.send(data.items[0].url)
        })
        .fail(function (e) {
          message.channel.send('There isn\'t any wiki page about `' + args + '`')
          console.log(e.stack)
        })
      } else {
        message.channel.send(botConfig.wiki)
      }
      break

    // !help
    // DONT FORGET TO ADD NEW COMMANDS HERE!

    case 'HELP':
      let help = new Discord.RichEmbed()
        .setColor(getRandomColor())
        .setTitle('Commands available')
        .addField('!help', 'Get a list of commands')
        .addField('!wiki [search]', 'Search the Wiki')
        .addField('!info (mention)', 'Get user info')
        .addField('!fc [code]', 'Add your Friend Code')
        .addField('!fc [mention]', 'Get someone elses Friend Code')
        .addField('!name [code]', 'Add your Name')
        .addField('!name [mention]', 'Get someone elses Name')
        .addField('!town [code]', 'Add your Town')
        .addField('!town [mention]', 'Get someone elses Town')
        .addField('!fruit [code]', 'Add your Native Fruit')
        .addField('!fruit [mention]', 'Get someone elses Native Fruit')
        .addField('!note [code]', 'Add your Note')
        .addField('!note [mention]', 'Get someone elses Note')
        .addField('Author', 'This bot is made by <@237985610084777994> with help from <@189769721653100546> and GitHub Contributors!')
        .setThumbnail(message.guild.iconURL)
      message.channel.send({ embed: help })
      break

    // !fc

    case 'FC':
      if (args.length === 0) {
        var usr = user
        var usrinfo = getUserInfo(usr.id)
        if (usrinfo.FriendCode != null) {
          message.channel.send(usr.username + "'s Friend Code is: `" + usrinfo.FriendCode + '`')
        } else {
          message.channel.send(usr.username + ' has not set a Friend Code yet')
        }
      } else if (args.length === 1) {
        if (fcpattern.test(args[0])) {
          setUserInfo(user.id, { FriendCode: args[0] })
          message.channel.send('Your Friend Code is now `' + args[0] + '`')
        } else if (message.mentions.users.first() != null) {
          usr = message.mentions.users.first()
          usrinfo = getUserInfo(usr.id)
          if (usrinfo.FriendCode != null) {
            message.channel.send(usr.username + "'s Friend Code is: `" + usrinfo.FriendCode + '`')
          } else {
            message.channel.send(usr.username + ' has not set a Friend Code yet')
          }
        } else {
          message.channel.send('Invalid Friend Code or User')
        }
      } else {
        message.channel.send('Usage: `!fc [code]` or `!fc [mention]`')
      }
      break

    // !name

    case 'NAME':
      if (args.length === 0) {
        usr = user
        usrinfo = getUserInfo(usr.id)
        if (usrinfo.Name != null) {
          message.channel.send(usr.username + "'s Name is: `" + usrinfo.Name + '`')
        } else {
          message.channel.send(usr.username + ' has not set a Name yet')
        }
      } else if (args.length === 1) {
        if (message.mentions.users.first() != null) {
          usr = message.mentions.users.first()
          usrinfo = getUserInfo(usr.id)
          if (usrinfo.Name != null) {
            message.channel.send(usr.username + "'s Name is: `" + usrinfo.Name + '`')
          } else {
            message.channel.send(usr.username + ' has not set a Name yet')
          }
        } else {
          setUserInfo(user.id, { Name: args[0] })
          message.channel.send('Your Name is now `' + args[0] + '`')
        }
      } else {
        message.channel.send('Usage: `!name [name]` or `!name [mention]`')
      }
      break

    // !town

    case 'TOWN':
      if (args.length === 0) {
        usr = user
        usrinfo = getUserInfo(usr.id)
        if (usrinfo.Town != null) {
          message.channel.send(usr.username + "'s Town is: `" + usrinfo.Town + '`')
        } else {
          message.channel.send(usr.username + ' has not set a Town yet')
        }
      } else if (args.length === 1) {
        if (message.mentions.users.first() != null) {
          usr = message.mentions.users.first()
          usrinfo = getUserInfo(usr.id)
          if (usrinfo.Town != null) {
            message.channel.send(usr.username + "'s Town is: `" + usrinfo.Town + '`')
          } else {
            message.channel.send(usr.username + ' has not set a Town yet')
          }
        } else {
          setUserInfo(user.id, { Town: args[0] })
          message.channel.send('Your Town is now `' + args[0] + '`')
        }
      } else {
        message.channel.send('Usage: `!town [town]` or `!town [mention]`')
      }
      break

    // !fruit

    case 'FRUIT':
      if (args.length === 0) {
        usr = user
        usrinfo = getUserInfo(usr.id)
        if (usrinfo.Fruit != null) {
          message.channel.send(usr.username + "'s Fruit is: `" + usrinfo.Fruit + '`')
        } else {
          message.channel.send(usr.username + ' has not set a Fruit yet')
        }
      } else if (args.length === 1) {
        if (message.mentions.users.first() != null) {
          usr = message.mentions.users.first()
          usrinfo = getUserInfo(usr.id)
          if (usrinfo.Fruit != null) {
            message.channel.send(usr.username + "'s Fruit is: `" + usrinfo.Fruit + '`')
          } else {
            message.channel.send(usr.username + ' has not set a Fruit yet')
          }
        } else {
          switch (args[0].toUpperCase()) {
            case 'ALL':
              setUserInfo(user.id, { Fruit: 'All' })
              message.channel.send('Your Fruit is now `All`')
              break
            case 'PEACH':
              setUserInfo(user.id, { Fruit: 'Peach' })
              message.channel.send('Your Fruit is now `Peach`')
              break
            case 'PEAR':
              setUserInfo(user.id, { Fruit: 'Pear' })
              message.channel.send('Your Fruit is now `Pear`')
              break
            case 'APPLE':
              setUserInfo(user.id, { Fruit: 'Apple' })
              message.channel.send('Your Fruit is now `Apple`')
              break
            case 'ORANGE':
              setUserInfo(user.id, { Fruit: 'Orange' })
              message.channel.send('Your Fruit is now `Orange`')
              break
            case 'CHERRY':
              setUserInfo(user.id, { Fruit: 'Cherry' })
              message.channel.send('Your Fruit is now `Cherry`')
              break
            case 'PEACHES':
              setUserInfo(user.id, { Fruit: 'Peach' })
              message.channel.send('Your Fruit is now `Peach`')
              break
            case 'PEARS':
              setUserInfo(user.id, { Fruit: 'Pear' })
              message.channel.send('Your Fruit is now `Pear`')
              break
            case 'APPLES':
              setUserInfo(user.id, { Fruit: 'Apple' })
              message.channel.send('Your Fruit is now `Apple`')
              break
            case 'ORANGES':
              setUserInfo(user.id, { Fruit: 'Orange' })
              message.channel.send('Your Fruit is now `Orange`')
              break
            case 'CHERRIES':
              setUserInfo(user.id, { Fruit: 'Cherry' })
              message.channel.send('Your Fruit is now `Cherry`')
              break
            default:
              message.channel.send('Invalid Fruit')
              break
          }
        }
      } else {
        message.channel.send('Usage: `!fruit [fruit]` or `!fruit [mention]`')
      }
      break

    // !note

    case 'NOTE':
      if (args.length === 0) {
        usr = user
        usrinfo = getUserInfo(usr.id)
        if (usrinfo.Note != null) {
          message.channel.send(usr.username + "'s Note is: `" + usrinfo.Note + '`')
        } else {
          message.channel.send(usr.username + ' has not set a Note yet')
        }
      } else if (message.mentions.users.first() == null && args.length > 0) {
        setUserInfo(user.id, { Note: args.join(' ') })
        message.channel.send('Your Note is now `' + args.join(' ') + '`')
      } else if (message.mentions.users.first() != null && args.length === 1) {
        usr = message.mentions.users.first()
        usrinfo = getUserInfo(usr.id)
        if (usrinfo.Note != null) {
          message.channel.send(usr.username + "'s Note is: `" + usrinfo.Note + '`')
        } else {
          message.channel.send(usr.username + ' has not set a Note yet')
        }
      } else {
        message.channel.send('Usage: `!note [note]` or `!note [mention]`')
      }
      break

    /* !info
    Lazy Programming. Just use try and catch */

    case 'INFO':
      try {
        if (args.length === 1) {
          if (message.mentions.users.first() != null) {
            usr = message.mentions.users.first()
            usrinfo = getUserInfo(usr.id)
            console.log(usrinfo)
            if (usrinfo.FriendCode != null) {
              message.channel.send(usr.username + "'s info is: \n Friend Code: `" + usrinfo.FriendCode + '` \n Name: `' + usrinfo.Name + '` \n Town: `' + usrinfo.Town + '` \n Fruit: `' + usrinfo.Fruit + '` \n Note: `' + usrinfo.Note + '`')
            } else {
              message.channel.send(usr.username + ' has not set a Friend Code yet')
            }
          } else {
            message.channel.send('Usage: `!info [mention]`')
          }
        } else if (args.length === 0) {
          usr = user
          usrinfo = getUserInfo(usr.id)
          if (usrinfo.FriendCode != null) {
            message.channel.send(usr.username + "'s info is: \n Friend Code: `" + usrinfo.FriendCode + '` \n Name: `' + usrinfo.Name + '` \n Town: `' + usrinfo.Town + '` \n Fruit: `' + usrinfo.Fruit + '` \n Note: `' + usrinfo.Note + '`')
          } else {
            message.channel.send(usr.username + ' has not set a Friend Code yet')
          }
        } else {
          message.channel.send('Usage: `!info [mention]`')
        }
      } catch (e) {
        message.channel.send('The user haven\'t give any information to the bot!')
      }
      break

    // if prefix + not valid command

    default:
      message.channel.send('The command is invalid! Do `!help` if you need help.')
      break
  }
})

// FUNCTIONS!

function getUserInfo (userID) {
  return db.prepare(`SELECT * FROM USERINFO WHERE UserID=?`).get(userID)
}

function setUserInfo (userID, info) {
  var row = db.prepare(`SELECT * FROM USERINFO WHERE UserID=?`).get(userID)

  if (row == null) {
    db.prepare(`INSERT INTO USERINFO (UserID) VALUES (?)`).run(userID)
    row = db.prepare(`SELECT * FROM USERINFO WHERE UserID=?`).get(userID)
  }
  if (info.FriendCode != null) { row.FriendCode = info.FriendCode.trim() }
  if (info.Name != null) { row.Name = info.Name.trim() }
  if (info.Town != null) { row.Town = info.Town.trim() }
  if (info.Fruit != null) { row.Fruit = info.Fruit.trim() }
  if (info.Note != null) { row.Note = info.Note.trim() }

  db.prepare(`UPDATE USERINFO SET FriendCode = @FriendCode, Name = @Name, Town = @Town, Fruit = @Fruit, Note = @Note WHERE UserID=?`).run(userID, row)
}

function getRandomColor () {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

bot.login(botConfig.token)
