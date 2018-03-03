handlers.myPosts = function (ctx) {
    this.isLoggedIn = auth.isLoggedIn();
    this.username = sessionStorage.getItem('username');

    util.loadMyPosts()
        .then(function (posts) {
            posts.map(function (p) {
                p.time = util.calcTime(p["_kmd"]["lmt"]);
                p.isAuthor = p["_acl"]["creator"] === sessionStorage.getItem('userId');
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

handlers.details = function (ctx) {
    this.isLoggedIn = auth.isLoggedIn();
    this.username = sessionStorage.getItem('username');
    this.isAuthor = util.isAuthor;
    let id = this.params.id.substr(1);

    Promise.all([
        util.getPost(id),
        util.getPostComments(id)
    ])
        .then(function ([article, comments]) {
            article.time = util.calcTime(article["_kmd"]["lmt"]);
            ctx.article = article;
            ctx.comments = comments;
            comments.map(function (c) {
                c.time = util.calcTime(c["_kmd"]["lmt"]);
                c.isCommentAuthor = c["_acl"]["creator"] === sessionStorage.getItem('userId');
            });

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                menu: './templates/common/menu.hbs',
                page: './templates/comments/comments.hbs',
                comment: './templates/common/comment.hbs'
            }).then(function () {
                this.partial('./templates/page.hbs');
            });
        })
        .catch(auth.handleError);

};

handlers.addComment = function (ctx) {
    let id = this.params.id.substr(1);
    let comment = this.params.content;

    util.addComment(id, comment)
        .then(function (res) {
            ctx.redirect('#/details/:' + id);
            auth.showInfo('Comment created.');
        })
        .catch(auth.handleError);
};

handlers.editPost = function (ctx) {
    let id = this.params.id.substr(1);
    ctx.isLoggedIn = auth.isLoggedIn();
    ctx.username = sessionStorage.getItem('username');

    util.getPost(id)
        .then(function (post) {
            ctx.oldValues = post;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                menu: './templates/common/menu.hbs',
                page: './templates/posts/edit.hbs',
            }).then(function () {
                this.partial('./templates/page.hbs');
            })
        })
        .catch(auth.handleError);
};

handlers.editPostAction = function (ctx) {
    let id = this.params.id.substr(1);
    let linkPattern = /^http/;

    if (ctx.params.url.length < 1) {
        auth.showError("Url can't be empty.");
        return;
    }

    if (ctx.params.title.length < 1) {
        auth.showError("Title can't be empty.");
        return;
    }

    if (!linkPattern.test(ctx.params.image)) {
        auth.showError("Invalid image link.");
        return;
    }

    util.getPost(id)
        .then(function (post) {
            post.title = ctx.params.title;
            post.url = ctx.params.url;
            post.imageUrl = ctx.params.image;
            post.description = ctx.params.description;
            util.editPost(id, post)
                .then(function (res) {
                    ctx.redirect('#/catalog');
                    auth.showInfo(`Post ${res.title} updated.`);
                })
                .catch(auth.handleError);
        })
        .catch(auth.handleError);
};

handlers.deletePost = function (ctx) {
    let id = this.params.id.substr(1);

    util.deletePost(id)
        .then(function (res) {
            ctx.redirect('#/catalog');
            auth.showInfo('Post deleted.');
        })
        .catch(auth.handleError);
};