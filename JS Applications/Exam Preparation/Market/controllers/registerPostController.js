//Handle Register request
handlers.registerPostController = function (ctx) {
    let {username, password, name} = this.params;

    auth.register(username, password, name)
        .then(function (userInfo) {
            auth.saveSession(userInfo);
            ctx.redirect('#/home');
            auth.showInfo('You successfully registered!');
        })
        .catch(auth.handleError);
};