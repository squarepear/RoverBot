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
  db.setOfflineTown(data.user.id)
  data.botVar.channels.get('368714134302359562').send(`<@${data.user.id}>'s town is Offline!`)
  return 'Your town has been set Offline!'
}
