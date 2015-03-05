var settings = require('app/settings');
var React = require('react');
require('handlebars');

module.exports = RendererServer;

function RendererServer() {}

RendererServer.prototype.render = function render(reactView, data) {
    console.log('in render server');
    data.containerId = settings.constants.VIEW_CONTAINER_ID;
    data.scriptUrl = 'js/scripts.js';
    data.title = "Booyaaa";
    data.viewContent = React.renderToString(React.createFactory(reactView)(data));

    return wrapWithBase(data, function(err){
        return err.message;
    });
};

RendererServer.prototype.setView = function setView(viewHtml, req, res) {
    if (!req || !res) {throw new Error('method setView requires req and res objects');}
    res.send(viewHtml);
};

RendererServer.prototype.handleErr = function handleErr(err) {
    this.next(err);
};

function wrapWithBase(data, errorHandler) {
    try {
        var base = require('app/renderer/index.hbs');
        return base(data);
    } catch (err) {
        errorHandler(err);
    }
}
