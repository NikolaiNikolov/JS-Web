$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        //Render Home page
        this.get('#/home', function () {
            this.loggedIn = sessionStorage.getItem('authtoken') !== null;
            this.username = sessionStorage.getItem('username');
            this.hasTeam = sessionStorage.getItem('teamId') !== null && sessionStorage.getItem('teamId') !== 'undefined';
            this.teamId = sessionStorage.getItem('teamId');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/home/guestHome.hbs');
            });

        });

        //Render About page
        this.get('#/about', function () {
            this.loggedIn = sessionStorage.getItem('authtoken') !== null;
            this.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/about/about.hbs');
            })
        });

        //Render Login page
        this.get('#/login', function () {
            this.loggedIn = sessionStorage.getItem('authtoken') !== null;
            this.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/loginForm.hbs'
            }).then(function () {
                this.partial('./templates/login/loginPage.hbs');
            });

        });

        //Handle Login Request
        this.post('#/login', function (ctx) {
            let {username, password} = this.params;

            auth.login(username, password)
                .then(function (data) {
                    auth.saveSession(data);
                    ctx.redirect('#/home');
                    auth.showInfo('You logged in successfully!');
                })
                .catch(auth.handleError);
        });

        //Render Register page
        this.get('#/register', function () {
            this.loggedIn = sessionStorage.getItem('authtoken') !== null;
            this.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs'
            }).then(function () {
                this.partial('./templates/register/registerPage.hbs');
            })
        });

        //Handle Register Request
        this.post('#/register', function (ctx) {
            let {username, password, repeatPassword} = this.params;
            if (password !== repeatPassword) {
                showError('Passwords must match!');
                return;
            }

            auth.register(username, password, repeatPassword)
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    ctx.redirect('#/home');
                    auth.showInfo('You registered successfully!');
                })
                .catch(handleError);
        });

        //Handle Logout Request
        this.get('#/logout', function (ctx) {
            auth.logout()
                .then(function (res) {
                    sessionStorage.clear();
                    ctx.redirect('#/home');
                })
        });


        //Render Catalog page
        this.get('#/catalog', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            teamsService.loadTeams()
                .then(function (teams) {
                    ctx.hasNoTeam = sessionStorage.getItem('teamId') === null || sessionStorage.getItem('teamId') === 'undefined';
                    ctx.teams = teams;
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        team: './templates/catalog/team.hbs'
                    }).then(function () {
                        this.partial('./templates/catalog/teamCatalog.hbs');
                    });
                });
        });

        //Render single team
        this.get('#/catalog/:id', function (ctx) {

            let teamId = this.params.id.substr(1);

            Promise.all([
                teamsService.loadTeamDetails(teamId),
                teamsService.getTeamMembers(teamId)
            ]).then(function ([team, members]) {
                ctx.members = members;
                ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
                ctx.username = sessionStorage.getItem('username');
                ctx.name = team.name;
                ctx.teamId = team._id;
                ctx.comment = team.comment;
                ctx.isAuthor = team._acl.creator === sessionStorage.getItem('userId');
                ctx.isOnTeam = sessionStorage.getItem('teamId') === team._id;

                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    teamMember: './templates/catalog/teamMember.hbs',
                    teamControls: './templates/catalog/teamControls.hbs'
                }).then(function () {
                    this.partial('./templates/catalog/details.hbs');
                });
            }).catch(auth.handleError);

        });

        //Handle Join Team Req
        this.get('#/join/:id', function (ctx) {
            let teamId = this.params.id.substr(1);
            teamsService.joinTeam(teamId).then(function () {
                ctx.redirect('#/catalog/:' + teamId);
                sessionStorage.setItem('teamId', teamId);
                auth.showInfo('You successfully joined the team');
            });

        });

        //Render Create Team
        this.get('#/create', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createForm: './templates/create/createForm.hbs'
            }).then(function () {
                this.partial('./templates/create/createPage.hbs');
            });
        });

        //Handle Create Team Req
        this.post('#/create', function (ctx) {
            let {name, comment} = this.params;

            teamsService.createTeam(name, comment)
                .then(function (team) {
                    let teamId = team._id;

                    teamsService.joinTeam(teamId)
                        .then(function () {
                            sessionStorage.setItem('teamId', teamId);
                            ctx.redirect('#/catalog/:' + teamId);
                            auth.showInfo('Team successfully created!');
                        })
                        .catch(auth.handleError);
                })
                .catch(auth.handleError);
        });

        //Handle Leave Team Req
        this.get('#/leave', function (ctx) {
            let teamId = sessionStorage.getItem('teamId');
            teamsService.leaveTeam().then(function () {
                sessionStorage.setItem('teamId', undefined);
                ctx.redirect('#/catalog/:' + teamId);
            })
        });

        //Render Edit Team
        this.get('#/edit/:id', function () {
            this.loggedIn = sessionStorage.getItem('authtoken') !== null;
            this.username = sessionStorage.getItem('username');

            this.teamId = this.params.id.substr(1);
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                editForm: './templates/edit/editForm.hbs'
            }).then(function () {
                this.partial('./templates/edit/editPage.hbs');
            })
        });

        //Handle Edit Req
        this.post('#/edit/:id', function (ctx) {
            let name = this.params.name;
            let comment = this.params.comment;
            let id = this.params.id.substr(1);

            teamsService.edit(id, name, comment)
                .then(function (data) {
                    console.log(data);
                    ctx.redirect('#/catalog/:' + id);
                    auth.showInfo('Team successfully edited!');
                })
                .catch(auth.handleError)
        });

    });

    app.run();
});