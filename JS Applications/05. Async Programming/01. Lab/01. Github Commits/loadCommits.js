function loadCommits() {
    let username = $('#username').val();
    let repository = $('#repo').val();
    let baseUrl = `https://api.github.com/repos/${username}/${repository}/commits`;
    const list = $('#commits');
    list.empty();
    $.get(baseUrl).then(displayData).catch(displayError);

    function displayData(data) {
        data.forEach(o => list.append(`<li>${o.commit.author.name}: ${o.commit.message}</li>`) )
    }

    function displayError(err) {
        list.append(`<li>Error: ${err.status} (${err.statusText})</li>`)
    }
}