import React from 'react';

var Moment = require("moment");

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
	overlayStyle: {
		position: "absolute",
		width: "100%",
		height: "100%"
	},
	activeStyle: {
		boxShadow: "inset 0 0 10px rgba(255, 255, 255, 1)",
		boxSizing: "border-box",
		border: "2px solid #EDF3FF"
	},
	dateHoverStyle: {
		position: "absolute",
		left: "50%",
		top: "-20px",
		color: "#aaa",
		fontSize: "12px",
		fontFamily: "Open Sans, sans-serif"
	},
	handleClick(){
		// when clicked, load the appropriate date way back in index.js
		this.props.loadEntry(Moment(this.props.dateString));
	},
	shouldComponentUpdate(nextProps, nextState) {
		// only update if props differ, which should only happen if it gains/loses isSelected status
		return nextProps.isSelected !== this.props.isSelected;
	},
	render() {
		return (
			<div className="thumbnail" onClick={this.handleClick} style={this.divStyle}>
				<img style={this.imgStyle} onDragStart={function(e){e.preventDefault();}} src={"http://apod.nasa.gov/apod/calendar/S_" + this.props.dateString.replace("-", "").replace("-", "").substring(2, 8) + ".jpg"} />
				{(() => {if(this.props.isSelected){
					return <div style={Object.assign({}, this.overlayStyle, this.activeStyle)} className="thumbnail-overlay"></div>
				} else {
					return <div style={this.overlayStyle} className="thumbnail-overlay"></div>	
				}})()}
				<div className="date-hover" style={this.dateHoverStyle}>{this.props.dateString}</div>
			</div>
		);
	}
});

module.exports = Thumbnail;