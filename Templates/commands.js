this.info = {
  aliases: [
    'SomeAlias',
    'AnoutherAlias'
  ],
  helpInfo: {
    show: true,
    category: 'TEMPLATE',
    name: 'Template',
    usage: 'temp [template]',
    desc: 'Templates a template'
  },
  notInDM: false
}

// Function to run when user uses this command (Don't change the function name)
this.Command = function (data) {
  if (data.args.length > 0) {
    // Do stuff
  } else {
    // This is the message the bot sends
    data.message.channel.send('Message')
  }
}
