function loadRepos() {
    let username = $('#username');
    let ul = $('#repos');
    ul.empty();

    let req = {
        url: `https://api.github.com/users/${username.val()}/repos`,
        method: "GET",
        success: displayRepos,
        error: onError,
    };
    $.ajax(req);

    function onError(err) {
        ul.append($('<li>Error</li>'));
    }

    function displayRepos(data) {
        for (let repo of data) {
            ul.append($(`<li id="repos"><a href="${repo.html_url}">${repo.full_name}</a></a></li>`));
        }
    }
}

