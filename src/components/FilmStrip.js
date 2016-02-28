import React from "react"

import Thumbnail from "./Thumbnail"

var FilmStrip = React.createClass({
	handleWheel(e){
		var scrollAmount = (Math.abs(e.deltaX) > Math.abs(e.deltaY)) ? e.deltaX : -e.deltaY;
		this.setState({scrollPos: this.state.scrollPos + scrollAmount});
	},
	getInitialState() {
		return {scrollPos: 0};
	},
	componentDidMount() {
		this.setState({initialDate: this.props.initialDate});
	},
	render() {
		var docWidth = document.documentElement.clientWidth;

		return (
			<div id="filmstrip" className="abs-pos" onWheel={this.handleWheel}>
				<div style={{transform: "translateX("+this.state.scrollPos+"px)"}}>
					<Thumbnail position={-1} dateString="2016-02-20"/>
					<Thumbnail position={0} dateString="2016-02-21"/>
					<Thumbnail position={1} dateString="2016-02-22"/>
				</div>
			</div>
		);
	}
});

module.exports = FilmStrip;