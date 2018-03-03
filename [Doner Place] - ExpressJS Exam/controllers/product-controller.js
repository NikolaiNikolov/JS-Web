const Product = require('./../models/Product');

module.exports = {
    get: (req, res) => {
        res.render('product/create')
    },
    post: (req, res) => {
        let {category, imageUrl, size, toppings} = req.body;
        toppings = toppings.split(',').map(t => t.trim());

        Product.create({
            category,
            imageUrl,
            size,
            toppings
        })
            .then(product => {
                res.redirect('/');
            })
            .catch(err => {
                res.locals.globalError = err;
                res.render('product/create');
            });
    }
};