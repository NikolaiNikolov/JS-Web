const formidable = require('formidable');
const Image = require('./../models/ImageSchema');
let Tag = require('./../models/TagSchema');
let displayHomePage = require('./../utilities/displayHomePage');

let handleError = (err) => console.log(err);
let addImage = (req, res) => {
    let form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        fields.tags = fields.tagsID.split(',');
        fields.tags.pop();
        delete fields.tagsID;
        console.log(fields);

        Image.create(fields, (err, img) => {
            if (err) {
                console.log(err);
                return
            }

            let targetedTags = img.tags;
            Tag.update(
                {_id: {$in: targetedTags}},
                {$push: {images: img._id}},
                {multi: true})
                .then((resolve) => {
                    displayHomePage(res);
                })
                .catch((err) => console.log(err));
            displayHomePage(res);
        }).catch((err) => console.log(err));
    })
};

let deleteImg = (req, res) => {};

module.exports = (req, res) => {
    if (req.pathname === '/addImage' && req.method === 'POST') {
        addImage(req, res)
    } else if (req.pathname === '/delete' && req.method === 'GET') {
        deleteImg(req, res)
    } else {
        return true
    }
};
