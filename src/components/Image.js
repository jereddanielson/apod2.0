import React from "react"

/*
PROPS:
url - SD image source
*/

var Image = React.createClass({
	render() {
		return (
			<div className="abs-pos image">
				<img src={this.props.sdurl} alt={this.props.title} />
			</div>
		);
	}
});

module.exports = Image;