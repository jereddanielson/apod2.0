import React from "react"

var Video = React.createClass({
	iframeStyle: {
		width: "960px",
		height: "540px",
		position: "absolute",
		transform: "translate(-50%, -50%)"
	},
	render() {
		return (
			<iframe style={this.iframeStyle} src={this.props.vidsrc} frameBorder={0} allowFullScreen />
		);
	}
});

module.exports = Video;