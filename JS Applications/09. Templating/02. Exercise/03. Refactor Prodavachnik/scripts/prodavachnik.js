function startApp() {
    const appKey = 'kid_HkpNdSPvW';
    const appSecret = 'd8d3a9a683fb40c3818a194d5f603b57';
    const baseUrl = 'https://baas.kinvey.com';
    const main = $('main');
    const loadingBox = $('#loadingBox');
    const infoBox = $('#infoBox');
    let editAdForm;
    //Attach event listeners
    // $(document).ajaxStart(showLoadingMsg);
    // $(document).ajaxComplete(hideLoadingMsg);

    loadNavigation();
    showView('Home');

    function saveSession(data) {
        localStorage.setItem('username', data.username);
        localStorage.setItem('id', data._id);
        localStorage.setItem('authtoken', data._kmd.authtoken);
    }

    function isLoggedIn() {
        return (localStorage.getItem('authtoken') !== null && localStorage.getItem('username') !== null);
    }

    async function loadNavigation() {
        let nav = await $.get('./templates/navigation_template.html');
        let template = Handlebars.compile(nav);
        let html = template({
            isLoggedOut: !isLoggedIn(),
            username: localStorage.getItem('username')
        });
        $('nav').html(html);
        let menu = $('#menu');
        menu.find('a').click(function () {
            showView(this.id.substr(4))
        });
    }

    async function login() {
        let loginSection = $('#viewLogin');
        let username = loginSection.find("input[name='username']").val();
        let password = loginSection.find("input[name='passwd']").val();

        try {
            saveSession(await post('user', 'login', {username, password}, 'basic'));
            showView('ListAds');
            displayMessage('You logged in successfully!');
            loadNavigation();
        } catch (err) {
            console.log(err);
            displayError(err);
        }
    }

    async function logout() {
        try {
            await post('user', '_logout', {authtoken: localStorage.getItem('authtoken')});
            localStorage.clear();
            showView('Home');
            loadNavigation();
        } catch (err) {
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
            loadNavigation();
            displayMessage('You registered successfully!');
        } catch (err) {
            displayError(err);
        }
    }

    async function showView(keyword) {
        let source;
        let template;
        let data;

        switch (keyword) {
            case 'Home':
                source = await $.get('./templates/home_template.html');
                data = {};
                template = Handlebars.compile(source);
                main.html(template(data));
                break;
            case 'Login':
                source = await $.get('./templates/login_register_template.html');
                data = {
                    action: keyword
                };
                template = Handlebars.compile(source);
                main.html(template(data));
                $('#buttonLoginUser').click(login);
                break;
            case 'Register':
                source = await $.get('./templates/login_register_template.html');
                data = {
                    action: keyword
                };
                template = Handlebars.compile(source);
                main.html(template(data));
                $('#buttonRegisterUser').click(register);
                break;
            case 'ListAds':
                listAds();
                break;
            case 'CreateAd':
                source = await $.get('./templates/create_edit_template.html');
                data = {
                    action: 'Create'
                };
                template = Handlebars.compile(source);
                main.html(template(data));
                $('#buttonCreateAd').click(createAd);
                break;
            case 'Logout':
                logout();
                break;
            default:
                break;
        }
    }

    async function listAds() {
        try {
            let ads = await get('appdata', 'ads');
            let source = await $.get('./templates/list_ads_template.html');
            let template = Handlebars.compile(source);
            let data = {
                ads: JSON.parse(JSON.stringify(ads))
            };
            data['ads'].forEach((data) => data.isAuthor = localStorage.getItem('id') === data._acl.creator);
            main.html(template(data));
            let rows = [...$('#viewAds').find('tr')];
            rows.shift();

            for (i = 0; i < ads.length; i++) {
                let currentEditBtn = $(rows[i]).find('a:contains("[Edit]")');
                let currentDeleteBtn = $(rows[i]).find('a:contains("[Delete]")');
                let currentViewBtn = $(rows[i]).find('a:contains("[View]")');

                let currentAd = ads[i];
                currentEditBtn.click(() => openEditAd(currentAd));
                currentDeleteBtn.click(() => deleteAd(currentAd));
                currentViewBtn.click(() => viewAd(currentAd._id));
            }
        } catch (err) {
            displayError(err);
        }
    }

    async function createAd() {
        let createAdForm = $('#formCreateAd');
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
        } catch (err) {
            displayError(err);
        }

    }

    async function deleteAd(ad) {
        try {
            await remove('appdata', `ads/${ad._id}`);
            showView('ListAds');
            displayMessage(`${ad.title} successfully deleted!`);
        } catch (err) {
            displayError(err);
        }
    }

    async function openEditAd(ad) {
        source = await $.get('./templates/create_edit_template.html');

        data = {
            action: 'Edit',
            ad
        };
        template = Handlebars.compile(source);
        main.html(template(data));

        let id = ad._id;
        $('#buttonEditAd').click(() => editAd(id));
    }

    async function editAd(id) {
        editAdForm = $('#viewEditAd');
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
        try {
            await update('appdata', 'ads/' + id, data);
            showView('ListAds');
            displayMessage('Ad successfully edited!');
        } catch (err) {
            displayError(err);
        }
    }

    async function viewAd(id) {
        try {
            let ad = await get('appdata', 'ads/' + id);
            let source = await $.get('./templates/view_ad_template.html');
            let template = Handlebars.compile(source);
            main.html(template(ad));
        } catch (err) {
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

    async function displayError(message) {
        let msg;
        let div = $('<div id="message">');

        if (typeof message === 'string') {
            msg = message;
        } else {
            msg = JSON.parse(err.responseText).description;
        }

        let source = await $.get('./templates/error_template.html');
        let template = Handlebars.compile(source);
        let data = {
            message: msg
        };
        div.append(template(data));
        div.insertBefore(main);
        setTimeout(() => div.remove(), 7000);
    }

    async function showLoadingMsg() {
        let div = $('<div id="message">');
        let source = await $.ajax({
            url: './templates/loading_template.html',
            method: 'GET',
            global: false
        });
        let template = Handlebars.compile(source);
        let html = template({});
        div.append(html);
        div.insertBefore(main);
    }

    function hideLoadingMsg() {
        $('#message').remove();
    }

    async function displayMessage(message) {
        let div = $('<div id="message">');
        let source = await $.get('./templates/info_template.html');
        let template = Handlebars.compile(source);
        let data = {
            message
        };

        div.append(template(data));
        div.insertBefore(main);
        setTimeout(() => div.remove(), 3000);
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

    function get (module, url, auth) {
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