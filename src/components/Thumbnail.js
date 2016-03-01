import React from 'react';

var Thumbnail = React.createClass({
	handleClick(){
		this.props.loadEntry(new Date(this.props.dateString));
	},
	render() {
		console.log("rendered " + this.props.dateString);
		return (
			<div onClick={this.handleClick} style={{width: "60px", height: "60px", position: "relative", display: "inline-block"}}>
				<img style={{top: "30px", left: "30px", transform: "translate(-50%, -50%)", display: "block", position: "absolute"}} src={"http://apod.nasa.gov/apod/calendar/S_" + this.props.dateString.replace("-", "").replace("-", "").substring(2, 8) + ".jpg"} />
			</div>
		);
	}
});

module.exports = Thumbnail;