var db = require('../dbAccess.js')

this.info = {
  aliases: [
    'setOffline',
    'setTownOffline',
    'setMyTownOffline'
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
  db.setOfflineTown(data.user.id, [onFind, data])
  return ''
}

function onFind(info, data) {
  if (info === 'alreadyOffline') {
    data.message.channel.send('Your town is already Offline!')
  } else if (info === 'offline') {
    console.log(`[OFFLINE] ${data.user.username}#${data.user.discriminator} has set their town offline!`)
    data.message.channel.send('Your town has been set Offline!')
  } else { // Not online nor deleted
    data.message.channel.send('Unknown error! Please contact the developer!')
  }
}
