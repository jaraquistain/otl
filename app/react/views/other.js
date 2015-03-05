var React = require('react');
var Renderer = require('../components/renderer.js');

var Other = React.createClass({displayName: "Other",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("h1", null, "Other: ", this.props.id), 
                React.createElement("a", {href: "this.props.random"}, "/", this.props.random), 
                React.createElement(Renderer, {renderer: this.props.renderer})
            )
        );
    }
});

module.exports = Other;