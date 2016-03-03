import React from "react"

var ImageBox = React.createClass({
	style: {
		margin: "0 auto",
		left: "50%",
		top: "50%",
		transform: "translate(-50%, -50%)",
		background: "rgba(255, 100, 100, .1)",
		position: "absolute"
	},
	render() {
		return (
			<div id="imagebox" style={this.style}>
				{this.props.children}
			</div>
		);
	}
});

module.exports = ImageBox;