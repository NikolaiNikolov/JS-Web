const handlers = {};
$(document).ajaxStart(function () {
    $('#loadingBox').show();
});
$(document).ajaxComplete(function () {
    $('#loadingBox').hide();
});

$(() => {


    const app = Sammy('#app', function () {
        this.use('Handlebars', 'hbs');

        //Render home page
        this.get('#/home', handlers.homeController);
        this.get('market.html', handlers.homeController);

        //Render Login Page
        this.get("#/login", handlers.loginController);

        //Handle Login Request
        this.post("#/login", handlers.loginPostController);

        //Render Register Page
        this.get("#/register", handlers.registerController);

        //Handle Register Request
        this.post("#/register", handlers.registerPostController);

        //Handle Logout Request
        this.get("#/logout", handlers.logoutController);

        //Render Shop Page
        this.get("#/shop", handlers.shopController);

        //Render Cart Page
        this.get("#/cart", handlers.cartController);

        //Add product to cart
        this.post("#/cart/purchase/:id", handlers.addToCartController);

        //Remove product from cart
        this.post("#/cart/discard/:id", handlers.removeFromCardController);
    });

    app.run();
});