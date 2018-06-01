var db = require('../dbAccess')
var { CreateInfoEmbed } = require('./Info.js')
const fcPattern = /^(\d{4}-\d{4}-\d{4})$/

this.info = {
  aliases: [
    'lookupfc',
    'whoisfc',
    'whofc'
  ],
  helpInfo: {
    show: true,
    category: 'ACCF',
    name: 'Template',
    usage: 'temp [template]',
    desc: 'Templates a template'
  },
  notInDM: true
}

this.Command = function (data) {
  // Test for arguments
  let regexCheck = fcPattern.test(data.args.join(' ')) // Boolean. Check if message contains a correct FC
  if (regexCheck) { // If true
    let FC = fcPattern.exec(data.args.join(' '))
    db.getUserInfoFromFC(FC[0]).then((userInfo) => {
      onFind(userInfo, data)
    })
  } else {
    data.message.channel.send('Invalid Friend Code!\nThe code format should be `xxxx-xxxx-xxxx`')
  }
}

const onFind = (userInfo, data) => {
  if (userInfo === null) {
    data.message.channel.send('Nobody has registered with that friend code')
  } else {
    data.botVar.fetchUser(userInfo.discordId).then((user) => {
      data.message.channel.send(CreateInfoEmbed(userInfo, user, data.message.channel.guild))
    })
  }
}
