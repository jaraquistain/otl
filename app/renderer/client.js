var settings = require('app/settings');
var React = require('react');
module.exports = RendererClient;

function RendererClient() {}

RendererClient.prototype.render = function render(reactView, data) {
    return 'hello client';//React.renderToString(reactView, data);
};

RendererClient.prototype.setView = function setView(viewHtml) {
    var container = document.getElementById(settings.constants.VIEW_CONTAINER_ID);
    container.innerHTML = viewHtml;
};

RendererClient.prototype.handleErr = function handleErr(err) {
    console.error('could not rendier view on client');
    console.error(err.message + err.stack);
};
