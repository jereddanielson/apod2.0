import React from "react"

var Video = React.createClass({
	iframeStyle: {
		width: "960px",
		height: "540px"
	},
	render() {
		return (
			<iframe style={this.iframeStyle} src={this.props.vidsrc} frameBorder={0} allowFullScreen />
		);
	}
});

module.exports = Video;