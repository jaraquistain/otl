exports.notFound = function notFound(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);

};

exports.handleRuntimeError = function (env) {
    switch (env) {
        case 'development':
            return function (err, req, res, next) {
                var status = err.status || 500;
                res.status(status);
                res.send('error in dev server: ' + status);
            };
        default:
            return function (err, req, res) {
                var status = err.status || 500;
                res.status(status);
                res.send('error in default server: ' + status);
            };
    }
};