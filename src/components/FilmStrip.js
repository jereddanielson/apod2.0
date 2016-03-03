import React from "react"
import ReactDOM from "react-dom"

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
		fontSize: 0
	},
	handleWheel(e){
		var scrollAmount = -e.deltaX;
		this.setState({scrollPos: Math.min(this.state.scrollPos + scrollAmount, 0)});
	},
	getInitialState() {
		return {scrollPos: 0, range: 1};
	},
	componentDidMount() {
		var thisWidth = ReactDOM.findDOMNode(this).clientWidth;
		this.setState({range: Math.ceil(thisWidth / 60 + 1), width: thisWidth})
	},
	render() {
		var dateArr = [];
		var dateMarker = new Date(this.props.initialDate);
		var dayFromScroll = Math.ceil(this.state.scrollPos / 60);
		dateMarker.setDate(dateMarker.getDate() + dayFromScroll - this.state.range);
		for(var i = 0; i < this.state.range; i++){
			dateMarker.setDate(dateMarker.getDate() + 1);
			dateArr.push(dateMarker.toJSON().substring(0, 10));
		}

		/*
		var dateArr = [];
		var dateMarker = new Date(this.props.initialDate);
		var scrollDate = new Date(this.state.scrollPos * 1440000 + this.state.initialTime);
		scrollDate.setHours(12);
		scrollDate.setMinutes(0);
		scrollDate.setSeconds(0);
		scrollDate.setMilliseconds(0);
		for(var i = -10; i < 10; i++){
			dateMarker.setTime(scrollDate.getTime() + (i * 86400000));
			dateArr.push({index: i, dateString: dateMarker.toJSON().substring(0, 10)});
		}
		*/

		var self = this;

		return (
			<div id="filmstrip" onWheel={this.handleWheel} style={this.style}>
				<div style={{transform: "translateX("+(-this.state.scrollPos % 60)+"px)", position: "absolute", right: "0"}}>
					{dateArr.map(function(dateString){
						return <Thumbnail key={dateString + "thumb"} dateString={dateString} loadEntry={self.props.loadEntry} />
					})}
				</div>
			</div>
		);
	}
});

module.exports = FilmStrip;