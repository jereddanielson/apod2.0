import React from "react"

import Thumbnail from "./Thumbnail"

var FilmStrip = React.createClass({
	handleWheel(e){
		var scrollAmount = -e.deltaX;
		this.setState({scrollPos: this.state.scrollPos + (scrollAmount * 1440000)});
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
		var dateStrs = [];
		var dateMarker = new Date(this.props.initialDate);
		var scrollDate = new Date(this.state.scrollPos);
		scrollDate.setHours(0);
		scrollDate.setMinutes(0);
		scrollDate.setSeconds(0);
		scrollDate.setMilliseconds(0);
		for(var i = -13; i < 13; i++){
			dateMarker.setTime(scrollDate.getTime() + (i * 86400000));
			dateStrs.push(dateMarker.toJSON().substring(0, 10));
		}

		return (
			<div id="filmstrip" className="abs-pos" onWheel={this.handleWheel}>
				<div style={{transform: "translateX("+((-((this.state.scrollPos - this.state.initialTime) / 1440000)) % 60)+"px)"}}>
					<Thumbnail loadEntry={this.props.loadEntry} position={-12} dateString={dateStrs[0]} />
					<Thumbnail loadEntry={this.props.loadEntry} position={-11} dateString={dateStrs[1]} />
					<Thumbnail loadEntry={this.props.loadEntry} position={-10} dateString={dateStrs[2]} />
					<Thumbnail loadEntry={this.props.loadEntry} position={-9} dateString={dateStrs[3]} />
					<Thumbnail loadEntry={this.props.loadEntry} position={-8} dateString={dateStrs[4]} />
					<Thumbnail loadEntry={this.props.loadEntry} position={-7} dateString={dateStrs[5]} />
					<Thumbnail loadEntry={this.props.loadEntry} position={-6} dateString={dateStrs[6]} />
					<Thumbnail loadEntry={this.props.loadEntry} position={-5} dateString={dateStrs[7]} />
					<Thumbnail loadEntry={this.props.loadEntry} position={-4} dateString={dateStrs[8]} />
					<Thumbnail loadEntry={this.props.loadEntry} position={-3} dateString={dateStrs[9]} />
					<Thumbnail loadEntry={this.props.loadEntry}  position={-2} dateString={dateStrs[10]} />
					<Thumbnail loadEntry={this.props.loadEntry}  position={-1} dateString={dateStrs[11]} />
					<Thumbnail loadEntry={this.props.loadEntry}  position={0} dateString={dateStrs[12]} />
					<Thumbnail loadEntry={this.props.loadEntry}  position={1} dateString={dateStrs[13]} />
					<Thumbnail loadEntry={this.props.loadEntry}  position={2} dateString={dateStrs[14]} />
					<Thumbnail loadEntry={this.props.loadEntry}  position={3} dateString={dateStrs[15]} />
					<Thumbnail loadEntry={this.props.loadEntry}  position={4} dateString={dateStrs[16]} />
					<Thumbnail loadEntry={this.props.loadEntry}  position={5} dateString={dateStrs[17]} />
					<Thumbnail loadEntry={this.props.loadEntry}  position={6} dateString={dateStrs[18]} />
					<Thumbnail loadEntry={this.props.loadEntry}  position={7} dateString={dateStrs[19]} />
					<Thumbnail loadEntry={this.props.loadEntry}  position={8} dateString={dateStrs[20]} />
					<Thumbnail loadEntry={this.props.loadEntry}  position={9} dateString={dateStrs[21]} />
					<Thumbnail loadEntry={this.props.loadEntry}  position={10} dateString={dateStrs[22]} />
					<Thumbnail loadEntry={this.props.loadEntry}  position={11} dateString={dateStrs[23]} />
					<Thumbnail loadEntry={this.props.loadEntry}  position={12} dateString={dateStrs[24]} />
					<Thumbnail loadEntry={this.props.loadEntry}  position={13} dateString={dateStrs[25]} />
				</div>
			</div>
		);
	}
});

module.exports = FilmStrip;