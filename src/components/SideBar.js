import React from "react"

var Moment = require("moment");

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var SideBar = React.createClass({
	style: {
		color: "#eee",
		position: "absolute",
		padding: "20px",
		margin: "20px",
		zIndex: 20,
		overflow: "hidden"
	},
	h2Style: {
		fontFamily: "Open Sans, sans-serif",
		padding: 0,
		margin: "36px 0 20px 0",
		width: "500px"
	},
	h5Style: {
		fontFamily: "Open Sans, sans-serif",
		padding: 0,
		margin: 0,
		position: "absolute"
	},
	pStyle: {
		color: "#ccc",
		fontFamily: "Roboto Slab, serif",
		fontWeight: 300,
		margin: 0,
		padding: 0,
		width: "500px"
	},
	getInitialState() {
		return {direction: "direction-left"};
	},
	componentWillReceiveProps(nextProps){
		if(nextProps.date !== this.props.date){
			this.setState({direction: (nextProps.date.isBefore(this.props.date) ? "direction-right" : "direction-left")});
		}
	},
	render() {
		return (
			<div id="sidebar" style={this.style} className={this.state.direction}>
				<ReactCSSTransitionGroup transitionName="dateHeader" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
					<h5 key={Moment(this.props.date).format("YYYYMMDD") + "dateHeader"} style={this.h5Style}>{Moment(this.props.date).format("D MMMM YYYY")}</h5>
				</ReactCSSTransitionGroup>
				<h2 style={this.h2Style}>{this.props.data.title}</h2>
				<p style={this.pStyle}>{this.props.data.explanation}</p>
			</div>
		);
	}
});

module.exports = SideBar;