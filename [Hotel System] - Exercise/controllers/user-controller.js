const User = require('../models/User');
const encryption = require('../util/encryption');

module.exports = {
    index: (req, res) => {
        res.render('users/loginRegister')
    },
    login: (req, res) => {
        let userData = req.body;

        User.findOne({username: userData.username}).then(user => {
            if (!user || !user.authenticate(userData.password)) {
                res.render('users/loginRegister', {error: 'Wrong credentials!'});
                return
            }

            req.logIn(user, (err, user) => {
                if (err) {
                    res.render('users/loginRegister', {error: 'Wrong credentials!'});
                    return
                }

                res.redirect('/')
            })
        })
    },
    register: (req, res) => {
        let userData = req.body;
        let salt = encryption.generateSalt();
        userData.salt = salt;

        if (userData.password) {
            userData.hashedPass = encryption.generateHashedPassword(
                salt,
                userData.password
            )
        }

        User.create(userData)
            .then(user => {
                req.logIn(user, (err, user) => {
                    if (err) {
                        res.render('users/loginRegister', {error: 'Wrong credentials!'});
                        return
                    }

                    res.redirect('/')
                })
            })
            .catch(error => {
                userData.error = error;
                res.render('users/loginRegister', userData)
            })
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/')
    }
};
