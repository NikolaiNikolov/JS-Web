handlers.submit = function () {
    this.isLoggedIn = auth.isLoggedIn();
    this.username = sessionStorage.getItem('username');

    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        menu: './templates/common/menu.hbs',
        page: './templates/posts/submit.hbs',
    }).then(function () {
        this.partial('./templates/page.hbs');
    })
};

handlers.submitAction = function (ctx) {
    let url = this.params.url;
    let title = this.params.title;
    let imageUrl = this.params.image;
    let comment = this.params.comment;
    let linkPattern = /^http/;

    if (url.length < 1) {
        auth.showError("Url can't be empty.");
        return;
    }

    if (title.length < 1) {
        auth.showError("Title can't be empty.");
        return;
    }

    if (!linkPattern.test(imageUrl)) {
        auth.showError("Invalid image link.");
        return;
    }

    let data = {
        url,
        title,
        imageUrl,
        author: sessionStorage.getItem('username')
    };

    if (comment.length > 0) {
        data.description = comment;
    }

    util.submitPost(data)
        .then(function (res) {
            ctx.redirect('#/catalog');
            auth.showInfo('Post created!');
        })
        .catch(auth.handleError);

    // util.submitPost(data)
    //     .then(function (article) {
    //         if (comment.length > 0) {
    //             util.addComment(article._id, comment)
    //                 .then(function (res) {
    //                     ctx.redirect('#/catalog');
    //                     auth.showInfo('Post created!');
    //                 })
    //                 .catch(auth.handleError);
    //         } else {
    //             ctx.redirect('#/catalog');
    //             auth.showInfo('Post created!');
    //         }
    //     })
    //     .catch(auth.handleError);
};