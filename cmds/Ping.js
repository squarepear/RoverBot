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
  console.log(data.ping)
  return `*Ping!* \`${data.ping[0]}ms\``
}
