var db = require('../dbAccess.js')

this.info = {
  aliases: [
    'ListOnlineTown',
    'ListOnlineTowns',
    'OnlineTownList',
    'OnlineTownsList',
    'GiveMeTheListOfOnlineTowns'
  ],
  helpInfo: {
    show: false,
    category: 'TEMPLATE',
    name: 'Template',
    usage: 'temp [template]',
    desc: 'Templates a template'
  }
}

// Function to run when user uses this command (Don't change the function name)
this.Command = function (data) {
  let onlineTowns = db.getOnlineTown()
}
