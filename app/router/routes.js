module.exports = {
    '/': function (renderAndSend) {
        renderAndSend(null, 'Index');
    },
    '/:id': function (id, renderAndSend) {
        renderAndSend(null, 'Other', {'id': id});
    }
};