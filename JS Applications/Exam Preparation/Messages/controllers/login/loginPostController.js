handlers.loginPostController = function (ctx) {
    let {username, passwd} = this.params;
    auth.login(username, passwd)
        .then(function (userInfo) {
            auth.saveSession(userInfo);
            ctx.redirect('#/home');
            auth.showInfo('You successfully logged in!');
        })
        .catch(auth.handleError)
};
