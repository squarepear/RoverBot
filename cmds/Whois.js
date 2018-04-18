var db = require('../dbAccess')
var infoCommand = require('./Info')
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
    data.CreateRichEmbed = infoCommand.CreateRichEmbed
    db.getUserInfoFromFC(FC[0], [onFind, data])
    return ''
  } else {
    return ' Invalid Friend Code! \n The code format should be `xxxx-xxxx-xxxx`'
  }
}

function onFind(userInfo, data) {
  if (userInfo === null) {
    data.message.channel.send('Nobody has registered with that friend code')
  } else {
    data.botVar.fetchUser(userInfo.discordId).then((user) => {
      data.message.channel.send(data.CreateRichEmbed(userInfo, data.message))
    })
  }
}
