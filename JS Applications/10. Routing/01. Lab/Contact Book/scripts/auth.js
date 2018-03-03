let auth = (function () {
    function saveSession(data) {
        localStorage.setItem('username', data.username);
        localStorage.setItem('id', data._id);
        localStorage.setItem('authtoken', data._kmd.authtoken);
    }

    function login(username, password) {
        return remote.post('user', 'login', {username, password}, 'basic');
    }

    function register(username, password) {
        return remote.post('user', '', {username, password}, 'basic');
    }

    function logout() {
        return remote.post('user', '_logout', {authtoken: localStorage.getItem('authtoken')});
    }

    return {
        login, register, logout, saveSession
    }
})();