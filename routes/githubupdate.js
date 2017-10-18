var express = require('express')
var router = express.Router()
const cmd = require('node-cmd')

/* GET home page. */
router.post('/', function (req, res) {
  res.send('POST request to the homepage')
  cmd.run('git pull')
  cmd.run('npm install')
})

module.exports = router
