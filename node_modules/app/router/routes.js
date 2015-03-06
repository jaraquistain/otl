module.exports = {
    '/': function (renderAndSend) {
        renderAndSend(null,
            require('app/react/views/index')
        );
    },
    '/:id': function (id, renderAndSend) {
        renderAndSend(null,
            require('app/react/views/other'),
            {
                'id': id,
                'random': Math.ceil(Math.random() * 10000000)
            }
        );
    }
};