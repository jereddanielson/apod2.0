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

var APP = React.createClass({
	getInitialState() {
		return {date: new Date(), sdurl: ""};
	},
	handleKeyDown(e) {
		if(e.keyCode >= 37 && e.keyCode <= 40){
			e.preventDefault();
			switch(e.keyCode){
				case 37: // left
					// load previous date
					var prevDate = new Date(this.state.date);
					prevDate.setDate(prevDate.getDate() - 1);
					this.loadEntry(prevDate);
					break;
				case 39: // right
					// load next date
					var nextDate = new Date(this.state.date);
					nextDate.setDate(nextDate.getDate() + 1);
					this.loadEntry(nextDate);
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
			<div id="app" className="abs-pos">
				<Menu />
				<SideBar />
				<ImageBox sdurl={this.state.sdurl} onIMGLoad={this.onIMGLoad}/>
				<FilmStrip />
			</div>
		);
	},
	loadInitialImage(){
		var _self = this;
		this.props.apod.get(undefined, function(d){
			_self.setState({date: new Date(d.date)});
			_self.updateImage(d);
		});
		this.preloadNext();
	},
	loadEntry(_date) {
		this.props.apod.get(_date, this.updateImage);
		this.setState({date: new Date(_date)});
	},
	updateImage(_data){
		this.setState({sdurl: _data.sdurl});
		this.preloadNext();
	},
	preloadNext() {
		var _self = this;
		var prevDate = new Date(this.state.date);
		var nextDate = new Date(this.state.date);
		prevDate.setDate(prevDate.getDate() - 1);
		nextDate.setDate(nextDate.getDate() + 1);
		this.props.apod.get(prevDate, function(d){
			var tempImage = new Image();
			tempImage.src = d.sdurl;
		});
		this.props.apod.get(nextDate, function(d){
			var tempImage = new Image();
			tempImage.src = d.sdurl;
		});
	},
	onIMGLoad(){
	}
});

ReactDOM.render(<APP apod={new APOD()} />, document.getElementById("app-container"));