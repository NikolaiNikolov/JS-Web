handlers.logout = function (ctx) {
  auth.logout()
      .then(function () {
          sessionStorage.clear();
          ctx.redirect('#/home');
          auth.showInfo('Logout successful!');
      }).catch(auth.handleError);
};