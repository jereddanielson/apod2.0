/*
	Copyright 2016, Jered Danielson
	jered@uw.edu

	This file is part of APOD 2.0.

	APOD 2.0 is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	APOD 2.0 is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with APOD 2.0.  If not, see <http://www.gnu.org/licenses/>.
*/

import React from "react"

export default class Video extends React.Component {
	videoStyle = {
		width: "960px",
		height: "540px",
		maxWidth: "100vw",
		maxHeight: "calc(100vh - 160px)",
		position: "absolute",
		transform: "translate(-50%, -50%)",
		boxShadow: "0 0 100px #404448",
		background: "#000"
	};
	messageStyle = {
		position: "absolute",
		width: "100vw",
		transform: "translate(-50%, -50%)",
		textAlign: "center"
	};
	state = {failed: false};
	// clicks on the player's controls shouldn't reach ContentBox, which would open the hi-res view
	stopClick = (e) => {
		e.stopPropagation();
	};
	render() {
		if(this.props.type === "iframe"){
			return <iframe style={this.videoStyle} src={this.props.vidsrc} frameBorder={0} allowFullScreen title={this.props.title} />;
		}
		if(this.state.failed){
			// not every browser can play every format in the archive
			return <div style={this.messageStyle} onClick={this.stopClick}><a href={this.props.vidsrc} target="_blank" rel="noopener noreferrer">Your browser can't play this video here. Open it directly.</a></div>;
		}
		return <video style={this.videoStyle} src={this.props.vidsrc} controls title={this.props.title} onClick={this.stopClick} onError={() => this.setState({failed: true})} />;
	}
}
