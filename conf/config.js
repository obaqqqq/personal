var path = require('path')
  , rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    db:'mongodb://localhost/personal_dev',
    root: rootPath,
  }
}