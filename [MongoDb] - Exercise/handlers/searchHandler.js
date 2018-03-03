let formidable = require('formidable');
const Image = require('./../models/ImageSchema');
const displayResults = require('./../utilities/displayResults');
let Tag = require('./../models/TagSchema');

module.exports = (req, res) => {
  if (req.pathname === '/search') {
      let parameters = req.pathquery;
      let {tagName, afterDate, beforeDate} = parameters;
      let query = {};
      let limit = 10;

      if (parameters.Limit !== '') {
          limit = parameters.Limit;
      }

      if (tagName !== '') {
          let tags = tagName.split(',').filter(t => t !== '');
          tags = tags.map(t => {
              return t.trim()
          });
          query["$or"] = [];

          for (tag of tags) {
              query["$or"].push({tagName:tag});
          }
      }

      Tag.find(query).populate('images').exec((err, tags) => {
          if (err) {
              console.log(err);
              return
          }
          console.log(query);

          let images = [];
          for (let tag of tags) {
              for (let image of tag.images) {
                  if (tag.images.length > 0) {
                      let validImageDate = true;

                      if (afterDate !== '') {
                          if (new Date(image.dateC) < new Date(afterDate)) {
                              validImageDate = false;
                          }
                      }

                      if (beforeDate !== '') {
                          if (new Date(image.dateC) > new Date(beforeDate)) {
                              validImageDate = false;
                          }
                      }
                      if (validImageDate) {
                          images.push(image);
                      }
                  }
              }
          }

          let uniqueImages = images.filter((elem, pos) => {
              return images.indexOf(elem) === pos;
          });

          if (uniqueImages.length > limit) {
              uniqueImages.length = limit;
          }
          displayResults(res, uniqueImages);
      });
  } else {
    return true
  }
};
