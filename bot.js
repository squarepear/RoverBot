// Setting variables

console.log('[INFO] I\'m starting up! Please wait until the next message!');

const botConfig = require('./botconfig.json')
const Discord = require('discord.js')
const Wikia = require('node-wikia')
const Database = require('better-sqlite3')
const cmd = require('node-cmd')
var express = require('express')
var app = express()

const bot = new Discord.Client()
const fcpattern = new RegExp(/^(\d{4}-\d{4}-\d{4})$/g)

var wikia = new Wikia('animalcrossing')
var db = new Database('userInfo.db')

// Launching bot
bot.on('ready', async () => {
  console.log(`[INFO] I\'m logged on as ${bot.user.username}!`)
  console.log('[INFO] I\'m ready!');

  try {
    let link = await bot.generateInvite(['READ_MESSAGES', 'SEND_MESSAGES'])
    console.log('[INFO] Here is my invite link: ' + link);
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
  let member = message.member
  let messageArray = message.content.trim().split(' ')
  let command = messageArray[0].replace(botConfig.prefix, '')
  let args = messageArray.slice(1)
  let server = message.guild;
  // Commands code starts here!
  switch (command.toUpperCase()) {
    // !userinfo
    case 'USERINFO':
      let userinfo = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor(user.username)
        .setDescription(`#${user.discriminator}`)
        .addField('Created on: ', user.createdAt)
        .setThumbnail(user.avatarURL)
      message.channel.send({ embed: userinfo })
      console.log(`[USERINFO] ${user.username} has requested his details!`);
      break
    // !wiki
    case 'WIKI':
      if (args.length > 0) {
        wikia.getSearchList({'query': args.join(' ')}).then(function (data) {
          message.channel.send(data.items[0].url)
          console.log(`[WIKI] ${user.username} has requested a wiki about ${args.join(' ')} successfully!`);
        })
        .fail(function (e) {
          message.channel.send(' There isn\'t any wiki page about `' + args + '`')
          console.log(`[WIKI] ${user.username} has requested a wiki about ${args.join(' ')} and failed!`)
        })
      } else {
        message.channel.send(botConfig.wiki)
      }
      break

    // !help
    // DONT FORGET TO ADD NEW COMMANDS HERE!

    case 'HELP':
      var helpCategory, helpUsage, helpMore, helpCategoryGeneral, helpCategoryACCF

      helpCategory += '- **General**: General commands - for you when you need to know stuff \n'
      helpCategory += '- **ACCF**: ACCF commands for ACCF informations'

      helpUsage += '**To find out what commands are in a category**, use `!help [Category]`. \n'
      helpUsage += 'If you need additional information for each command, use `!command [Command].`'

      helpMore += 'Need more help? Just ask directly to the creator of the bot or ask mods!'

      helpCategoryGeneral += '``` \n'
      helpCategoryGeneral += 'General - General commands                      \n'
      helpCategoryGeneral += '                                                \n'
      helpCategoryGeneral += 'Commands                  Description           \n'
      helpCategoryGeneral += '------------------------- ----------------------\n'
      helpCategoryGeneral += 'help [Category / Command] Displays help message \n'
      helpCategoryGeneral += 'wiki [Wiki page name]     Shows ACCF wiki page  \n'
      helpCategoryGeneral += '```'

      helpCategoryACCF += '```\n'
      helpCategoryACCF += 'ACCF - Villager informations                                      \n'
      helpCategoryACCF += '                                                                  \n'
      helpCategoryACCF += 'Commands                               Description                \n'
      helpCategoryACCF += '-------------------------------------- ---------------------------\n'
      helpCategoryACCF += 'info [Optional mentions]               Shows town informations    \n'
      helpCategoryACCF += 'name [Mentions / Your character name]  Show / Set character name  \n'
      helpCategoryACCF += 'town [Mentions / Your town name]       Show / Set town name       \n'
      helpCategoryACCF += 'fruit [Mentions / Your fruit type]     Show / Set fruit type      \n'
      helpCategoryACCF += 'note [Mentions / Your note to players] Show / Set notes to players\n'
      helpCategoryACCF += '```\n'

      if (args.length == 0) { // If no arguments, do this!
        let helpMessage = new Discord.RichEmbed()
          .setColor('RANDOM')
          .setAuthor('RoverBot Help', bot.user.avatarURL)
          .setDescription('Help has been sent!')
          .addField('🗒️ Categories', helpCategory)
          .addField('Usage', helpUsage)
          .addField('More help?', helpMore)
          .addField('Author', 'This bot is made by <@237985610084777994> with help from <@189769721653100546> and GitHub Contributors!')
        message.channel.send({ embed: helpMessage })

      }else { // If people sends Categories
        switch (args[0].toUpperCase()) {
          case 'GENERAL':
            message.channel.send(helpCategoryGeneral)
            break
          case 'ACCF':
            message.channel.send(helpCategoryACCF)
            break
          default:
            message.channel.send('❌ Category invalid!')
        }
      }
      console.log(`[HELP] ${user.username} has requested help!`);
      break

    // !fc

    case 'FC':
      if (args.length === 0) {
        var usr = user
        var usrinfo = getUserInfo(usr.id)
        if (usrinfo.FriendCode != null) {
          message.channel.send(usr.username + "'s Friend Code is: `" + usrinfo.FriendCode + '`')
        } else {
          message.channel.send(' ' + usr.username + ' has not set a Friend Code yet!')
        }
      } else if (args.length === 1) {
        if (fcpattern.test(args[0])) {
          setUserInfo(user.id, { FriendCode: args[0] })
          message.channel.send(' Your Friend Code is now `' + args[0] + '`')
          member.addRole( server.roles.find('name', 'Villager') , 'Added friend code')
          member.removeRole( server.roles.find('name', 'Newbie') , 'Added friend code')
        } else if (message.mentions.users.first() != null) {
          usr = message.mentions.users.first()
          usrinfo = getUserInfo(usr.id)
          if (usrinfo.FriendCode != null) {
            message.channel.send(usr.username + "'s Friend Code is: `" + usrinfo.FriendCode + '`')
          } else {
            message.channel.send('' + usr.username + ' has not set a Friend Code yet')
          }
        } else {
          message.channel.send(' Invalid Friend Code or User!')
          message.channel.send('The code format should be `xxxx-xxxx-xxxx`')
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
          message.channel.send(' ' + usr.username + ' has not set a Name yet')
        }
      } else if (args.length === 1 && message.mentions.users.first() != null) {
        usr = message.mentions.users.first()
        usrinfo = getUserInfo(usr.id)
        if (usrinfo.Name != null) {
          message.channel.send(usr.username + "'s Name is: `" + usrinfo.Name + '`')
        } else {
          message.channel.send(' ' + usr.username + ' has not set a Name yet')
        }
      } else if (args.join(' ').length <= 8 && message.mentions.users.first() == null) {
        setUserInfo(user.id, { Name: args.join(' ') })
        message.channel.send(' Your Name is now `' + args.join(' ') + '`')
      } else if (args.join(' ').length > 8 && message.mentions.users.first() == null) {
        message.channel.send(' Your Name can\'t be longer than 8 letters')
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
          message.channel.send(' ' + usr.username + ' has not set a Town Name yet!')
        }
      } else if (args.length === 1 && message.mentions.users.first() != null) {
        usr = message.mentions.users.first()
        usrinfo = getUserInfo(usr.id)
        if (usrinfo.Town != null) {
          message.channel.send(usr.username + "'s Town is: `" + usrinfo.Town + '`')
        } else {
          message.channel.send(' ' + usr.username + ' has not set a Town Name yet')
        }
      } else if (args.join(' ').length <= 8 && message.mentions.users.first() == null) {
        setUserInfo(user.id, { Town: args.join(' ') })
        message.channel.send(' Your Town is now `' + args.join(' ') + '`')
      } else if (args.join(' ').length > 8 && message.mentions.users.first() == null) {
        message.channel.send(' Your Town Name can\'t be longer than 8 letters')
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
          message.channel.send(' ' + usr.username + ' has not set a Fruit yet')
        }
      } else if (args.length === 1) {
        if (message.mentions.users.first() != null) {
          usr = message.mentions.users.first()
          usrinfo = getUserInfo(usr.id)
          if (usrinfo.Fruit != null) {
            message.channel.send(usr.username + "'s Fruit is: `" + usrinfo.Fruit + '`')
          } else {
            message.channel.send(' ' + usr.username + ' has not set a Fruit yet')
          }
        } else {
          switch (args[0].toUpperCase()) {
            case 'ALL':
            case 'FULL':
              setUserInfo(user.id, { Fruit: 'All' })
              message.channel.send('Your Fruit is now `All`')
              break
            case 'PEACH':
            case 'PEACHES':
              setUserInfo(user.id, { Fruit: 'Peach' })
              message.channel.send('🍑 Your Fruit is now `Peach`')
              break
            case 'PEAR':
            case 'PEARS':
              setUserInfo(user.id, { Fruit: 'Pear' })
              message.channel.send('🍐 Your Fruit is now `Pear`')
              break
            case 'APPLE':
            case 'APPLES':
              setUserInfo(user.id, { Fruit: 'Apple' })
              message.channel.send('🍎 Your Fruit is now `Apple`')
              break
            case 'ORANGE':
            case 'ORANGES':
              setUserInfo(user.id, { Fruit: 'Orange' })
              message.channel.send('🍊 Your Fruit is now `Orange`')
              break
            case 'CHERRY':
            case 'CHERRIES':
              setUserInfo(user.id, { Fruit: 'Cherry' })
              message.channel.send('🍒 Your Fruit is now `Cherry`')
              break
            default:
              message.channel.send(' Invalid Fruit!')
              break
          }
        }
      } else {
        message.channel.send('Usage: `!fruit [fruit]` or `!fruit [mention]`')
      }
      break

    // !note

    case 'NOTE':
      try {
        if (args.length === 0) {
          usr = user
          usrinfo = getUserInfo(usr.id)
          if (usrinfo.Note != null) {
            message.channel.send(usr.username + "'s Note is: `" + usrinfo.Note + '`')
          } else {
            message.channel.send(' ' + usr.username + ' has not set a Note yet')
          }
        } else if (message.mentions.users.first() == null && args.length > 0) {
          setUserInfo(user.id, { Note: args.join(' ') })
          message.channel.send(' Your Note is now `' + args.join(' ') + '`')
        } else if (message.mentions.users.first() != null && args.length === 1) {
          usr = message.mentions.users.first()
          usrinfo = getUserInfo(usr.id)
          if (usrinfo.Note != null) {
            message.channel.send(usr.username + "'s Note is: `" + usrinfo.Note + '`')
          } else {
            message.channel.send(' ' + usr.username + ' has not set a Note yet')
          }
        } else {
          message.channel.send('Usage: `!note [note]` or `!note [mention]`')
        }
      } catch (e) {
        message.channel.send(' ' + usr.username + ' has not set a Note yet')
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
              message.channel.send(' ' + usr.username + ' has not set a Friend Code yet')
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
            message.channel.send(' ' + usr.username + ' has not set a Friend Code yet')
          }
        } else {
          message.channel.send('Usage: `!info [mention]`')
        }
      } catch (e) {
        message.channel.send(' The user hasn\'t given any information to the bot!')
      }
      break

      /* !eval
      OI BE CAREFUL HERE! ONLY ALLOW SQUARE PEAR AND ANGELOANAN TO DO !EVAL OR THE SERVER MIGHT BE BROKEN! */

    case 'EVAL':
        // Check if user is squarepear or angeloanan
      if (message.author.id === '189769721653100546' || '237985610084777994') { // First is angeloanan second is squarepear
        console.log('Someone has just ran an eval command!')
          /* Set these things
            input = command input
            output = command output
          */

        let input = args
        // Catch error
        try { var output = eval(input) } catch (e) {  // Standard JS doesn't approve this line because of eval()
          let evalmsg = new Discord.RichEmbed()
          .setColor('RED')
          .setTitle('Eval Error')
          .setDescription('This code returns with an error!')
          .addField('Input Code', '`' + input + '`')
          .addField('Error', '`' + e + '`')
          message.channel.send({ embed: evalmsg })
          console.log('The eval returned with an error!')
        }
        // If there isn't any error
        let evalmsg = new Discord.RichEmbed()
        .setColor('GREEN')
        .setTitle('Eval Success')
        .setDescription('This code ran successfully!')
        .addField('Input Code', '`' + input + '`')
        .addField('Return', '`' + output + '`')
        .setFooter('This is an eval')
        message.channel.send({ embed: evalmsg })
        console.log('The eval returned with a success!')
      }
      break

    // if prefix + not valid command
    default:
      message.channel.send(' The command is invalid! Do `!help` if you need help.')
      break
  }
})

// Express stuff for auto updating with GitHub

app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

app.post('/github/update', function (req, res) {
  res.send('POST request to the homepage')
  cmd.run('git pull')
  cmd.run('npm install')
})

// PREMADE FUNCTIONS!

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

app.listen(3000)

bot.login(botConfig.token)
