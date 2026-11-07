/*
	This is the entry point into the APOD 2.0 application.

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
import {createRoot} from "react-dom/client"

import Moment from "moment"

import APOD from "./modules/APOD.jsx"
import {EARLIEST_DATE, toDateString} from "./modules/nasa.js"

import Menu from "./components/Menu.jsx"
import SideBar from "./components/SideBar.jsx"
import ContentBox from "./components/ContentBox.jsx"
import FilmStrip from "./components/FilmStrip.jsx"
import HiRes from "./components/HiRes.jsx"
import ArrowNav from "./components/ArrowNav.jsx"
import Info from "./components/Info.jsx"

class APP extends React.Component {
	style = {
		position: "absolute",
		width: "100vw",
		height: "100vh",
		background: "#000408",
		overflow: "hidden"
	};
	earliestPossibleDate = Moment(EARLIEST_DATE);
	latestPossibleDate = Moment();
	rootRef = React.createRef();
	state = {date: {}, data: {}, showHiRes: false, initialImageLoaded: false};
	handleKeyDown = (e) => {
		if(e.keyCode >= 37 && e.keyCode <= 40){
			e.preventDefault();
			switch(e.keyCode){
				case 37: // left
					// load previous date
					this.loadPrevEntry();
					break;
				case 39: // right
					// load next date
					this.loadNextEntry();
					break;
			}
		}
	};
	loadNextEntry = () => {
		this.loadEntry(Moment(this.state.date).add(1, "days"));
	};
	loadPrevEntry = () => {
		this.loadEntry(Moment(this.state.date).subtract(1, "days"));
	};
	componentDidMount() {
		document.addEventListener("keydown", this.handleKeyDown);
		var _self = this;
		window.onpopstate = function(e){
			var theMoment = Moment(location.hash.substring(1), "YYYY-MM-DD", true); // the hash might be empty
			if(theMoment.isValid()){
				_self.fetchFromAPOD(theMoment);
			} else {
				_self.loadInitialImage();
			}
		}
		this.loadInitialImage();
		window.addEventListener("resize", this.handleResize);
		this.handleResize();
		// attached natively because React's own wheel listener is passive and can't preventDefault
		this.rootRef.current.addEventListener("wheel", this.preventWheel, {passive: false});
	}
	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleKeyDown);
		window.removeEventListener("resize", this.handleResize);
		this.rootRef.current.removeEventListener("wheel", this.preventWheel);
	}
	handleResize = () => {
		this.setState({clientWidth: this.rootRef.current.clientWidth});
	};
	preventWheel = (e) => {
		e.preventDefault();
	};
	render() {
		return (
			<div id="app" className="abs-pos" ref={this.rootRef} style={this.style}>
				<Menu />
				{this.state.initialImageLoaded ? <SideBar data={this.state.data} currentDate={this.state.date} setNewDate={this.loadEntry} /> : undefined}
				{this.state.initialImageLoaded ? <FilmStrip loadEntry={this.loadEntry} currentDate={this.state.date} /> : undefined}
				{(() => {if(this.state.showHiRes && this.state.data.hdurl){
					return <HiRes url={this.state.data.hdurl} toggleHiRes={this.toggleHiRes} />
				} else {
					return <ContentBox onIMGLoad={this.onIMGLoad} toggleHiRes={this.toggleHiRes} >
						{this.state.data.reactElement}
					</ContentBox>
				}})()}
				{Moment(this.state.date).add(1, "days").isSameOrAfter(this.latestPossibleDate) ? undefined : this.state.initialImageLoaded ? <ArrowNav direction="next" setNewDate={this.loadNextEntry} /> : undefined}
				{this.state.initialImageLoaded ? <ArrowNav direction="prev" setNewDate={this.loadPrevEntry} /> : undefined}
				<Info />
			</div>
		);
	}
	loadInitialImage = () => {
		var _self = this;
		var request = _self.latestRequest = {};
		var dateToLoad = Moment(location.hash.substring(1), "YYYY-MM-DD", true);
		if(dateToLoad.isValid() && dateToLoad.isSameOrBefore(this.latestPossibleDate) && dateToLoad.isSameOrAfter(this.earliestPossibleDate)){
			// seems to be a valid date in the URL hash
			var onLoad = function(d){
				if(request === _self.latestRequest){
					var curDate = Moment(d.date);
					_self.setState({date: curDate, initialImageLoaded: true});
					_self.updateData(d, curDate);
				}
			};
			this.props.apod.get(dateToLoad, onLoad, onLoad);
		} else {
			// no valid URL hash for the date
			location.hash = "";
			var onLoad = function(d){
				if(request === _self.latestRequest){
					var curDate = Moment(d.date);
					_self.setState({date: curDate, initialImageLoaded: true});
					_self.updateData(d, curDate);
				}
			};
			this.props.apod.get(undefined, onLoad, onLoad);
		}
	};
	loadEntry = (_date) => {
		var dateToLoad = _date.isSameOrBefore(this.earliestPossibleDate) ? this.earliestPossibleDate.clone() : _date;
		dateToLoad = dateToLoad.isSameOrAfter(this.latestPossibleDate) ? this.latestPossibleDate.clone() : dateToLoad;
		location.hash = toDateString(dateToLoad);
	};
	fetchFromAPOD = (_date) => {
		// make sure new entry to load isn't past the cutoff date
		if(_date.isSameOrBefore(Moment()) && !_date.isSame(this.state.date)){
			var _self = this;
			// a slow response for an earlier request mustn't replace this one
			var request = _self.latestRequest = {};
			// replace the current data right away, with whatever we have for the new date
			var instant = _self.props.apod.getInstant(_date);
			if(instant.title){
				document.title = "APOD 2.0 - " + instant.title;
			}
			_self.setState({date: Moment(_date), data: instant});
			var onLoad = function(d){
				if(request === _self.latestRequest){
					_self.updateData(d, _date);
				}
			};
			_self.props.apod.get(_date, onLoad, onLoad);
		} else {
			this.loadInitialImage();
		}
	};
	updateData = (_data, _date) => {
		// update app data with what came back from APOD module
		// only update if the new data agreees with the currently selected date
		if(toDateString(_date) === _data.date){
			// update title???
			document.title = "APOD 2.0 - " + _data.title;
			this.setState({data: _data});
			// preload, but not past the cutoff date
			var tomorrow = Moment(_date).add(1, "days");
			if(tomorrow.isSameOrBefore(Moment())){
				this.props.apod.preload(tomorrow);
			}
			this.props.apod.preload(Moment(_date).subtract(1, "days"));
			// Send Google Analytics pageview
			ga("set", "page", "#" + toDateString(_date));
			ga("send", "pageview");
			// If we weren't loaded properly before, we are now!
			if(!this.state.initialImageLoaded){
				this.setState({initialImageLoaded: true});
			}
		}
	};
	onIMGLoad = () => {
	};
	toggleHiRes = () => {
		// error messages have no image to show
		if(!this.state.showHiRes && !this.state.data.hdurl){
			return;
		}
		this.setState({showHiRes: !this.state.showHiRes});
	};
}

createRoot(document.getElementById("app-container")).render(<APP apod={new APOD()} />);