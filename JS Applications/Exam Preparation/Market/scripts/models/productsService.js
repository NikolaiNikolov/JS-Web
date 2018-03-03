let productsService = (() => {
    function loadProducts() {
        // Request products from db
        return requester.get('appdata', 'products', 'kinvey');
    }

    function getUser(userId) {
        // Request cart products from db
        return requester.get('user', userId, 'kinvey');
    }

    function getProduct(id) {
        return requester.get('appdata', 'products/' + id, 'kinvey');
    }

    async function addToUserCart(productId) {
        userId = sessionStorage.getItem('userId');

        try {
            let user = await getUser(userId);
            let product = await getProduct(productId);
            let quantity = 1;

            if (user.cart) {
                if (user.cart[productId]) {
                    quantity = Number(user.cart[productId].quantity) + 1;
                }
            } else {
                user.cart = {};
            }

            user.cart[productId] = {
                quantity,
                "product": {
                    "name": product["name"],
                    "description": product["description"],
                    "price": product["price"]
                }
            };

            return requester.update('user', userId, 'kinvey', user);
        } catch (err) {
            console.log(err);
        }
    }

    async function removeFromUserCart(productId) {
        userId = sessionStorage.getItem('userId');

        try {
            let user = await getUser(userId);
            user["cart"][productId] = undefined;
            return requester.update('user', userId, 'kinvey', user);
        } catch (err) {
            console.log(err);
        }
    }

    return {
        loadProducts,
        getUser,
        addToUserCart,
        removeFromUserCart
    }
})();