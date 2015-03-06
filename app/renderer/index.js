var settings = require('app/settings');
var React = require('react');
require('handlebars');

module.exports = RendererServer;

function RendererServer() {}

RendererServer.prototype.render = function render(reactView, data) {
    var layoutVars = {
        'containerId': settings.constants.VIEW_CONTAINER_ID,
        'scriptUrl':   settings.constants.SCRIPT_URL,
        'title':       data.title || "Sup d00dz",
        'viewContent': React.renderToString(React.createFactory(reactView)(data))
    };

    return wrapWithBase(layoutVars, function (err) {
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
