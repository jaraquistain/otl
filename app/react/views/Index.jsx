var React = require('react');
var Renderer = require('../components/Renderer.js');

var Index = React.createClass({
    render: function () {
        return (
            <div>
                <h1>Too many cooks!</h1>
                <p>View
                    <a href="/posts">/posts</a>
                    .</p>
                <Renderer renderer={this.props.renderer} />
            </div>
        );
    }
});

module.exports = Index;