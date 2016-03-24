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