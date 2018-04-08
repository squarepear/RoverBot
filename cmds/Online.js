const botConfig = require('../botconfig.json')
var db = require('../dbAccess.js')

this.info = {
  aliases: [
    'setOnline',
    'setTownOnline',
    'setMyTownOnline'
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
  db.setOnlineTown(data.user.id, [onFind, data])
  return ''
}

function onFind(info, data) {
  if (info === 'alreadyOnline') {
    data.message.channel.send('Your town is already Online!')
  } else if (info === 'online') {
    console.log(`[ONLINE] ${data.user.username}#${data.user.discriminator} has set their town online!`)
    data.onlineChannel.send(`<@${data.user.id}>'s town is Online! \n Go ahead and join their town! @here`)
    data.message.channel.send('Your town has been set Online!')
  } else { // Not alreadyonline nor pushed
    data.message.channel.send('Unknown error! Please contact the developer!')
  }
}
