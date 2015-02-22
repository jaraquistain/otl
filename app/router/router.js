var director = require('director');
var React = require('react');
var isServer = !process.browser;
var DirectorRouter = isServer ? director.http.Router : director.Router;
var Renderer = require('../renderer');

module.exports = Router;

function Router(routes) {
    'use strict';
    if (!routes) {throw new Error("Must provide routes object.");}
    this.directorRouter = new DirectorRouter(this.parseRoutes(routes));
    this.renderer = new Renderer();

    //if (!isServer) {
    //    // Kick-off client-side initialization.
    //    this.start();
    //}
}

Router.prototype.parseRoutes = function(routes) {
    'use strict';
    var parsedRoutes = {},
        route, handler;

    for (route in routes) {
        if (routes.hasOwnProperty(route)) {
            handler = routes[route];
            parsedRoutes[route] = isServer ? {'get': handler} : handler;
        }
    }
    return parsedRoutes;
};