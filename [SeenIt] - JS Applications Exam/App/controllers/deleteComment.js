handlers.deleteComment = function (ctx) {
    let id = this.params.id.substr(1);

    util.getComment(id)
        .then(function (comment) {
            util.deleteComment(id)
                .then(function (delCount) {
                    ctx.redirect('#/details/:' + comment.postId);
                    auth.showInfo('Comment deleted!');
                })
                .catch(auth.handleError);
        })
        .catch(auth.handleError);
};