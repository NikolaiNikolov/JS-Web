handlers.addToCartController = function (ctx) {
    let productId = this.params.id.substr(1);

    productsService.addToUserCart(productId)
        .then(function (res) {
            ctx.redirect("#/cart");
            auth.showInfo('Product successfully added to cart!');
        })
        .catch(auth.handleError);
};