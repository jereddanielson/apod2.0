import React from "react"

import Thumbnail from "./Thumbnail"

var Chunk = React.createClass({
	getInitialState() {
		var thumbArr = [];
		var dateMarker = this.props.timeStamp - (this.props.chunkSize * 86400000);
		var endTime = this.props.timeStamp;
		while(dateMarker < endTime){
			var date = new Date(dateMarker);
			thumbArr.push(<Thumbnail loadEntry={this.props.loadEntry} key={date.toJSON().substring(0, 10)} dateString={date.toJSON()} />);
			dateMarker += 86400000;
		}

		return {thumbnails: thumbArr};
	},
	render() {
		return (
			<div style={{fontSize: 0, whiteSpace: "nowrap"}}>
				{this.state.thumbnails}
			</div>
		);
	}
});

module.exports = Chunk;