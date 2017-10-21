const Wikia = require('node-wikia')
const wikia = new Wikia('animalcrossing')

this.info = {
  aliases: [
    'wikia',
    'search'
  ],
  helpInfo: {
    show: true,
    category: 'GENERAL',
    name: 'Wiki',
    usage: 'wiki [search]',
    desc: 'Seraches the ACCF wikia'
  }
}

this.Command = function (data) {
  if (data.args.length > 0) {
    wikia.getSearchList({'query': data.args.join(' ')}).then(function (returnedData) {
      console.log(`[WIKI] ${data.user.username}#${data.user.discriminator} has requested a wiki about ${data.args.join(' ')} successfully!`)
      console.log(`[WIKI] ${returnedData.items}`)
      return returnedData.items
    })
    .fail(function (e) {
      console.log(`[WIKI] ${data.user.username}#${data.user.discriminator} has requested a wiki about ${data.args.join(' ')} and failed!`)
      return ' There isn\'t any wiki page about `' + data.args.join(' ') + '`'
    })
  } else {
    return 'http://animalcrossing.wikia.com/wiki/Animal_Crossing_Wiki'
  }
}
