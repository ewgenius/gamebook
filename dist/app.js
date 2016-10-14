"use strict";
var path = require('path');
var dotenv = require('dotenv');
var _ = require('underscore');
var keystone = require('keystone');
dotenv.config();
keystone.init({
    name: 'gamebook',
    brand: 'gamebook',
    'auto update': true,
    updates: path.resolve(__dirname, './updates'),
    session: true,
    auth: true,
    'user model': 'User',
    mongo: process.env.MONGO_URL,
    'cookie secret': process.env.COOKIE_SECRET
});
keystone.set('locals', {
    _: _,
    env: keystone.get('env'),
    utils: keystone.utils,
    editable: keystone.content.editable
});
keystone.import('models');
keystone.set('routes', require('./routes'));
keystone.start({
    onHttpServerCreated: function () {
        keystone.mongoose.Promise = Promise;
    }
});
