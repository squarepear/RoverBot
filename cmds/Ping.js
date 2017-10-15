this.info = {
  aliases: [
    'Pong'
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
  console.log(`[PING] ${data.user.username}#${data.user.discriminator} has requested a ping!`)
  return `*Ping!* \`${new Date().getTime() - data.message.createdTimestamp}ms\``
}
