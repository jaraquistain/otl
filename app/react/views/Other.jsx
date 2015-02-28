'use strict';
var React = require('react');
var Renderer = require('./../components/Renderer.jsx');

var Other = React.createClass({
    render: function () {
        return (
            <div>
                <h1>Other: {this.props.id}</h1>
                <Renderer renderer={this.props.renderer} />
            </div>
        );
    }
});

module.exports = Other;
