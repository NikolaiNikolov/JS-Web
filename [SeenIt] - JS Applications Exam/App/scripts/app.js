const handlers = {};
$(document).ajaxStart(function () {
    $('#loadingBox').show();
});
$(document).ajaxComplete(function () {
    $('#loadingBox').hide();
});

$(() => {
    const app = Sammy('#container', function () {


        this.use('Handlebars', 'hbs');

        this.get("index.html", handlers.home);
        this.get("#/home", handlers.home);
        this.get('#/catalog', handlers.catalog);

        this.post("#/login", handlers.loginAction);
        this.post("#/register", handlers.registerAction);
        this.get("#/logout", handlers.logout);

        //Render submit form
        this.get("#/submit", handlers.submit);
        //Handle submit request
        this.post("#/submit", handlers.submitAction);

        this.get("#/myPosts", handlers.myPosts);

        this.get("#/details/:id", handlers.details);
        this.get("#/editPost/:id", handlers.editPost);
        this.post("#/editPost/:id", handlers.editPostAction);
        this.get("#/deletePost/:id", handlers.deletePost);
        this.get("#/deleteComment/:id", handlers.deleteComment);
        this.post("#/addComment/:id", handlers.addComment);
    });

    app.run();
});