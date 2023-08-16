let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// create user model instance
let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('about', { title: 'About', displayName: req.user ? req.user.displayName : ''});
}



module.exports.displayServicesPage = (req, res, next) => {
    res.render('services', { title: 'Services', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('contact', { title: 'Contact', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayLoginPage = (req, res, next) => {
    if (!req.user) {
        res.render('auth/login', { 
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    } else {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        // server error
        if (err) return next(err);
        if (!user) {
            req.flash('loginMessage', 'Error 401: Unauthorized');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // server error (continued)
            if (err) return next(err);
            return res.redirect('/');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    if (!req.user) {
        res.render('auth/register', { 
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    } else {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // create new user object
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.username
    });

    User.register(newUser, req.body.password, (err) => {
        if (err) { // On Registration Error
            console.log("Error creating new user");
            if (err.name == "UserExistsError") {
                req.flash(
                    'registerMessage',
                    'That username is unavailable'
                );
                console.log('Registration Error: User already exists');
            }
            return res.render('auth/register', {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        } else {
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/product-list');
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout(e=>e);
    res.redirect('/');
}