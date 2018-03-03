function startApp() {
    const appKey = 'kid_HkpNdSPvW';
    const appSecret = 'd8d3a9a683fb40c3818a194d5f603b57';
    const baseUrl = 'https://baas.kinvey.com';
    const menu = $('#menu');
    const main = $('main');
    const sections = main.find('section');
    const greetingsBox = $('#loggedInUser');
    const loadingBox = $('#loadingBox');
    const infoBox = $('#infoBox');
    const errorBox = $('#errorBox');
    const createAdForm = $('#formCreateAd');
    const editAdForm = $('#formEditAd');
    menu.find('a').show();
    menu.find('a').click(function () {
        showView(this.id.substr(4))
    });
    //Attach event listeners
    $('#buttonLoginUser').click(login);
    $('#linkLogout').click(logout);
    toggleUserStatus();
    $(document).ajaxStart(() => loadingBox.show());
    $(document).ajaxComplete(() => loadingBox.hide());
    infoBox.click(() => infoBox.hide());
    $('#buttonRegisterUser').on('click', register);
    $('#buttonCreateAd').click(createAd);

    showView('Home');

    function saveSession(data) {
        localStorage.setItem('username', data.username);
        localStorage.setItem('id', data._id);
        localStorage.setItem('authtoken', data._kmd.authtoken);
        userLoggedIn();
    }

    function userLoggedIn() {
        showGreeting();
        $('#linkLogin').hide();
        $('#linkRegister').hide();
        $('#linkLogout').show();
        $('#linkListAds').show();
        $('#linkCreateAd').show();
    }

    function userLoggedOut() {
        hideGreeting();
        $('#linkLogin').show();
        $('#linkRegister').show();
        $('#linkLogout').hide();
        $('#linkListAds').hide();
        $('#linkCreateAd').hide();
    }

    function isLoggedIn() {
        return (localStorage.getItem('authtoken') !== null && localStorage.getItem('username') !== null);
    }

    function toggleUserStatus() {
        if (isLoggedIn()) {
            userLoggedIn();
        } else {
            userLoggedOut();
        }
    }

    function showGreeting() {
        greetingsBox.text(`Welcome, ${localStorage.getItem('username')}!`);
        greetingsBox.show();
    }

    function hideGreeting() {
        greetingsBox.text('');
        greetingsBox.hide();
    }

    async function login() {
        let loginSection = $('#viewLogin');
        let username = loginSection.find("input[name='username']").val();
        let password = loginSection.find("input[name='passwd']").val();

        try {
            saveSession(await post('user', 'login', {username, password}, 'basic'));
            userLoggedIn();
            showView('ListAds');
            displayMessage('You logged in successfully!');
        } catch (err) {
            displayError(err);
        }
    }

    async function logout() {
        try {
            await post('user', '_logout', {authtoken: localStorage.getItem('authtoken')});
            localStorage.clear();
            userLoggedOut();
            showView('logout');
        } catch(err) {
            displayError(err);
        }
    }

    async function register() {
        let registerSection = $('#viewRegister');
        let username = registerSection.find("input[name='username']").val();
        let password = registerSection.find("input[name='passwd']").val();

        try {
            saveSession(await post('user', '', {username, password}, 'basic'));
            showView('ListAds');
            displayMessage('You registered successfully!');
        } catch (err) {
            displayError(err);
        }
    }

    function showView(keyword) {
        sections.hide();
        switch (keyword) {
            case 'Home':
                $('#viewHome').show();
                break;
            case 'Login':
                $('#viewLogin').show();
                break;
            case 'Register':
                $('#viewRegister').show();
                break;
            case 'ListAds':
                listAds();
                break;
            case 'CreateAd':
                $('#viewCreateAd').show();
                break;
            case 'viewEditAd':
                $('#viewEditAd').show();
                break;
            case 'logout':
                $('#viewHome').show();
                break;
            default:
                break;
        }
    }

    async function listAds() {
        let adsSection = $('#viewAds');
        let adsTable = adsSection.find('div#ads').find('table');
        let ads = await get('appdata', 'ads');
        let rows = adsTable.find('tr');

        try {
            //remove old rows
            rows.nextAll().remove();

            for (let ad of ads) {
                let deleteBtn = $(`<button>&#10006;Delete</button>`);
                let editBtn = $(`<button>&#9998;Edit</button>`);
                let viewMoreBtn = $(`<button>View</button>`);
                deleteBtn.click(() => deleteAd(ad));
                editBtn.click(() => openEditAd(ad));
                viewMoreBtn.click(() => viewAd(ad._id));

                let tr = $('<tr>');
                tr.append(`<td>${ad.title}</td>`)
                    .append(`<td>${ad.author}</td>`)
                    .append(`<td>${ad.description}</td>`)
                    .append(`<td>$${ad.price.toFixed(2)}</td>`)
                    .append(`<td>${ad.publishedAt}</td>`);
                let actions = $(`<td>`);
                actions.append(viewMoreBtn);
                if (localStorage.getItem('id') === ad._acl.creator) {
                    actions.append(deleteBtn).append(editBtn);
                }
                tr.append(actions);
                adsTable.append(tr);
            }

            adsSection.show();
        } catch(err) {
            displayError(err);
        }
    }

    async function createAd() {
        let publishedAt = createAdForm.find('input[name="datePublished"]').val();
        let price = Number(createAdForm.find('input[name="price"]').val());
        let description = createAdForm.find('textarea[name="description"]').val();
        let author = localStorage.getItem('username');
        let title = createAdForm.find('input[name="title"]').val();
        let image = createAdForm.find('input[name="image"]').val();

        if (!validateForm(title, description, publishedAt, price, image)) {
            return;
        }

        let data = {
            publishedAt,
            price,
            description,
            author,
            title,
            image
        };
        try {
            await post('appdata', 'ads', data);
            showView('ListAds');
            displayMessage('Ad successfully created!');
            createAdForm.find('input').val('');
            createAdForm.find('textarea').val('');
        } catch(err) {
            displayError(err);
        }

    }

    async function deleteAd(ad) {
        try {
            await remove('appdata', `ads/${ad._id}`);
            showView('ListAds');
            displayMessage(`${ad.title} successfully deleted!`);
        } catch(err) {
            displayError(err);
        }
    }

    function openEditAd(ad) {
        editAdForm.find('input[name="datePublished"]').val(ad.publishedAt);
        editAdForm.find('input[name="price"]').val(ad.price);
        editAdForm.find('textarea[name="description"]').val(ad.description);
        editAdForm.find('input[name="title"]').val(ad.title);
        editAdForm.find('input[name="image"]').val(ad.image);
        $('#buttonEditAd').click(() => editAd(ad._id));
        showView('viewEditAd');
    }

    async function editAd(id) {
        let publishedAt = editAdForm.find('input[name="datePublished"]').val();
        let price = Number(editAdForm.find('input[name="price"]').val());
        let description = editAdForm.find('textarea[name="description"]').val();
        let author = localStorage.getItem('username');
        let title = editAdForm.find('input[name="title"]').val();
        let image = editAdForm.find('input[name="image"]').val();

        if (!validateForm(title, description, publishedAt, price, image)) {
            return;
        }

        let data = {
            publishedAt,
            price,
            description,
            author,
            title,
            image
        };
        try{
            await update('appdata', 'ads/' + id, data);
            showView('ListAds');
            displayMessage('Ad successfully edited!');
            editAdForm.find('input').val('');
            editAdForm.find('textarea').val('');
        } catch(err) {
            displayError(err);
        }
    }

    async function viewAd(id) {
        sections.hide();

        try {
            let ad = await get('appdata', 'ads/' + id);
            $('#adImage').attr('src', ad.image);
            $('#adTitle').find('h1').text(`${ad.title}`);
            $('#adDescription').text(ad.description);
            $('#adAuthor').text('author: ' + ad.author);
            $('#adDate').text('date: ' + ad.publishedAt);
            $('#adView').show();
        } catch(err) {
            displayError(err);
        }

    }

    function validateForm(title, description, date, price) {

        if (title.length === 0) {
            displayError(`Title cannot be empty!`);
            return;
        }
        if (description.length === 0) {
            displayError(`Description cannot be empty!`);
            return;
        }
        if (date.length === 0) {
            displayError(`Date cannot be empty!`);
            return;
        }
        if (price < 0.01) {
            displayError(`Price cannot be lower than 0.01!`);
            return;
        }
        return true;
    }

    function makeAuth(type) {
        if (type === 'basic') {
            return 'Basic ' + btoa(`${appKey}:${appSecret}`);
        }
        return 'Kinvey ' + localStorage.getItem('authtoken');
    }

    function displayError(err) {
        let msg;
        if (typeof err === 'string') {
            msg = err;
        } else {
            msg = JSON.parse(err.responseText).description;
        }
        errorBox.text(msg);
        errorBox.show();
        setTimeout(() => errorBox.hide(), 7000);
    }
    
    function displayMessage(msg) {
        infoBox.text(msg);
        setTimeout(() => infoBox.show(), 500);
        setTimeout(() => infoBox.hide(), 3000);
    }

    function makeRequest(method, module, url, auth) {
        return {
            url: `${baseUrl}/${module}/${appKey}/${url}`,
            method,
            headers: {
                Authorization: makeAuth(auth)
            }
        }
    }

    function get(module, url, auth) {
        return $.ajax(makeRequest("GET", module, url, auth));
    }

    function post(module, url, data, auth) {
        let req = makeRequest("POST", module, url, auth);
        req.data = JSON.stringify(data);
        req.headers['Content-Type'] = 'application/json';
        return $.ajax(req);
    }

    function update(module, url, data, auth) {
        let req = makeRequest("PUT", module, url, auth);
        req.data = JSON.stringify(data);
        req.headers['Content-Type'] = 'application/json';
        return $.ajax(req);
    }

    function remove(module, url, auth) {
        return $.ajax(makeRequest("DELETE", module, url, auth));
    }
}