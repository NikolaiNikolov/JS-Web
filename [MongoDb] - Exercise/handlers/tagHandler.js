const formidable = require('formidable');
let Tag = require('./../models/TagSchema');
let displayHomePage = require('./../utilities/displayHomePage');

module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {
      let form = new formidable.IncomingForm();

      form.parse(req, function (err, fields, file) {
          Tag.create(fields).then(tag => {
              displayHomePage(res);
          }).catch(() => console.log(err));
      })
  } else {
    return true
  }
};
