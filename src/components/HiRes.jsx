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

var HiRes = React.createClass({
	style: {
		width: "100%",
		height: "100%",
		position: "absolute",
		backgroundColor: "rgba(0, 0, 0, .9)",
		cursor: "zoom-out",
		zIndex: 2000
	},
	imgStyle: {
		position: "absolute",
		left: "50%",
		top: "50%",
		transform: "translate(-50%, -50%)",
		maxWidth: "100vw",
		maxHeight: "100vh",
		boxShadow: "0 0 100px #404448"
	},
	render(){
		var url = this.props.url.replace("http://", "https://");
		return (
			<div style={this.style} onClick={this.props.toggleHiRes}>
				<img style={this.imgStyle} src={url} />
			</div>
		);
	}
});

module.exports = HiRes;