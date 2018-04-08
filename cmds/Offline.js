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
  let a = db.setOfflineTown(data.user.id)

  if (a === 'alreadyOffline') {
    return 'Your town is already Offline!'
  } else if (a === 'offline') {
    console.log(`[OFFLINE] ${data.user.username}#${data.user.discriminator} has set their town offline!`)
    return 'Your town has been set Offline!'
  } else { // Not online nor deleted
    return 'Unknown error! Please contact the developer!'
  }
}
