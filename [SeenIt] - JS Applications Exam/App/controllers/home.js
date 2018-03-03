handlers.home = function (ctx) {
    this.isLoggedIn = auth.isLoggedIn();
    this.username = sessionStorage.getItem('username');
    if (this.isLoggedIn) {
        this.redirect("#/catalog");
    } else {
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            menu: './templates/common/menu.hbs',
            page: './templates/home/home.hbs',
        }).then(function () {
            this.partial('./templates/page.hbs');
        })
    }
};

handlers.catalog = function (ctx) {
    this.isLoggedIn = auth.isLoggedIn();
    this.username = sessionStorage.getItem('username');
    let index = 0;

    util.loadPosts()
        .then(function (posts) {
            posts.map(function (p) {
                p.time = util.calcTime(p["_kmd"]["lmt"]);
                p.isAuthor = p["_acl"]["creator"] === sessionStorage.getItem('userId');
                p.index = ++index;
            });
            ctx.articles = posts;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                menu: './templates/common/menu.hbs',
                page: './templates/home/viewCatalog.hbs',
                article: './templates/common/article.hbs'
            }).then(function () {
                this.partial('./templates/page.hbs');
            });

        })
        .catch(auth.handleError);

};