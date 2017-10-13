this.info = {
  aliases: [
    'SomeAlias',
    'AnoutherAlias'
  ],
  helpInfo: {
    show: true,
    catagory: 'TEMPLATE',
    name: 'Template',
    usage: 'temp [template]',
    desc: 'Templates a template'
  }
}

// Function to run when user uses this command (Don't change the function name)
this.Command = function (data) {
  if (data.args.length > 0) {
    // Do stuff
  } else {
    // This is the message the bot sends
    return 'Some Message'
  }
}
