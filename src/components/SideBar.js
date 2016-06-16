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
import DateBox from "./DateBox"

var Moment = require("moment");

var SideBar = React.createClass({
	style: {
		color: "#ccc",
		position: "absolute",
		width: "100%",
		left: "0",
		top: "0"
	},
	titleStyle: {
		fontFamily: "'Roboto Slab', monospace",
		fontSize: "32px",
		padding: 0,
		margin: 0,
		lineHeight: "80px",
		textAlign: "center",
		width: "50%",
		height: "80px",
		overflow: "hidden",
		margin: "0 auto",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap"
	},
	explanationStyle: {
		fontSize: "16px",
		letterSpacing: ".05em",
		background: "#101418",
		border: "1px solid #202428",
		padding: "20px",
		top: "-10px",
		width: "512px",
		margin: "0 auto",
		position: "relative",
		zIndex: 20
	},
	pStyle: {
		color: "#aaa",
		fontFamily: "Roboto Slab, serif",
		fontWeight: 300
	},
	render() {
		return (
			<div id="sidebar" style={this.style}>
				<DateBox curDate={this.props.currentDate} setNewDate={this.props.setNewDate} />
				<div id="sidebar-title" style={this.titleStyle}>{this.props.data.title}</div>
				<div id="sidebar-explanation" style={this.explanationStyle}>{this.props.data.explanation}</div>
			</div>
		);
	}
});

module.exports = SideBar;