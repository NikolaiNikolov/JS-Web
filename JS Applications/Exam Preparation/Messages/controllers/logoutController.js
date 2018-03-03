handlers.logoutController = function (ctx) {
    auth.logout()
        .then(function () {
            sessionStorage.clear();
            ctx.redirect("#/home");
        })
        .catch(auth.handleError);
};