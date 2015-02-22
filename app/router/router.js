'use strict';
var director = require('director');
var React = require('react');
var isServer = !process.browser;
var DirectorRouter = isServer ? director.http.Router : director.Router;
var Renderer = require('../renderer');

module.exports = Router;

function Router(routes) {
    if (!routes) {throw new Error("Must provide routes object.");}
    this.directorRouter = new DirectorRouter(this.parseRoutes(routes));
    this.renderer = new Renderer();

    if (!isServer) {
        // Kick-off client-side initialization.
        this.start();
    }
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

Router.prototype.generateHandler = function (handler) {
    var router = this;
    return function () {
        var routeContext = this;
        var params = Array.prototype.slice.call(arguments);
        var handleErr = router.renderer.handleErr.bind(routeContext);
        var handlerContext = {
            req: routeContext.req,
            res: routeContext.res
        };

        function handleRoute() {
            handler.apply(handlerContext, params.concat(function(err, viewPath, data) {
                if (err) {return handleErr(err);}

                data = data || {};
                // Add `router` property, i.e. so components can do redirects.
                data.router = router;
                // Add `renderer` property to demonstrate which side did the rendering.
                //TODO: we don't actually need this once its all working
                data.renderer = isServer ? 'server' : 'client';

                var component = router.getComponent(viewPath, data);

                router.renderer.render(component, routeContext.req, routeContext.res);
            }));
        }

        try {
            handleRoute();
        } catch (err) {
            handleErr(err);
        }
    };

};

Router.prototype.getComponent = function(viewPath, data) {
    var Component = React.createFactory(require(Renderer.viewsDir + '/' + viewPath + '.jsx'));
    return Component(data);
};

Router.prototype.start = function () {
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

Router.prototype.setRoute = function(route) {
    this.directorRouter.setRoute(route);
};