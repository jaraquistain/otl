'use strict';
var isServer = !process.browser;

module.exports = function() {
    return {
        '/': function (callback) {
            console.log('callback for \'/\'');
            callback(null, 'Index');
        },
        '/:id': function (id, callback) {
            console.log('callback for \'' + id + '\'');
            callback(null, 'Other', {'id': id});
        }
    };
};