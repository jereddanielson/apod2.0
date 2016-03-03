import React from "react"

var SideBar = React.createClass({
	style: {
		position: "absolute"
	},
	render() {
		return (
			<div id="sidebar" style={this.style}></div>
		);
	}
});

module.exports = SideBar;