import React from "react"

var Video = React.createClass({
	render() {
		return (
			<div>
				<a href={this.props.vidsrc}>Video Link</a>
			</div>
		);
	}
});

module.exports = Video;