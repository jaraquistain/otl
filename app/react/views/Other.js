'use strict';
var React = require('react');
var Renderer = require('../components/Renderer');

var Other = React.createClass({displayName: "Other",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("h1", null, "Other: ", this.props.id), 
                React.createElement(Renderer, {renderer: this.props.renderer})
            )
        );
    }
});

module.exports = Other;
