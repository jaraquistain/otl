exports.notFound = function notFound(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
};

exports.handleRuntimeError = function (env) {
    switch (env) {
        case 'development':
            return function (err, req, res) {
                res.status(err.status || 500);
                res.send('error in development server:', err);
            };
        default:
            return function (err, req, res, next) {
                res.status(err.status || 500);
                res.send('error in default server:', err.message);
            };
    }
};
