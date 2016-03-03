import React from 'react';

var Thumbnail = React.createClass({
	divStyle: {
		width: "60px", 
		height: "60px", 
		position: "relative", 
		display: "inline-block"
	},
	imgStyle: {
		top: "30px", 
		left: "30px", 
		transform: "translate(-50%, -50%)", 
		display: "block", 
		position: "absolute"
	},
	handleClick(){
		this.props.loadEntry(new Date(this.props.dateString));
	},
	shouldComponentUpdate(nextProps, nextState) {
		return false;
	},
	render() {
		return (
			<div className="thumbnail" onClick={this.handleClick} style={this.divStyle}>
				<img style={this.imgStyle} onDragStart={function(e){e.preventDefault();}} src={"http://apod.nasa.gov/apod/calendar/S_" + this.props.dateString.replace("-", "").replace("-", "").substring(2, 8) + ".jpg"} />
			</div>
		);
	}
});

module.exports = Thumbnail;