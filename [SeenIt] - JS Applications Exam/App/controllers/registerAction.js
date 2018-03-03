handlers.registerAction = function (ctx) {
    let {username, password, repeatPass} = this.params;

    if (password !== repeatPass) {
        auth.showError("Passwords must match!");
        return;
    }
    auth.register(username, password)
        .then(function (userInfo) {
            auth.saveSession(userInfo);
            auth.showInfo('Registration successful!');
            ctx.redirect('#/catalog');
        })
        .catch(auth.handleError);
};