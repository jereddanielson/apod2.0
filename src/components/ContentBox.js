import React from "react"

var ContentBox = React.createClass({
	style: {
		right: "50%",
		top: "calc(50% - 30px)",
		transform: "translate(-50%, -50%) scale(1)",
		background: "rgba(255, 100, 100, .1)",
		position: "absolute"
	},
	render() {
		return (
			<div id="contentbox" style={this.style} onClick={this.props.toggleHiRes}>
				{this.props.children}
			</div>
		);
	}
});

module.exports = ContentBox;