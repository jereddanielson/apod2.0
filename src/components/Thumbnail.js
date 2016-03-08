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
	overlayStyle: {
		position: "absolute",
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(255, 0, 0, .5)"
	},
	handleClick(){
		this.props.loadEntry(new Date(this.props.dateString));
	},
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.isSelected !== this.props.isSelected;
	},
	render() {
		return (
			<div className="thumbnail" onClick={this.handleClick} style={this.divStyle}>
				<img style={this.imgStyle} onDragStart={function(e){e.preventDefault();}} src={"http://apod.nasa.gov/apod/calendar/S_" + this.props.dateString.replace("-", "").replace("-", "").substring(2, 8) + ".jpg"} />
				{(() => {if(this.props.isSelected){
					return <div style={this.overlayStyle} className="thumbnail-overlay"></div>
				}})()}
			</div>
		);
	}
});

module.exports = Thumbnail;