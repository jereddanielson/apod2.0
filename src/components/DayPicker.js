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

var DayPicker = React.createClass({
	getInitialState() {
		return {isOpen: false};
	},
	handleClick(e) {
		this.setState({isOpen: true});
	},
	handlePicked(e){
		this.setState({isOpen: false});
		this.props.setNewDate(this.props.curDateMoment.clone().date(e));
	},
	render() {
		var datesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
		for(var i = 28; i < this.props.daysInCurMonth; i++){
			datesArray.push(i + 1);
		}
		var self = this;
		return (
			<div className="day-picker">
				<div onClick={this.handleClick}>{this.props.curDay}</div>
				{(() => {if(this.state.isOpen){
					return (<div className="day-picker-inner">
						{datesArray.map(function(e){
							return <div className={"day-picker-day picker-element " + (e === self.props.curDay ? "selected-picker-element" : "")} onClick={function(){self.handlePicked(e)}} key={"day-picker-" + e}>{e}</div>
						})}
					</div>)
				} else {
					return undefined;
				}})()}
			</div>
		);
	}
});

module.exports = DayPicker;