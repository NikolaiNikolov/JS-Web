const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    // authorization
    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);
    app.post('/logout', controllers.user.logout);
    // other pages
    app.get('/product/order/:id', restrictedPages.isAuthed, controllers.order.get.index);
    app.post('/product/order/:id', restrictedPages.isAuthed, controllers.order.post.create);

    app.get('/manage/orders', restrictedPages.isAuthed, controllers.order.get.status);
    app.post('/manage/orders', restrictedPages.isAuthed, controllers.order.post.update);


    app.get('/order/details/:id', controllers.order.get.details);

    app.get('/create/product', restrictedPages.hasRole('Admin'), controllers.product.get);
    app.post('/create/product', restrictedPages.hasRole('Admin'), controllers.product.post);

    // app.get('/about', restrictedPages.hasRole('Admin'), controllers.home.about);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};