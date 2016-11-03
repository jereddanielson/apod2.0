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

var Image = React.createClass({
	style: {
		boxShadow: "0 0 100px #404448",
		cursor: "zoom-in",
		position: "absolute",
		transform: "translate(-50%, -50%)"
	},
	imgstyle: {
		display: "block",
		maxWidth: "100vw",
		maxHeight: "calc(100vh - 160px)"
	},
	loadingStyle: {
		display: "block",
		color: "white",
		transform: "translate(-50%, -50%)"
	},
	getInitialState() {
		// start unloaded
		return {loaded: false};
	},
	componentDidMount() {
		// when mounted, create and load image
		var imgElement = document.createElement("img");
		imgElement.onload = this.handleLoaded;
		var imgsrc = this.props.imgsrc.replace("http://", "https://");
		imgElement.src = imgsrc;
	},
	handleLoaded() {
		// once image successfully loads, switch loaded flag
		if(this.isMounted()){
			this.setState({loaded: true});
		}
	},
	render() {
		var imgsrc = this.props.imgsrc.replace("http://", "https://");
		return (
			<div className="image" style={this.style}>
				{(() => {if(this.state.loaded){
					return <img style={this.imgstyle} onDragStart={function(e){e.preventDefault();}} src={imgsrc} alt={this.props.alt} title={this.props.title} />
				} else {
					return <div className="loading-anim"><div className="LA-1"></div><div className="LA-2"></div></div>;
				}})()}
			</div>
		);
	}
});

module.exports = Image;