function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com/appdata/kid_rJggJJGw-/';
    const selectBox = $('#posts');
    const postBody = $('#post-body');
    const postComments = $('#post-comments');
    $('#btnLoadPosts').click(loadPosts);
    $('#btnViewPost').click(viewPost);

    function loadPosts() {
        selectBox.empty();
        request('posts').then(displayPosts).catch(displayError);

        function displayPosts(data) {
            for (let post of data) {
                let option = $('<option>');
                option.text(post.title).val(post._id);
                selectBox.append(option);
            }
        }
    }

    function viewPost() {
        let selectedPost = selectBox.find('option:selected');
        let selectedPostId = selectedPost.val();
        let postP = request('posts/' + selectedPostId);
        let commentsP = request(`comments/?query={"post_id":"${selectedPostId}"}`);
        Promise.all([postP, commentsP]).then(displayPostAndComments).catch(displayError);

        function displayPostAndComments([post, comments]) {
            postBody.empty()
                .append($(`<h1 id="post-title">${post.title}</h1>`))
                .append($(`<ul id="post-body">${post.body}</ul>`));

            postComments.empty();
            for (let comment of comments) {
                postComments.append($(`<li>${comment.text}</li>`));
            }
        }
    }

    function request(endpoint) {
        return $.ajax({
            url: baseUrl + endpoint,
            method: "GET",
            headers: {
                Authorization: 'Basic ' + btoa('guest' + ':' + 'guest123')
            },
        });
    }

    function displayError(reason) {
        console.log(reason);
    }
}