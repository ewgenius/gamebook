"use strict";
var keystone = require('keystone');
var User = keystone.list('User');
module.exports = function (done) {
    var admin = new User.model({
        email: 'admin@gamebook.com',
        password: 'admin',
        name: { first: 'Admin', last: 'User' }
    });
    admin.isAdmin = true;
    admin.save()
        .then(function () { return done(); })
        .catch(function (err) { return done(err); });
};
