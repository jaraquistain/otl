var director = require('director');
var isServer = typeof window === 'undefined';
var DirectorRouter = isServer ? director.http.Router : director.Router;

module.exports = Router;

function Router(routes) {
    'use strict';
    if (!routes) {throw new Error("Must provide routes object.");}
    this.directorRouter = new DirectorRouter({
        '/': function(){console.log('read route from route table');}
    });

    //this.directorRouter = new DirectorRouter(this.parseRoutes(routes));
}

/**
 * Parse the routes object and modify it to use the router as the context;
 * @param routes an object whose keys are routes and values are route handler functions
 */
Router.prototype.parseRoutes = function (routes) {
    'use strict';
    var parsedRoutes = {},
        router = this,
        route;

    function wrap(fn) {
        return function(){
            fn.call(router);
        };
    }

    for (route in routes) {
        if (routes.hasOwnProperty(route)) {
            parsedRoutes[route] = {
                'get': wrap(routes[route])
            };
        }
    }
};

/*
 * Express middleware function, for mounting routes onto an Express app.
 */
Router.prototype.middleware = function () {
    'use strict';
    var directorRouter = this.directorRouter;
    return function middleware(req, res, next) {
        // Attach `this.next` to route handler, for better handling of errors.
        directorRouter.attach(function () { this.next = next;});
        // Dispatch the request to the Director router.c
        directorRouter.dispatch(req, res, function (err) {
            console.log('dispatching request');
            // When a 404, just forward on to next Express middleware.
            if (err && err.status === 404) {next();}
        });
    };
};