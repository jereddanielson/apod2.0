import React from "react"

import Thumbnail from "./Thumbnail"

var FilmStrip = React.createClass({
	handleWheel(e){
		var scrollAmount = -e.deltaX;
		this.setState({scrollPos: Math.min(this.state.scrollPos + (scrollAmount * 1440000), this.state.initialTime)});
	},
	getInitialState() {
		var initD = new Date(this.props.initialDate.getTime());
		initD.setHours(0);
		initD.setMinutes(0);
		initD.setSeconds(0);
		initD.setMilliseconds(0);
		return {scrollPos: initD.getTime(), initialTime: initD.getTime()};
	},
	render() {
		var dateArr = [];
		var dateMarker = new Date(this.props.initialDate);
		var scrollDate = new Date(this.state.scrollPos);
		scrollDate.setHours(0);
		scrollDate.setMinutes(0);
		scrollDate.setSeconds(0);
		scrollDate.setMilliseconds(0);
		for(var i = -30; i < 30; i++){
			dateMarker.setTime(scrollDate.getTime() + (i * 86400000));
			dateArr.push({index: i, dateString: dateMarker.toJSON().substring(0, 10)});
		}

		var self = this;

		return (
			<div id="filmstrip" className="abs-pos" onWheel={this.handleWheel}>
				<div style={{transform: "translateX("+((-(((this.state.scrollPos + 1440000) - this.state.initialTime) / 1440000)) % 60 - 60)+"px)"}}>
					{dateArr.map(function(ea){
						return <Thumbnail key={ea.dateString + "thumb"} dateString={ea.dateString} loadEntry={self.props.loadEntry} />
					})}
				</div>
			</div>
		);
	}
});

module.exports = FilmStrip;