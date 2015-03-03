var React = require('react');
var Renderer = require('../components/Renderer.js');

var Index = React.createClass({displayName: "Index",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("h1", null, "Too many cooks!"), 
                React.createElement("p", null, "View", 
                    React.createElement("a", {href: "/posts"}, "/posts"), 
                    "."), 
                React.createElement(Renderer, {renderer: this.props.renderer})
            )
        );
    }
});

module.exports = Index;
