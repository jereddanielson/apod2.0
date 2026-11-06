/*
	FilmStrip is the image strip at the bottom of the page.
	It's fairly complicated and has a few magic numbers, making it hard to decipher.
	Basically it just does things like keep track of the screen size, FilmStrip position,
	and scroll events.

	One of its most important roles is keeping only the necessary thumbnails loaded,
	by dynamically loading/unloading HTML elements on the fly.

	Thumbnail images are pulled from a NASA service that automatically generates them.
	They follow a naming convention that makes it fairly easy to access.
	However it's not always reliable and some images are broken.

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
import gsap from "gsap"

import Moment from "moment"

import Thumbnail from "./Thumbnail.jsx"

export default class FilmStrip extends React.Component {
	style = {
		position: "absolute",
		width: "100vw",
		height: "60px",
		bottom: 0,
		background: "#101418",
		borderTop: "1px solid #202428",
		whiteSpace: "nowrap",
		fontSize: 0,
		zIndex: 100
	};
	rootRef = React.createRef();
	handleWheel = (e) => {
		var scrollAmount = e.deltaX + e.deltaY;
		this.scrollBy(scrollAmount);
	};
	scrollBy(amount){
		// updater form, because React may batch several of these into one render
		this.setState((state) => ({scrollPos: Math.max(-453120, Math.min(0, state.scrollPos + amount))}));
	}
	state = {scrollPos: Math.min(this.props.currentDate.diff(Moment(), "days") * 60 + window.innerWidth / 2 - 30, 0), range: Math.ceil(window.innerWidth / 60 + 1)};
	componentDidMount() {
		this.updateRange();
		window.addEventListener("resize", this.updateRange);
		// attached natively because React's own touchmove listener is passive and can't preventDefault
		this.rootRef.current.addEventListener("touchmove", this.handleTouchMove, {passive: false});
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.updateRange);
		this.rootRef.current.removeEventListener("touchmove", this.handleTouchMove);
	}
	componentDidUpdate(prevProps) {
		// props is a new object only when the parent re-rendered. Skipping our own
		// setState updates is what lets the user scroll the current date out of view.
		if(prevProps !== this.props){
			this.keepCurrentInView(this.props);
		}
	}
	keepCurrentInView = (props) => {
		// check that new date is inside visible range
		var dayFromScroll = Math.ceil(this.state.scrollPos / 60); // scroll position determines which day we count from
		if(dayFromScroll - 1 < props.currentDate.diff(Moment(), "days")){
			// outside right bounds
			this.setState({scrollPos: Math.max(-453120, Math.ceil(this.state.scrollPos / 60) * 60 + Math.abs(dayFromScroll - props.currentDate.diff(Moment(), "days")) * 60)});
		}
		if(dayFromScroll - this.state.range + 2 > props.currentDate.diff(Moment(), "days")){
			// outside left bounds
			this.setState({scrollPos: Math.max(-453120, Math.floor(this.state.scrollPos / 60) * 60 - Math.abs(dayFromScroll - this.state.range + 2 - props.currentDate.diff(Moment(), "days")) * 60 + (this.rootRef.current.clientWidth % 60))});
		}
	};
	updateRange = () => {
		// the "range" (number of visible thumbnails) is based on window width
		var thisWidth = this.rootRef.current.clientWidth;
		// wait for the new range to be applied, keepCurrentInView depends on it
		this.setState({range: Math.ceil(thisWidth / 60 + 1)}, () => this.keepCurrentInView(this.props));
	};
	handlePointerStart = (e) => {
		if(this.inertiaTween){
			this.inertiaTween.kill();
		}
		this.lastVelocity = 0;
		this.firstClientX = e.clientX;
		this.lastClientX = e.clientX;
		this.isPointerDown = true;
	};
	handlePointerMove = (e) => {
		if(this.isPointerDown){
			var isNowDragging = this.state.isDragging;
			if(!this.state.isDragging && Math.abs(this.firstClientX - e.clientX) > 10){
				isNowDragging = true;
			}
			this.lastVelocity = this.lastClientX - e.clientX;
			this.scrollBy(this.lastVelocity);
			this.setState({isDragging: isNowDragging});
			this.lastClientX = e.clientX;
		}
	};
	handlePointerUp = (e) => {
		this.isPointerDown = false;
		var self = this;
		if(this.state.isDragging){
			this.inertiaTween = gsap.to(this, {duration: 1, lastVelocity: 0, onUpdate: function(){
				self.scrollBy(self.lastVelocity);
				self.setState({isDragging: false});
			}});
		}
	};
	handleTouchStart = (e) => {
		this.handlePointerStart({clientX: e.touches[0].clientX});
	};
	handleTouchMove = (e) => {
		if(this.state.isDragging){
			e.preventDefault(); // prevent scroll if filmstrip is dragging
		}
		this.handlePointerMove({clientX: e.touches[0].clientX});
	};
	handleTouchUp = (e) => {
		if(e.touches.length == 0){
			this.handlePointerUp(e);
		}
	};
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
			<div id="filmstrip" ref={this.rootRef} onWheel={this.handleWheel} onMouseDown={this.handlePointerStart} onMouseMove={this.handlePointerMove} onMouseUp={this.handlePointerUp} onMouseLeave={this.handlePointerUp} onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchUp} onTouchCancel={this.handleTouchUp} style={this.style}>
				<div style={{transform: "translateX("+(-this.state.scrollPos % 60)+"px)", position: "absolute", right: "0"}}>
					{dateArr.map(function(dateString){
						return <Thumbnail isSelected={dateString == self.props.currentDate.toJSON().substring(0, 10) ? true : undefined} key={dateString + "thumb"} dateString={dateString} loadEntry={self.props.loadEntry} isDragging={self.state.isDragging} />
					})}
				</div>
			</div>
		);
	}
}
