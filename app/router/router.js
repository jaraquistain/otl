'use strict';
var isServer = !process.browser;
var director = require('director');
var DirectorRouter = isServer ? director.http.Router : director.Router;
//var React = require('react');
var Renderer = require('app/renderer');

module.exports = Router;

function Router(routes) {
    if (!routes) {throw new Error("Must provide routes object.");}
    this.directorRouter = new DirectorRouter(this.parseRoutes(routes));
    this.renderer = new Renderer();
    !isServer && this.initClient();
}

Router.prototype.parseRoutes = function (routes) {
    var parsedRoutes = {},
        route, handler;

    for (route in routes) {
        if (routes.hasOwnProperty(route)) {
            handler = routes[route];
            parsedRoutes[route] = isServer ? {'get': this.generateHandler(handler)} : this.generateHandler(handler);
        }
    }
    return parsedRoutes;
};

/**
 * This function wraps the route specific logic defined in the routes. This is executed
 * @param handler the callback function defined in the route specifying route-specific logic
 * @returns {Function}
 */
Router.prototype.generateHandler = function (handler) {
    var router = this;
    return function () {
        var routeContext = this,
            params = Array.prototype.slice.call(arguments),
            handleErr = router.renderer.handleErr.bind(routeContext),
            handlerContext = {
                'req': routeContext.req,
                'res': routeContext.res
            };

        function renderAndSend() {
            handler.apply(handlerContext, params.concat(function (err, reactView, data) {
                if (err) {return handleErr(err);}

                data = data || {};
                data.router = router;

                var viewHtml = router.renderer.render(reactView, data);
                router.renderer.setView(viewHtml, routeContext.req, routeContext.res);
            }));
        }

        try {
            renderAndSend();
        } catch (err) {
            handleErr(err);
        }
    };

};

Router.prototype.initClient = function () {
    console.log('starting client router');
    this.directorRouter.configure({
        html5history: true
    });

    //Intercept links and let through only if data-pass-thru="true"
    document.addEventListener('click', function (e) {
        var el = e.target;
        var dataset = el && el.dataset;
        if (el && el.nodeName === 'A' && (!dataset.passThru || dataset.passThru === 'false')) {
            this.directorRouter.setRoute(el.attributes.href.value);
            e.preventDefault();
        }
    }.bind(this), false);

    //Kick off client routing
    this.directorRouter.init();
};

Router.prototype.setRoute = function (route) {
    this.directorRouter.setRoute(route);
};