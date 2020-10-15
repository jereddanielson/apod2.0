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

import React from "react";
import DateBox from "./DateBox.jsx";

class SideBar extends React.Component {
  style = {
    color: "#ccc",
    position: "absolute",
    width: "100%",
    left: "0",
    top: "0",
  };
  titleStyle = {
    fontFamily: "'Roboto Slab', monospace",
    padding: "0 20px",
    margin: 0,
    lineHeight: "80px",
    height: "80px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    left: "50%",
    transform: "translateX(-50%)",
    position: "absolute",
  };
  explanationStyle = {
    fontSize: "16px",
    letterSpacing: ".05em",
    padding: "20px",
    top: "60px",
    width: "720px",
    margin: "0 auto",
    position: "relative",
    zIndex: 20,
    maxWidth: "100vw",
    boxSizing: "border-box",
  };
  pStyle = {
    color: "#aaa",
    fontFamily: "Roboto Slab, serif",
    fontWeight: 300,
  };
  render = () => {
    return (
      <div id="sidebar" style={this.style}>
        <DateBox
          curDate={this.props.currentDate}
          setNewDate={this.props.setNewDate}
        />
        <div id="sidebar-title" style={this.titleStyle}>
          {this.props.data.title}
        </div>
        <div id="sidebar-explanation" style={this.explanationStyle}>
          <div>{this.props.data.explanation}</div>
          <div className="sidebar-sourceinfo">
            <a
              target="_blank"
              href={
                "http://apod.nasa.gov/apod/ap" +
                this.props.currentDate.clone().format("YYMMDD").toString() +
                ".html"
              }
            >
              Source
            </a>
            {(() => {
              if (this.props.data.copyright) {
                return " | Image \u00A9 " + this.props.data.copyright;
              } else {
                return undefined;
              }
            })()}
          </div>
        </div>
      </div>
    );
  };
}

module.exports = SideBar;
