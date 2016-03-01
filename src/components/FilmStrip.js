import React from "react"
import ReactDOM from "react-dom"

import Chunk from "./Chunk"

var FilmStrip = React.createClass({
	chunkSize: 30,
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
		return {scrollPos: initD.getTime(), initialTime: initD.getTime(), chunks: []};
	},
	componentWillMount() {
		var timeStamp = this.props.initialDate.getTime();
		this.setState({chunks: [<Chunk loadEntry={this.props.loadEntry} key={timeStamp} chunkSize={this.chunkSize} timeStamp={timeStamp} />]})
	},
	componentDidMount() {
		ReactDOM.findDOMNode(this).scrollLeft = 999999999;
	},
	render() {
		var self = this;

		return (
			<div style={{overflowX: "scroll"}} id="filmstrip" className="abs-pos" onWheel={this.handleWheel}>
				{this.state.chunks}
			</div>
		);
	}
});

module.exports = FilmStrip;