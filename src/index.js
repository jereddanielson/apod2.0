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

var Moment = require("moment");

import APOD from "./modules/APOD"

import Menu from "./components/Menu"
import SideBar from "./components/SideBar"
import ImageBox from "./components/ImageBox"
import FilmStrip from "./components/FilmStrip"
import HiRes from "./components/HiRes"

var APP = React.createClass({
	style: {
		width: "100vw",
		height: "100vh",
		background: "#000408"
	},
	getInitialState() {
		return {date: Moment(), initialDate: Moment(), cutoffDate: Moment(), data: {}, showHiRes: false};
	},
	handleKeyDown(e) {
		if(e.keyCode >= 37 && e.keyCode <= 40){
			e.preventDefault();
			switch(e.keyCode){
				case 37: // left
					// load previous date
					this.loadEntry(Moment(this.state.date).subtract(1, "days"));
					break;
				case 39: // right
					// load next date
					this.loadEntry(Moment(this.state.date).add(1, "days"));
					break;
			}
		}
	},
	componentDidMount() {
		document.addEventListener("keydown", this.handleKeyDown);
		this.loadInitialImage();
	},
	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleKeyDown);
	},
	render() {
		return (
			<div id="app" className="abs-pos" onWheel={function(e){e.preventDefault();}} style={this.style}>
				<Menu />
				<SideBar data={this.state.data} />
				<FilmStrip loadEntry={this.loadEntry} initialDate={this.state.initialDate} currentDate={this.state.date} />
				{(() => {if(this.state.showHiRes){
					return <HiRes url={this.state.data.hdurl} toggleHiRes={this.toggleHiRes} />
				} else {
					return <ImageBox onIMGLoad={this.onIMGLoad} toggleHiRes={this.toggleHiRes}>
						{this.state.data.reactElement}
					</ImageBox>
				}})()}
			</div>
		);
	},
	loadInitialImage(){
		var _self = this;
		this.props.apod.get(undefined, function(d){
			var curDate = Moment(d.date);
			_self.setState({date: curDate, initialDate: curDate, cutoffDate: curDate});
			_self.updateData(d, curDate);
		});
	},
	loadEntry(_date) {
		// make sure new entry to load isn't past the cutoff date
		if(_date.isSameOrBefore(this.state.cutoffDate)){
			var _self = this;
			// get rid of current data???
			_self.setState({date: Moment(_date), data: {}});
			_self.props.apod.get(_date, function(d){
				_self.updateData(d, _date);
			}, function(d){
				// failed
			});
		}
	},
	updateData(_data, _date){
		// update app data with what came back from APOD module
		// only update if the new data agreees with the currently selected date
		if(_date.toJSON().substring(0, 10) === _data.date){
			this.setState({data: _data});
			// preload, but not past the cutoff date
			var tomorrow = Moment(_date).add(1, "days");
			if(tomorrow.isSameOrBefore(this.state.cutoffDate)){
				this.props.apod.preload(tomorrow);
			}
			this.props.apod.preload(Moment(_date).subtract(1, "days"));
		}
	},
	onIMGLoad(){
	},
	toggleHiRes(){
		this.setState({showHiRes: !this.state.showHiRes});
	}
});

ReactDOM.render(<APP apod={new APOD()} />, document.getElementById("app-container"));