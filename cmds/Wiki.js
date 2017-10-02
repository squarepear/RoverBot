const wikia = new require('node-wikia')('animalcrossing')


var info = {
  aliases: [
    'wikia',
    'search'
  ],
  helpInfo: {
    show: true,
    name: 'Wiki',
    usage: 'wiki [search]',
    desc: 'Seraches the ACCF wikia'
  }
}

function Command(data) {
  if (args.length > 0) {
    wikia.getSearchList({'query': args.join(' ')}).then(function (data) {
      return data.items[0].url
      console.log(`[WIKI] ${data.user.username} has requested a wiki about ${args.join(' ')} successfully!`);
    })
    .fail(function (e) {
      return ' There isn\'t any wiki page about `' + args + '`'
      console.log(`[WIKI] ${data.user.username} has requested a wiki about ${args.join(' ')} and failed!`)
    })
  } else {
    return 'http://animalcrossing.wikia.com/wiki/Animal_Crossing_Wiki'
  }
}
