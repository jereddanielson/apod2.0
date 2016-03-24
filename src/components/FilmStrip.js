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
		var scrollAmount = e.deltaX;
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
	updateRange(){
		// the "range" (number of visible thumbnails) is based on window width
		var thisWidth = ReactDOM.findDOMNode(this).clientWidth;
		this.setState({range: Math.ceil(thisWidth / 60 + 1)});
	},
	render() {
		var dateArr = []; // all the dates to show (date strings)
		var dayFromScroll = Math.ceil(this.state.scrollPos / 60); // scroll position determines which day we count from
		// beginning of filmstrip date range is based on scroll position and range of days to show
		var dateMarker = Moment(this.props.initialDate).subtract(-dayFromScroll + this.state.range, "days");
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