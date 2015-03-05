var React = require('react');

module.exports = {
    '/': function (renderAndSend) {
        var view = React.createFactory(require('app/react/views/index.js'));
        renderAndSend(null, view);
    },
    '/:id': function (id, renderAndSend) {
        var view = React.createFactory(require('app/react/views/other.js'));
        renderAndSend(null, view, {'id': id});
    }
};