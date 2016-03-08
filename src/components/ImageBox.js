import React from "react"

var ImageBox = React.createClass({
	style: {
		margin: "0 auto",
		left: "50%",
		top: "calc(50% - 30px)",
		transform: "translate(-50%, -50%)",
		background: "rgba(255, 100, 100, .1)",
		position: "absolute"
	},
	render() {
		return (
			<div id="imagebox" style={this.style} onClick={this.props.toggleHiRes}>
				{this.props.children}
			</div>
		);
	}
});

module.exports = ImageBox;