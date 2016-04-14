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

var Moment = require("moment");

var SideBar = React.createClass({
	style: {
		color: "#eee",
		position: "absolute",
		width: "500px",
		left: "0px",
		top: "50%",
		transform: "translateY(-50%)",
		padding: "50px"
	},
	hStyle: {
		fontFamily: "Open Sans, sans-serif",
	},
	pStyle: {
		color: "#aaa",
		fontFamily: "Roboto Slab, serif",
		fontWeight: 300
	},
	render() {
		return (
			<div id="sidebar" style={this.style}>
				<h2 style={this.hStyle}>{this.props.data.title}</h2>
				<h5 style={this.hStyle}>{Moment(this.props.data.date).format("DD MMMM YYYY")}</h5>
				<p style={this.pStyle}>{this.props.data.explanation}</p>
			</div>
		);
	}
});

module.exports = SideBar;