import React from "react"

var ImageBox = React.createClass({
	render() {
		return (
			<div id="imagebox" className="abs-pos">
				<img src={this.props.sdurl} onLoad={this.props.onIMGLoad} />
			</div>
		);
	}
});

module.exports = ImageBox;