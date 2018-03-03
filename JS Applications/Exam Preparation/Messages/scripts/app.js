const handlers = {};

$(() => {
    const app = Sammy('#app', function () {
        this.use('Handlebars', 'hbs');

        //Render Home Page
        this.get('messages.html', handlers.homeController);
        this.get('#/home', handlers.homeController);

        //Render Register Page
        this.get('#/register', handlers.registerController);

        //Handle Register Request
        this.post('#/register', handlers.registerPostController);

        //Render Register Page
        this.get('#/login', handlers.loginController);

        //Handle Register Request
        this.post('#/login', handlers.loginPostController);

        //Handle Logout Request
        this.get('#/logout', handlers.logoutController);

        //Render my messages
        this.get('#/myMessages', handlers.myMessagesController);

        //Render send message form
        this.get('#/sendMessage', handlers.sendMessageController);

        //Handle send message request
        this.post('#/sendMessage', handlers.sendMessagePostController);

        //Render archive
        this.get('#/archive', handlers.archiveController);


    });

    app.run();
});