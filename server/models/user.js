// required modules
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

// create a model class
let userModel = mongoose.Schema({
    username:
    {
        type: String,
        default: '',
        trim: true,
        required: 'Username is required'
    },

/*
    password:
    {
        type: String,
        default: '',
        trim: true,
        required: 'Passord is required'
    },
*/

    email:
    {
        type: String,
        default: '',
        trim: true,
        required: 'Email Address is required'
    },

    displayName:
    {
        type: String,
        default: '',
        trim: true,
        required: 'Display Name is required'
    },

    created:
    {
        type: Date,
        default: Date.now,
    },

    updated:
    {
        type: Date,
        default: Date.now,
    }
},
{
    collection: "users"
});


// configure user model options
let options = ({ missingPasswordError: 'Incorrect Password' });

userModel.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', userModel);