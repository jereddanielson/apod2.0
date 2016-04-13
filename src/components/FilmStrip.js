import React from "react"
import ReactDOM from "react-dom"

var Moment = require("moment");

import Thumbnail from "./Thumbnail"

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
		overflow: "hidden"
	},
	handleWheel(e){
		var scrollAmount = e.deltaX + e.deltaY;
		this.setState({scrollPos: Math.min(this.state.scrollPos + scrollAmount, 0)});
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
		// check that new date is inside visible range
		var dayFromScroll = Math.ceil(this.state.scrollPos / 60); // scroll position determines which day we count from
		if(dayFromScroll - 1 < nextProps.currentDate.diff(Moment(), "days")){
			// outside right bounds
			this.setState({scrollPos: Math.ceil(this.state.scrollPos / 60) * 60 + Math.abs(dayFromScroll - nextProps.currentDate.diff(Moment(), "days")) * 60});
		}
		if(dayFromScroll - this.state.range + 2 > nextProps.currentDate.diff(Moment(), "days")){
			// outside left bounds
			this.setState({scrollPos: Math.floor(this.state.scrollPos / 60) * 60 - Math.abs(dayFromScroll - this.state.range + 2 - nextProps.currentDate.diff(Moment(), "days")) * 60 + (ReactDOM.findDOMNode(this).clientWidth / 60)});
		}
	},
	updateRange(){
		// the "range" (number of visible thumbnails) is based on window width
		var thisWidth = ReactDOM.findDOMNode(this).clientWidth;
		this.setState({range: Math.ceil(thisWidth / 60 + 1)});
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
			<div id="filmstrip" onWheel={this.handleWheel} style={this.style}>
				<div style={{transform: "translateX("+(-this.state.scrollPos % 60)+"px)", position: "absolute", right: "0"}}>
					{dateArr.map(function(dateString){
						return <Thumbnail isSelected={dateString == self.props.currentDate.toJSON().substring(0, 10) ? true : undefined} key={dateString + "thumb"} dateString={dateString} loadEntry={self.props.loadEntry} />
					})}
				</div>
			</div>
		);
	}
});

module.exports = FilmStrip;