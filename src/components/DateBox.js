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

var DateBox = React.createClass({
	style: {
		display: "block",
		position: "absolute",
		left: 0,
		top: 0,
		fontFamily: "Open Sans, sans-serif"
	},
	render() {
		return (
			<div id="datebox" style={this.style} >
				<div style={{fontSize: "40px", position: "absolute", textAlign: "right", width: "50px"}} >
					{this.props.curDate ? this.props.curDate.date() : ""}
				</div>
				<div style={{position: "absolute", left: "60px", top: "10px", fontSize: "12px"}} >
					{this.props.curDate ? this.props.curDate.format("MMMM").toString() : ""}
				</div>
				<div style={{position: "absolute", left: "60px", top: "30px", fontSize: "12px"}} >
					{this.props.curDate ? this.props.curDate.year() : ""}
				</div>
			</div>
		);
	}
});

module.exports = DateBox;