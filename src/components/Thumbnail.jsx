/*
	Copyright 2016, Jered Danielson
	jered@uw.edu

	This file is part of APOD 2.0.

	APOD 2.0 is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	APOD 2.0 is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with APOD 2.0.  If not, see <http://www.gnu.org/licenses/>.
*/

import React from 'react';

import Moment from "moment"

export default class Thumbnail extends React.Component {
	divStyle = {
		width: "60px", 
		height: "60px", 
		position: "relative", 
		display: "inline-block"
	};
	imgStyle = {
		top: "30px", 
		left: "30px", 
		transform: "translate(-50%, -50%)", 
		display: "block", 
		position: "absolute",
		width: "60px",
		height: "60px",
		objectFit: "cover"
	};
	overlayStyle = {
		position: "absolute",
		width: "100%",
		height: "100%"
	};
	activeStyle = {
		boxShadow: "inset 0 0 10px rgba(255, 255, 255, 1)",
		boxSizing: "border-box",
		border: "2px solid #EDF3FF"
	};
	dateHoverStyle = {
		position: "absolute",
		left: "50%",
		top: "-18px",
		color: "#aaa",
		padding: "5px",
		background: "#202428",
		border: "1px solid #404448",
		fontSize: "12px",
		fontFamily: "Open Sans, sans-serif",
		pointerEvents: "none",
		zIndex: 50
	};
	playIconStyle = {
		position: "absolute",
		left: "50%",
		top: "50%",
		transform: "translate(-50%, -50%)",
		pointerEvents: "none"
	};
	handleClick = () => {
		// when clicked, load the appropriate date way back in index.js
		if(!this.props.isDragging){
			this.props.loadEntry(Moment(this.props.dateString));
		}
	};
	shouldComponentUpdate(nextProps, nextState) {
		// only update if it gains/loses isSelected status, or its summary has arrived
		return nextProps.isSelected !== this.props.isSelected || nextProps.imgsrc !== this.props.imgsrc || nextProps.isVideo !== this.props.isVideo;
	}
	render() {
		return (
			<div className="thumbnail" onClick={this.handleClick} style={this.divStyle}>
				<div style={{position: "absolute", width: 20, height: 20, borderRadius: 10, background: "rgba(255, 255, 255, 0.25)", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}></div>
				{this.props.imgsrc ? <img style={this.imgStyle} alt="" onDragStart={function(e){e.preventDefault();}} onError={function(e){e.target.style.display = "none";}} src={this.props.imgsrc} /> : undefined}
				{this.props.isVideo ? <svg style={this.playIconStyle} width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="rgba(0, 0, 0, 0.5)" /><path fill="rgba(255, 255, 255, 0.8)" d="M9.5 7v10l8-5z" /></svg> : undefined}
				{(() => {if(this.props.isSelected){
					return <div style={Object.assign({}, this.overlayStyle, this.activeStyle)} className="thumbnail-overlay"></div>
				} else {
					return <div style={this.overlayStyle} className="thumbnail-overlay"></div>	
				}})()}
				<div className="date-hover" style={this.dateHoverStyle}>{this.props.dateString}</div>
			</div>
		);
	}
}
