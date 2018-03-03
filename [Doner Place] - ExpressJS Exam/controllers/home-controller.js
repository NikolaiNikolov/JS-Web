const Product = require('./../models/Product');

module.exports = {
    index: (req, res) => {

        Promise.all([Product.find({category: 'beef'}),
            Product.find({category: 'chicken'}),
            Product.find({category: 'lamb'})])
            .then((products) => {
                let viewData = {beef: products[0], chicken: products[1], lamb: products[2]};
                res.render('home/index', viewData);
            });
    }
};