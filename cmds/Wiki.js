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
    searchWiki(data.args.join(' '), data)
    return ''
  } else {
    return 'http://animalcrossing.wikia.com/wiki/Animal_Crossing_Wiki'
  }
}

function searchWiki(query, data) {
  wikia.getSearchList({'query': query}).then(function (returnedData) {
    console.log(`[WIKI] ${data.user.username}#${data.user.discriminator} has requested a wiki about ${data.args.join(' ')} successfully!`)
    console.log(`[WIKI] ${returnedData.items}`)
    data.message.channel.send(returnedData.items)
  })
  .fail(function (e) {
    console.log(`[WIKI] ${data.user.username}#${data.user.discriminator} has requested a wiki about ${data.args.join(' ')} and failed!`)
    data.message.channel.send('There isn\'t any wiki page about `' + data.args.join(' ') + '`')
  })
}
