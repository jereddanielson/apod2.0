import React from "react"

var Menu = React.createClass({
	style: {
		position: "absolute"
	},
	render() {
		return (
			<div id="menu" style={this.style}></div>
		);
	}
});

module.exports = Menu;