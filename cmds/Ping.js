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
  let ping = new Date().getTime() - data.message.createdTimestamp
  return `*Pong!* \`${ping}ms\``
}
