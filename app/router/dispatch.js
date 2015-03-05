module.exports = function(router) {
    return function middleware(req, res, next) {
        router.directorRouter.dispatch(req, res, function (err) {
            if (err && err.status === 404) {next();}
        });
    };
};