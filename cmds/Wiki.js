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

this.Command = function(data) {
  if (data.args.length > 0) {
    wikia.getSearchList({'query': data.args.join(' ')}).then(function (data) {
      return data.items[0].url
      console.log(`[WIKI] ${data.user.username} has requested a wiki about ${data.args.join(' ')} successfully!`);
    })
    .fail(function (e) {
      return ' There isn\'t any wiki page about `' + data.args.join(' ') + '`'
      console.log(`[WIKI] ${data.user.username} has requested a wiki about ${data.args.join(' ')} and failed!`)
    })
  } else {
    return 'http://animalcrossing.wikia.com/wiki/Animal_Crossing_Wiki'
  }
}
