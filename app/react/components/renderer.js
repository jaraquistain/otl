var React = require('react');

var Renderer = React.createClass({displayName: "Renderer",
    render: function () {
        return React.createElement("small", {className: "debug"}, 
            "Rendered on the ", React.createElement("strong", null, this.props.renderer), "."
        );
    }
});

module.exports = Renderer;