const path = require('path')
module.exports = {
  development: {
    port: process.env.PORT || 3000,
    dbPath: 'mongodb://localhost:27017/hotel-system',
    rootPath: path.normalize(
      path.join(__dirname, '../../'))
  },
  production: {}
}
