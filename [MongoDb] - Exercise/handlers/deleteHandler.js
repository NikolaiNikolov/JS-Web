const formidable = require('formidable');
const Image = require('./../models/ImageSchema');
let Tag = require('./../models/TagSchema');
let displayHomePage = require('./../utilities/displayHomePage');
let url = require('url');
let url_parts = url.parse(request.url, true);
let query = url_parts.query;


let deleteImage = (req, res) => {
    console.log(query);
};

module.exports = (req, res) => {
    if (req.pathname === '/delete') {
        deleteImage(req, res)
    } else {
        return true
    }
};
