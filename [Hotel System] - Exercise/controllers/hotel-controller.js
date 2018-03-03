const Hotel = require('./../models/Hotel');
const Comment = require('../models/Comment');
const Category = require('../models/Category');

module.exports = {
    index: (req, res) => {
        Category.find({}).then(categories => {
            console.log("categories", categories);
            res.render('hotels/generateHotel', {categories})
        }).catch(err => {
            console.log(err);
        })
    },
    post: async (req, res) => {
        let {title, location, image, type, textArea} = req.body;
        let fields = [title, location, image, type, textArea];
        try {
            let categories = await Category.find({});
            //validation
            for (let field of fields) {
                if (field.length < 1) {
                    return res.render('hotels/generateHotel', {categories, error: 'Please fill all fields'});
                }
            }
        } catch(err) {
            console.log(err);
        }


        Hotel.create({
            title,
            description: textArea,
            location,
            imageUrl: image,
            type
        }).then(hotel => {
            res.redirect('list');
        })
    },
    list: (req, res) => {
        Hotel.find({}).sort('-date')
            .exec((err, hotels) => {
                if (err) {
                    console.log(err);
                    return
                }
                res.render('hotels/hotelList', {hotels});
            })
    },
    details: (req, res) => {
        let {id} = req.query;
        Hotel.findById(id)
            .populate({
                path: 'comments',
                populate: {
                    path: 'creator',
                    model: 'User'
                }
            })
            .exec((err, selectedHotel) => {
            if (err) {
                console.log(err);
                return
            }
                console.log(selectedHotel);
                res.render('hotels/details', {selectedHotel});
            })
    },
    comment: (req, res) => {
        let {title, comment} = req.body;
        let id = req.params.id;

        let commentBody = {
            title,
            comment,
            creator: req.user._id,
            hotel: id
        };

        Comment.create(commentBody)
            .then(newComment => {
                Hotel.update({_id: id}, {$push: {comments: newComment._id}},
                    function (err, data) {
                    res.redirect('back');
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
};