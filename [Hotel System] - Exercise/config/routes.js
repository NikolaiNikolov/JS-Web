const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.get);
    app.get('/loginRegister', controllers.user.index);
    app.post('/register', controllers.user.register);
    app.post('/login', controllers.user.login);
    app.post('/logout', controllers.user.logout);

    app.get('/about', controllers.home.about);
    app.get('/addHotel', controllers.hotel.index);
    app.post('/addHotel', controllers.hotel.post);
    app.get('/list', controllers.hotel.list);
    app.get('/details', controllers.hotel.details);
    app.post('/comment/:id/', controllers.hotel.comment);
    app.get('/addCategories/', restrictedPages.isAuthed, controllers.category.get);
    app.post('/addCategories/', controllers.category.post);


    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end()
    })
};
