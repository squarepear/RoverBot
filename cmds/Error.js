const Discord = require('discord.js')
var request = require('request')

this.info = {
  aliases: [
    'error',
    'checkerror',
    'wiimmfierror'
  ],
  helpInfo: {
    show: true,
    category: 'GENERAL',
    name: 'Error',
    usage: 'error [code]',
    desc: 'Seraches the ACCF Wiimmifi error codes'
  }
}

this.Command = function (data) {
  if (data.args.length > 0) {
    searchError(data.args.join(''), data)
    return ''
  } else {
    return 'https://wiimmfi.de/error'
  }
}

function searchError(query, data) {
  request(`https://wiimmfi.de/error?e=${data.args.join('')}&&m=json`, function (error, response, body) {
    if (error) {
      console.log('error:', error)
    }

    let bodyJSON = JSON.parse(body)

    if (bodyJSON[0].found >= 1) {
      let errorData = bodyJSON[0].infolist[0]

      data.message.channel.send(
        new Discord.RichEmbed()
        .setColor('RED')
        .setAuthor(`ERROR CODE`)
        .setDescription(bodyJSON[0].error)
        .addField('TYPE', errorData.type, true)
        .addField('NAME', errorData.name, true)
        .addField('INFO', errorData.info, true)
      )

      console.log(`[ERRORCODES] ${data.user.username}#${data.user.discriminator} has checked the error code ${data.args.join('')} successfully!`)
      console.log(`[ERRORCODES] https://wiimmfi.de/error?e=${data.args.join('')}`)
    } else {
      console.log(`[ERRORCODES] ${data.user.username}#${data.user.discriminator} has checked the error code ${data.args.join('')} and failed!`)
      data.message.channel.send(`Error code ${data.args.join('')} does not exist`)
    }
  })
}
