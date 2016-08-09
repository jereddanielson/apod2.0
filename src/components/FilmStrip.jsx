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

import React from "react"
import ReactDOM from "react-dom"
import TweenLite from "gsap"

var Moment = require("moment");

import Thumbnail from "./Thumbnail.jsx"

var FilmStrip = React.createClass({
	style: {
		position: "absolute",
		width: "100vw",
		height: "60px",
		bottom: 0,
		background: "#101418",
		borderTop: "1px solid #202428",
		whiteSpace: "nowrap",
		fontSize: 0,
		zIndex: 100
	},
	handleWheel(e){
		var scrollAmount = e.deltaX + e.deltaY;
		this.setState({scrollPos: Math.max(Math.min(this.state.scrollPos + scrollAmount, 0), -453120)});
	},
	getInitialState() {
		return {scrollPos: 0, range: 1};
	},
	componentDidMount() {
		this.updateRange();
		window.addEventListener("resize", this.updateRange);
	},
	componentWillUnmount(){
		window.removeEventListener("resize", this.updateRange);
	},
	componentWillReceiveProps(nextProps){
		this.keepCurrentInView(nextProps);
	},
	keepCurrentInView(props){
		// check that new date is inside visible range
		var dayFromScroll = Math.ceil(this.state.scrollPos / 60); // scroll position determines which day we count from
		if(dayFromScroll - 1 < props.currentDate.diff(Moment(), "days")){
			// outside right bounds
			this.setState({scrollPos: Math.max(-453120, Math.ceil(this.state.scrollPos / 60) * 60 + Math.abs(dayFromScroll - props.currentDate.diff(Moment(), "days")) * 60)});
		}
		if(dayFromScroll - this.state.range + 2 > props.currentDate.diff(Moment(), "days")){
			// outside left bounds
			this.setState({scrollPos: Math.max(-453120, Math.floor(this.state.scrollPos / 60) * 60 - Math.abs(dayFromScroll - this.state.range + 2 - props.currentDate.diff(Moment(), "days")) * 60 + (ReactDOM.findDOMNode(this).clientWidth % 60))});
		}
	},
	updateRange(){
		// the "range" (number of visible thumbnails) is based on window width
		var thisWidth = ReactDOM.findDOMNode(this).clientWidth;
		this.setState({range: Math.ceil(thisWidth / 60 + 1)});
		this.keepCurrentInView(this.props);
	},
	handlePointerStart(e){
		if(this.inertiaTween){
			this.inertiaTween.kill();
		}
		this.lastVelocity = 0;
		this.firstClientX = e.clientX;
		this.lastClientX = e.clientX;
		this.isPointerDown = true;
	},
	handlePointerMove(e){
		if(this.isPointerDown){
			var isNowDragging = this.state.isDragging;
			if(!this.state.isDragging && Math.abs(this.firstClientX - e.clientX) > 10){
				isNowDragging = true;
			}
			this.lastVelocity = this.lastClientX - e.clientX;
			this.setState({scrollPos: Math.max(-453120, Math.min(0, this.state.scrollPos + this.lastVelocity)), isDragging: isNowDragging});
			this.lastClientX = e.clientX;
		}
	},
	handlePointerUp(e){
		this.isPointerDown = false;
		var self = this;
		if(this.state.isDragging){
			this.inertiaTween = TweenLite.to(this, 1, {lastVelocity: 0, onUpdate: function(){
				self.setState({scrollPos: Math.max(-453120, Math.min(0, self.state.scrollPos + self.lastVelocity)), isDragging: false});
			}});
		}
	},
	render() {
		//console.log(Date.now());
		var dateArr = []; // all the dates to show (date strings)
		var dayFromScroll = Math.ceil(this.state.scrollPos / 60); // scroll position determines which day we count from
		// beginning of filmstrip date range is based on scroll position and range of days to show
		var dateMarker = Moment().subtract(-dayFromScroll + this.state.range, "days");

		// //console.log(dayFromScroll, dateMarker, this.state.scrollPos, this.props.currentDate.diff(Moment(), "days"), this.state.range);
		// if(dayFromScroll - 1 < this.props.currentDate.diff(Moment(), "days")){
		// 	console.log("outside right bounds by " + Math.abs(dayFromScroll - 1 - this.props.currentDate.diff(Moment(), "days")));
		// }
		// if(dayFromScroll - this.state.range + 2 > this.props.currentDate.diff(Moment(), "days")){
		// 	console.log("outside left bounds by " + (dayFromScroll - this.state.range + 2 - this.props.currentDate.diff(Moment(), "days")));
		// }

		for(var i = 0; i < this.state.range; i++){
			dateMarker.add(1, "days");
			dateArr.push(dateMarker.toJSON().substring(0, 10));
		}

		var self = this;

		return (
			<div id="filmstrip" onWheel={this.handleWheel} onMouseDown={this.handlePointerStart} onMouseMove={this.handlePointerMove} onMouseUp={this.handlePointerUp} onMouseLeave={this.handlePointerUp} onTouchStart={this.handlePointerStart} onTouchMove={this.handlePointerMove} onTouchEnd={this.handlePointerUp} onTouchCancel={this.handlePointerUp} style={this.style}>
				<div style={{transform: "translateX("+(-this.state.scrollPos % 60)+"px)", position: "absolute", right: "0"}}>
					{dateArr.map(function(dateString){
						return <Thumbnail isSelected={dateString == self.props.currentDate.toJSON().substring(0, 10) ? true : undefined} key={dateString + "thumb"} dateString={dateString} loadEntry={self.props.loadEntry} isDragging={self.state.isDragging} />
					})}
				</div>
			</div>
		);
	}
});

module.exports = FilmStrip;