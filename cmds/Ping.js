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
  },
  notInDM: false
}

this.Command = function (data) {
  let ping = new Date().getTime() - data.message.createdTimestamp

  console.log(`[PING] ${data.user.username}#${data.user.discriminator} has asked for bot's ping (${ping}ms)`)
  return `*Pong!* \`${ping}ms\``
}
