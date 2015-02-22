'use strict';
var isServer = !process.browser;



module.exports = function() {
    return {
        '/': function () {
            this.res.send('success at root');
        },
        '/:id': function (id) {
            this.res.send('success for id: ' + id);
        }
    };
};