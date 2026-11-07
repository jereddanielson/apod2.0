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

import Loading from "./Loading.jsx"

export default class Image extends React.Component {
	style = {
		boxShadow: "0 0 100px #404448",
		cursor: "zoom-in",
		position: "absolute",
		transform: "translate(-50%, -50%)"
	};
	imgstyle = {
		display: "block",
		maxWidth: "100vw",
		maxHeight: "calc(100vh - 160px)"
	};
	loadingStyle = {
		display: "block",
		color: "white",
		transform: "translate(-50%, -50%)"
	};
	// start unloaded
	state = {loaded: false, src: this.props.imgsrc};
	componentDidMount() {
		// when mounted, create and load image
		this.imgElement = document.createElement("img");
		this.imgElement.onload = this.handleLoaded;
		this.imgElement.onerror = this.handleError;
		this.imgElement.src = this.state.src;
	}
	componentWillUnmount() {
		this.imgElement.onload = null;
		this.imgElement.onerror = null;
	}
	handleLoaded = () => {
		// once image successfully loads, switch loaded flag
		this.setState({loaded: true});
	};
	handleError = () => {
		// the resized copy couldn't be loaded, so try the original
		var fallbacksrc = this.props.fallbacksrc;
		if(fallbacksrc && this.state.src !== fallbacksrc){
			this.setState({src: fallbacksrc});
			this.imgElement.src = fallbacksrc;
		}
	};
	render() {
		return (
			<div className="image" style={this.style}>
				{(() => {if(this.state.loaded){
					return <img style={this.imgstyle} onDragStart={function(e){e.preventDefault();}} src={this.state.src} alt={this.props.alt} title={this.props.title} />
				} else {
					return <Loading />;
				}})()}
			</div>
		);
	}
}
