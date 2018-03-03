function loadRepos() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            document.getElementById("res").textContent = req.responseText;
        }
        console.log(req.readyState);
    };
    req.open("GET", "https://api.github.com/users/testnakov/repos", true);
    req.send();
}