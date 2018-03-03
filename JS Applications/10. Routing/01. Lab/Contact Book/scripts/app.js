const handlers = {};

$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbr');

        this.get('index.html', displayWelcome);

        this.get('/', displayWelcome);

        function displayWelcome() {
            this.loadPartials({
                header: './templates/common/header.hbr',
                footer: './templates/common/footer.hbr'
            }).then(function () {
                this.partial('./templates/welcome.hbr')
            })
        }

        this.get('#/register', function () {
            this.loadPartials({
                header: './templates/common/header.hbr',
                footer: './templates/common/footer.hbr'
            }).then(function () {
                this.partial('./templates/common/register.hbr')
            })
        });

        this.get('#/contacts', handlers.contactsController);

        this.get('#/profile', function () {
            this.loadPartials({
                header: './templates/common/header.hbr',
                footer: './templates/common/footer.hbr'
            }).then(function () {
                this.partial('./templates/common/profile.hbr')
            });
            // this.firstName = 'Nikolai';
            // this.lastName = 'Nikolov';
            // this.email = 'whitestarhs@gmail.com';
            // this.phone = '0899193510';
        });

        this.get('#/logout', function (ctx) {
            auth.logout().then(function () {
                localStorage.clear();
                ctx.redirect('#/market.html');
            })
        });

        this.post('#/login', function (ctx) {
            let username = this.params.username;
            let password = this.params.password;
            auth.login(username, password).then(function (data) {
                auth.saveSession(data);
                ctx.redirect('#/contacts');
            });
        });

        this.post('#/register', function () {

        });

        this.post('#/profile', function () {

        });
    });

    app.run();
});