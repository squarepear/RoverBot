const cmd = require('node-cmd')

this.info = {
  aliases: [
    'gitpull'
  ],
  helpInfo: {
    show: false,
    catagory: 'TEMPLATE',
    name: 'Template',
    usage: 'temp [template]',
    desc: 'Templates a template'
  }
}

this.Command = function (data) {
  if (data.message.member.hasPermission('ADMINISTRATOR')) {
    console.log(`[STATS] ${data.user.username}#${data.user.discriminator} has checked for the bot's status`)
    cmd.run('git pull')
    cmd.run('npm install')
    return 'Pulling'
  } else {
    return 'Hey! You can\'t do that!'
  }
}
