const User = require('../models/User')

module.exports = {
  get: (req, res) => {
    res.render('home/index')
  },
    about: (req, res) => {
      res.render('home/about')
    }
};
