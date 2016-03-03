/*
	This is the entry point into the APOD 2.0 application.

	Copyright (C) 2016 Jered Cahill Danielson jered@uw.edu

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import React from "react"
import ReactDOM from "react-dom"

import APOD from "./modules/APOD"

import Menu from "./components/Menu"
import SideBar from "./components/SideBar"
import ImageBox from "./components/ImageBox"
import FilmStrip from "./components/FilmStrip"

Date.prototype.nextDate = function(){
	var nextDate = new Date(this);
	nextDate.setDate(nextDate.getDate() + 1);
	return nextDate;
}
Date.prototype.prevDate = function(){
	var prevDate = new Date(this);
	prevDate.setDate(prevDate.getDate() - 1);
	return prevDate;
}

var APP = React.createClass({
	style: {
		width: "100vw",
		height: "100vh",
		background: "#000408"
	},
	getInitialState() {
		return {date: new Date(), initialDate: new Date(), data: {}};
	},
	handleKeyDown(e) {
		if(e.keyCode >= 37 && e.keyCode <= 40){
			e.preventDefault();
			switch(e.keyCode){
				case 37: // left
					// load previous date
					this.loadEntry(this.state.date.prevDate());
					break;
				case 39: // right
					// load next date
					this.loadEntry(this.state.date.nextDate());
					break;
			}
		}
	},
	componentWillMount() {
		document.addEventListener("keydown", this.handleKeyDown);
	},
	componentDidMount() {
		this.loadInitialImage();
	},
	render() {
		return (
			<div id="app" className="abs-pos" onWheel={function(e){e.preventDefault();}} style={this.style}>
				<Menu />
				<SideBar />
				<ImageBox onIMGLoad={this.onIMGLoad}>{this.state.data.reactElement}</ImageBox>
				<FilmStrip loadEntry={this.loadEntry} initialDate={this.state.initialDate}/>
			</div>
		);
	},
	loadInitialImage(){
		var _self = this;
		this.props.apod.get(undefined, function(d){
			var curDate = new Date(d.date);
			_self.setState({date: curDate, initialDate: curDate});
			_self.updateData(d);
		});
	},
	loadEntry(_date) {
		this.props.apod.get(_date, this.updateData);
		this.setState({date: new Date(_date)});
	},
	updateData(_data){
		this.setState({data: _data});
		this.props.apod.preload(this.state.date.nextDate());
		this.props.apod.preload(this.state.date.prevDate());
	},
	onIMGLoad(){
	}
});

ReactDOM.render(<APP apod={new APOD()} />, document.getElementById("app-container"));