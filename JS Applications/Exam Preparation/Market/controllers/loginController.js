handlers.loginController = function () {
    this.isLoggedIn = sessionStorage.getItem('authtoken') !== null && sessionStorage.getItem('authtoken') !== 'undefined';
    this.username = sessionStorage.getItem('username');

    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
    }).then(function () {
        this.partial('./templates/login/login.hbs');
    })
};