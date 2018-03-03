handlers.shopController = function (ctx) {
    this.isLoggedIn = sessionStorage.getItem('authtoken') !== null && sessionStorage.getItem('authtoken') !== 'undefined';
    this.username = sessionStorage.getItem('username');

    productsService.loadProducts()
        .then(function (products) {
            products.map(p => p.price = p.price.toFixed(2));
            ctx.products = products;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                product: './templates/common/product.hbs'
            }).then(function () {
                this.partial('./templates/shop/shop.hbs');
            });
        })
        .catch(auth.handleError);


};