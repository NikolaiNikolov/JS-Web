let util = (() => {

    function loadPosts() {
        return requester.get('appdata', 'posts');
    }

    function loadMyPosts() {
        return requester.get('appdata', 'posts' + `/?query={"_acl.creator":"${sessionStorage.getItem('userId')}"}`);
    }

    function submitPost(data) {
        return requester.post('appdata', 'posts', 'kinvey', data);
    }

    function getPost(postId) {
        return requester.get('appdata', 'posts' + '/' + postId);
    }

    function deletePost(postId) {
        return requester.remove('appdata', 'posts/' + postId);
    }

    function editPost(postId, data) {
        return requester.update('appdata', 'posts/' + postId, 'kinvey', data);
    }

    function getPostComments(postId) {
        return requester.get('appdata', `comments/?query={"postId":"${postId}"}`);
    }

    function addComment(articleId, comment) {
        let data = {
            postId: articleId,
            author: sessionStorage.getItem('username'),
            content: comment
        };
        return requester.post('appdata', 'comments', 'kinvey', data);
    }

    function getComment(commentId) {
        return requester.get('appdata', 'comments/' + commentId);
    }

    function deleteComment(commentId) {
        return requester.remove('appdata', 'comments/' + commentId);
    }

    function calcTime(dateIsoFormat) {
        let diff = new Date - (new Date(dateIsoFormat));
        diff = Math.floor(diff / 60000);
        if (diff < 1) return 'less than a minute';
        if (diff < 60) return diff + ' minute' + pluralize(diff);
        diff = Math.floor(diff / 60);
        if (diff < 24) return diff + ' hour' + pluralize(diff);
        diff = Math.floor(diff / 24);
        if (diff < 30) return diff + ' day' + pluralize(diff);
        diff = Math.floor(diff / 30);
        if (diff < 12) return diff + ' month' + pluralize(diff);
        diff = Math.floor(diff / 12);
        return diff + ' year' + pluralize(diff);

        function pluralize(value) {
            if (value !== 1) return 's';
            else return '';
        }
    }

    return {
        loadPosts,
        calcTime,
        getPostComments,
        loadMyPosts,
        submitPost,
        getPost,
        addComment,
        deletePost,
        editPost,
        deleteComment,
        getComment
    }
})();