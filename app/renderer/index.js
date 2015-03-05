var settings = require('app/settings');
module.exports = RendererServer;

function RendererServer() {}

RendererServer.prototype.render = function render(viewPath, data) {
    var randomPath = Math.ceil(Math.random() * 100000);
    return '<doctype html><html><head></head><body><div id="' + settings.constants.VIEW_CONTAINER_ID + '"><a href="/' + randomPath + '">' + randomPath + ' from server</a><p>Data:</p><p>' + JSON.stringify(data) + '</p></div><script src="js/scripts.js"></script></body></html>'
};

RendererServer.prototype.setView = function setView(viewHtml, req, res) {
    if (!req || !res) {throw new Error('method setView requires req and res objects');}
    res.send(viewHtml);
};

RendererServer.prototype.handleErr = function handleErr(err) {
    console.log('could not render view on server');
    console.log('this:', this);
    this.next(err);
};
