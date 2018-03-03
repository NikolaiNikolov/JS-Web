const Category = require('./../models/Category');

module.exports = {
    get: (req, res) => {
        res.render('category/index')
    },
    post: (req, res) => {
        Category.create({
            name: req.body.title
        }).then(category => {
            res.redirect('back');
        }).catch(err => {
            res.locals.globalError = err;
            console.log(err);
            res.redirect('category/index')
        })
    }
};