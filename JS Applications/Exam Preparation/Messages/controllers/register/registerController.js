handlers.registerController = function () {

    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
    }).then(function () {
        this.partial('./templates/register/register.hbs')
    });

};