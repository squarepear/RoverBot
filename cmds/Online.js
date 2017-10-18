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
  let a = db.setOnlineTown(data.user.id)

  if (a === 'alreadyOnline') {
    return 'Your town is already Online!'
  } else if (a === 'pushed') {
    console.log(`[ONLINE] ${data.user.username}#${data.user.discriminator} has set their town online!`)
    data.botVar.channels.get('368714134302359562').send(`<@${data.user.id}>'s town is Online! \n Go ahead and join their town! @here`)
    return 'Your town has been set Online!'
  } else {
    return 'Unknown error! Please contact the developer!'
  }
}
