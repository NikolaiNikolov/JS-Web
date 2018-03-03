let remote = (function () {
    const appKey = 'kid_HkpNdSPvW';
    const appSecret = 'd8d3a9a683fb40c3818a194d5f603b57';
    const baseUrl = 'https://baas.kinvey.com';

    function makeAuth(type) {
        if (type === 'basic') {
            return 'Basic ' + btoa(`${appKey}:${appSecret}`);
        }
        return 'Kinvey ' + localStorage.getItem('authtoken');
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

    return {
        get, post, update, remove
    }
})();