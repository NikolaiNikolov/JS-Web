handlers.homeController = function () {
    this.isLoggedIn = sessionStorage.getItem('authtoken') !== null && sessionStorage.getItem('authtoken') !== 'undefined';
    this.username = sessionStorage.getItem('username');

    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        viewAppHome: './templates/home/viewAppHome.hbs',
        viewUserHome: './templates/home/viewUserHome.hbs'
    }).then(function () {
        this.partial('./templates/home/homePage.hbs');
    });
};