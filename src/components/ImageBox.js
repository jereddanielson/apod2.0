import React from "react"

var ImageBox = React.createClass({
	render() {
		return (
			<div id="imagebox" className="abs-pos">
				{this.props.children}
			</div>
		);
	}
});

module.exports = ImageBox;