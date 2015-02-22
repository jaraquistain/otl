module.exports = function() {
    'use strict';
    return {
        '/': {
            'get': function () {
                this.res.send('hellosssss world');
            }
        }
    };
};