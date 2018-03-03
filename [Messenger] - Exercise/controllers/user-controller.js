const User = require('../models/User');
const encryption = require('../util/encryption');
const mongoose = require('mongoose');
const Thread = require('./../models/Thread');

function handleErr(err) {
    console.log(err);
}

module.exports = {
    register: {
        get: (req, res) => {
            res.render('user/register')
        },
        post: (req, res) => {
            let userData = req.body

            if (
                userData.password &&
                userData.password !== userData.confirmedPassword
            ) {
                userData.error = 'Passwords do not match'
                res.render('user/register', userData)
                return
            }

            let salt = encryption.generateSalt()
            userData.salt = salt

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
                            res.render('users/register', {error: 'Wrong credentials!'})
                            return
                        }

                        res.redirect('/')
                    })
                })
                .catch(error => {
                    userData.error = error
                    res.render('user/register', userData)
                })
        }
    },
    login: {
        get: (req, res) => {
            res.render('user/login')
        },
        post: (req, res) => {
            let userData = req.body;

            User.findOne({username: userData.username}).then(user => {
                if (!user || !user.authenticate(userData.password)) {
                    res.render('user/login', {error: 'Wrong credentials!'});
                    return
                }

                req.logIn(user, (err, user) => {
                    if (err) {
                        res.render('user/login', {error: 'Wrong credentials!'});
                        return
                    }

                    res.redirect('/')
                })
            })
        }
    },
    logout: (req, res) => {
        req.logout()
        res.redirect('/')
    },
    find: {
        get: (req, res) => {
            let {username} = req.query;

            User.findOne({username})
                .then(userData => {
                    if (!userData) {
                        return res.redirect('/?error=User does not exist')
                    }

                    Thread.findOne({users: { $all: [userData._id, req.user._id] }})
                        .then(existingThread => {

                            if (!existingThread) {
                                Thread.create({users: [userData._id, req.user._id]})
                                    .then(thread => {
                                        userData.otherUsers.push(req.user._id);
                                        req.user.otherUsers.push(userData._id);
                                        Promise.all([userData.save(), req.user.save()])
                                            .then(data => {
                                            console.log("data", data);
                                        });
                                    }).catch(err => console.log("err", err));
                            }

                            res.redirect(`/thread/${userData.username}`)
                        })

                })
                .catch(handleErr)
        },
        post: (req, res) => {
        }
    }
};
