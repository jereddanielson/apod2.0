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
		borderTop: "0px solid #202428",
		whiteSpace: "nowrap",
		fontSize: 0
	},
	scrollBarStyle: {
		position: "absolute",
		width: "100%",
		height: "60px",
		backgroundColor: "rgba(255, 0, 0, .1)",
		top: "-100%"
	},
	yearBarStyle: {
		position: "absolute",
		top: 0,
		width: "100%",
		height: "20px",
		backgroundColor: "rgba(100, 100, 255, .1)"
	},
	monthBarStyle: {
		position: "absolute",
		top: "20px",
		width: "100%",
		height: "20px",
		backgroundColor: "rgba(255, 0, 255, .1)"
	},
	monthLabelStyle: {
		position: "absolute",
		top: 0,
		right: 0,
		height: "20px",
		backgroundColor: "rgba(255, 255, 255, .2)",
		fontSize: "12px",
		color: "#aaa",
		lineHeight: "20px",
		fontFamily: "Open Sans, sans-serif",
		textAlign: "left"
	},
	dayBarStyle: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		height: "20px",
		backgroundColor: "rgba(100, 255, 100, .1)"
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
		this.keepCurrentInView(nextProps);
	},
	keepCurrentInView(props){
		// check that new date is inside visible range
		var dayFromScroll = Math.ceil(this.state.scrollPos / 60); // scroll position determines which day we count from
		if(dayFromScroll - 1 < props.currentDate.diff(Moment(), "days")){
			// outside right bounds
			this.setState({scrollPos: Math.ceil(this.state.scrollPos / 60) * 60 + Math.abs(dayFromScroll - props.currentDate.diff(Moment(), "days")) * 60});
		}
		if(dayFromScroll - this.state.range + 2 > props.currentDate.diff(Moment(), "days")){
			// outside left bounds
			this.setState({scrollPos: Math.floor(this.state.scrollPos / 60) * 60 - Math.abs(dayFromScroll - this.state.range + 2 - props.currentDate.diff(Moment(), "days")) * 60 + (ReactDOM.findDOMNode(this).clientWidth % 60)});
		}
	},
	updateRange(){
		// the "range" (number of visible thumbnails) is based on window width
		var thisWidth = ReactDOM.findDOMNode(this).clientWidth;
		this.setState({range: Math.ceil(thisWidth / 60 + 1)});
		this.keepCurrentInView(this.props);
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

		var monthTracker = -1; // track month to see when it changes
		var monthArr = []; // the months to display in the month scrollbar

		for(var i = 0; i < this.state.range; i++){
			dateMarker.add(1, "days");
			dateArr.push(dateMarker.toJSON().substring(0, 10));
			if(monthTracker != dateMarker.month()){
				monthTracker = dateMarker.month();
				monthArr.push({start: i, month: monthTracker});
			}
		}
		for(var i = 0; i < monthArr.length - 1; i++){
			monthArr[i].end = monthArr[i + 1].start - 1;
		}
		monthArr[monthArr.length - 1].end = this.state.range;

		var self = this;
		return (
			<div id="filmstrip" onWheel={this.handleWheel} style={this.style}>
				<div style={this.scrollBarStyle}>
					<div style={this.yearBarStyle}></div>
					<div style={this.monthBarStyle}>
						{monthArr.map(function(ea){
							return (<div style={Object.assign({}, self.monthLabelStyle, {width: (ea.end - ea.start) * 60 + 60, transform: "translateX("+(-self.state.scrollPos % 60 - ((self.state.range - ea.end) * 60) + 60)+"px)"})} key={"monthLabel"+ea.month}>
								{ea.month}
							</div>);
						})}
					</div>
					<div style={this.dayBarStyle}></div>
				</div>
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