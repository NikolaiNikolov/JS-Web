const encryption = require('../util/encryption');
const User = require('mongoose').model('User');

module.exports = {
    registerGet: (req, res) => {
        res.render('users/register');
    },
    registerPost: async (req, res) => {
        const {username, password, firstName, lastName} = req.body;
        let salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, password);
        try {
            const user = await User.create({
                username,
                hashedPass,
                firstName,
                lastName,
                salt,
                roles: []
            });

            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalErr = err;
                    res.render('users/register', user);
                } else {
                    res.redirect('/');
                }
            });
        } catch (err) {
            console.log(err.message);
            res.locals.globalErr = err;
            res.render('users/register');
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) => {
        res.render('users/login');
    },
    loginPost: async (req, res) => {
        const {username, password} = req.body;

        try {
            const user = await User.findOne({username});

            if (!user) {
                handleErr('Invalid user data');
                return
            }

            if (!user.authenticate(password)) {
                handleErr('Invalid user data');
                return
            }

            req.logIn(user, (err, user) => {
                if (err) {
                    handleErr('Invalid user data');
                } else {
                    res.redirect('/');
                }
            });
        } catch (err) {
            handleErr(err);
        }

        function handleErr(err) {
            console.log(err);
            res.locals.globalErr = err;
            res.render('users/login');
        }
    }
};