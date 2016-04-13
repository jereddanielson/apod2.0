import React from "react"

var HiRes = React.createClass({
	style: {
		width: "100%",
		height: "100%",
		position: "absolute",
		backgroundColor: "rgba(0, 0, 0, .9)",
		cursor: "zoom-out",
		zIndex: 200
	},
	imgStyle: {
		position: "absolute",
		left: "50%",
		top: "50%",
		transform: "translate(-50%, -50%)",
		maxWidth: "100vw",
		maxHeight: "100vh",
		boxShadow: "0 0 100px #404448"
	},
	render(){
		return (
			<div style={this.style} onClick={this.props.toggleHiRes}>
				<img style={this.imgStyle} src={this.props.url} />
			</div>
		);
	}
});

module.exports = HiRes;