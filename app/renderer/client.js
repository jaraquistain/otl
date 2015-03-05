var settings = require('app/settings');
module.exports = RendererClient;

function RendererClient() {}

RendererClient.prototype.render = function render(viewPath, data) {
    var randomPath = Math.ceil(Math.random() * 100000);
    return '<a href="/' + randomPath + '">' + randomPath + ' from client</a><p>Data:</p><p>' + JSON.stringify(data) + '</p>';
};

RendererClient.prototype.setView = function setView(viewHtml) {
    var container = document.getElementById(settings.constants.VIEW_CONTAINER_ID);
    container.innerHTML = viewHtml;
};

RendererClient.prototype.handleErr = function handleErr(err) {
    console.error('could not rendier view on client');
    console.error(err.message + err.stack);
};
