handlers.removeFromCardController = function (ctx) {
    let productId = this.params.id.substr(1);

    productsService.removeFromUserCart(productId)
        .then(function (res) {
            ctx.redirect("#/cart");
            auth.showInfo('Product successfully removed from the cart!');
        })
        .catch(auth.handleError);
};