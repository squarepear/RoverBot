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
    console.log(`[GIT] ${data.user.username}#${data.user.discriminator} ran git pull`)
    cmd.run('git pull')
    cmd.run('npm install')
    return 'Pulling'
  } else {
    return 'Hey! You can\'t do that!'
  }
}
