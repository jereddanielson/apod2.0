import React from "react"
import ReactDOM from "react-dom"

import Thumbnail from "./Thumbnail"

var FilmStrip = React.createClass({
	handleWheel(e){
		var scrollAmount = -e.deltaX;
		this.setState({scrollPos: Math.min(this.state.scrollPos + scrollAmount, 0)});
	},
	getInitialState() {
		return {scrollPos: 0, range: 1};
	},
	componentDidMount() {
		this.setState({range: Math.ceil(ReactDOM.findDOMNode(this).clientWidth / 60)})
	},
	render() {
		var dateArr = [];
		var dateMarker = new Date(this.props.initialDate);
		var dayFromScroll = Math.ceil(this.state.scrollPos / 60);
		dateMarker.setDate(dateMarker.getDate() + dayFromScroll - this.state.range);
		for(var i = 0; i < this.state.range; i++){
			dateMarker.setDate(dateMarker.getDate() + 1);
			dateArr.push(dateMarker.toJSON().substring(2, 10));
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
			<div id="filmstrip" className="abs-pos" onWheel={this.handleWheel}>
				<div style={{transform: "translateX("+(-this.state.scrollPos % 60 - 60)+"px)"}}>
					{dateArr.map(function(dateString){
						return <Thumbnail key={dateString + "thumb"} dateString={dateString} loadEntry={self.props.loadEntry} />
					})}
				</div>
			</div>
		);
	}
});

module.exports = FilmStrip;