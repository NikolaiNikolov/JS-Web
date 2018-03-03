handlers.registerPostController = function (ctx) {
  let {username, passwd, name} = this.params;

    auth.register(username, passwd, name)
        .then(function (userInfo) {
            auth.saveSession(userInfo);
            ctx.redirect('#/home');
            auth.showInfo('You successfully registered an account!');
        })
        .catch(auth.handleError)
};