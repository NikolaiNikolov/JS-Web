handlers.cartController = function (ctx) {
    this.isLoggedIn = sessionStorage.getItem('authtoken') !== null && sessionStorage.getItem('authtoken') !== 'undefined';
    this.username = sessionStorage.getItem('username');

    productsService.getUser(sessionStorage.getItem('userId'))
        .then(function (userInfo) {
            ctx.products = userInfo.cart;
            ctx.action = 'discard';
            ctx.value = 'Discard';
            let products = [];

            for (key in userInfo.cart) {
                let product = userInfo.cart[key];
                product.id = key;
                product.product.price = (Number(product.product.price) * Number(product.quantity)).toFixed(2);
                products.push(product);
            }
            ctx.products = products;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                product: './templates/common/cartProduct.hbs'
            }).then(function () {
                this.partial('./templates/cart/cart.hbs');
            });
        })
};