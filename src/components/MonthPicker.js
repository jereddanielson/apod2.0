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

var MonthPicker = React.createClass({
	getInitialState() {
		return {isOpen: false};
	},
	componentWillMount() {
		document.addEventListener("click", this.handleCancelClick);
	},
	componentWillUnmount() {
		document.removeEventListener("click", this.handleCancelClick);
	},
	handleCancelClick(e) {
		if(this.state.isOpen && e.target.id !== "month-picker-inner-id" && e.target.id !== "month-picker-num"){
			this.setState({isOpen: false});
		}
	},
	handleClick(e) {
		this.setState({isOpen: true});
	},
	handlePicked(e){
		this.setState({isOpen: false});
		this.props.setNewDate(this.props.curDateMoment.clone().month(e - 1));
	},
	render() {
		var datesArray = [{num: 1, name: "January"}, {num: 2, name: "February"}, {num: 3, name: "March"}, {num: 4, name: "April"}, {num: 5, name: "May"}, {num: 6, name: "June"}, {num: 7, name: "July"}, {num: 8, name: "August"}, {num: 9, name: "September"}, {num: 10, name: "October"}, {num: 11, name: "November"}, {num: 12, name: "December"}, ];
		var self = this;
		return (
			<div id="datebox-month" className={"datebox-component " + (this.state.isOpen ? "picker-is-open" : "")} style={{fontSize: "18px", padding: "5px"}} >
				<div className="month-picker">
					<div id="month-picker-num" onClick={this.handleClick}>{this.props.curMonth}</div>
					{(() => {if(this.state.isOpen){
						return (<div id="month-picker-inner-id" className="month-picker-inner">
							{datesArray.map(function(e){
								return <div className={"month-picker-month picker-element " + (e.name === self.props.curMonth ? "selected-picker-element" : "")} onClick={function(){self.handlePicked(e.num)}} key={"month-picker-" + e.num}>{e.name}</div>
							})}
						</div>)
					} else {
						return undefined;
					}})()}
				</div>
			</div>
		);
	}
});

module.exports = MonthPicker;