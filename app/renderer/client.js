var settings = require('app/settings');
var React = require('react');
module.exports = RendererClient;

window.React = React;

function RendererClient() {}

RendererClient.prototype.render = function render(reactView, data) {
    return React.createFactory(reactView)(data);
};

RendererClient.prototype.setView = function setView(viewComponent) {
    React.render(viewComponent, document.getElementById(settings.constants.VIEW_CONTAINER_ID));
};

RendererClient.prototype.handleErr = function handleErr(err) {
    console.error('could not render view on client');
    console.error(err.message + err.stack);
};

RendererClient.prototype.handleErr = function(err) {
    console.error(err.message + err.stack);
    alert(err);
};
