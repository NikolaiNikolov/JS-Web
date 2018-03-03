handlers.homeController = function () {
    this.isLoggedIn = !!sessionStorage.getItem('authtoken');
    this.username = sessionStorage.getItem('username');

    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        guestHome: './templates/home/guestHome.hbs',
        userHome: './templates/home/userHome.hbs'
    }).then(function () {
       this.partial('./templates/home/homePage.hbs');
    });
};