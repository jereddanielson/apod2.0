import React from "react"

var Image = React.createClass({
	render() {
		return (
			<div className="image">
				<img src={this.props.imgsrc} />
			</div>
		);
	}
});

module.exports = Image;