handlers.loginAction = function (ctx) {
    let {username, password} = this.params;

    auth.login(username, password)
        .then(function (userInfo) {
            auth.saveSession(userInfo);
            auth.showInfo('Login successful!');
            ctx.redirect('#/catalog');
        })
        .catch(auth.handleError);
};