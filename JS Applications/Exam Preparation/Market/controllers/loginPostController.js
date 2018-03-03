handlers.loginPostController = function (ctx) {
    let {username, password} = this.params;

    auth.login(username, password)
        .then(function (userInfo) {
            auth.saveSession(userInfo);
            ctx.redirect('#/home');
            auth.showInfo('You successfully logged in!');
        })
        .catch(auth.handleError);
};