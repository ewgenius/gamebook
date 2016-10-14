"use strict";
var keystone = require('keystone');
var Types = keystone.Field.Types;
var Book = new keystone.List('Book');
Book.add({
    name: {
        type: Types.Text,
        required: true,
        initial: true,
        index: true
    },
    owner: {
        type: Types.Relationship,
        ref: 'User',
        required: true,
        initial: true
    }
});
Book.defaultColumns = 'name';
Book.register();
