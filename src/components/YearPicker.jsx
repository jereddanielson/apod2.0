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

let theDates = [];
let currentYear = new Date().getFullYear();
for (let i = 1995; i <= currentYear; i++) {
  theDates.push(i);
}

class YearPicker extends React.Component {
  state = {
    isOpen: false,
    datesArray: theDates,
  };
  componentDidMount = () => {
    document.addEventListener("click", this.handleCancelClick);
  };
  componentWillUnmount = () => {
    document.removeEventListener("click", this.handleCancelClick);
  };
  handleCancelClick = (e) => {
    if (
      this.state.isOpen &&
      e.target.id !== "year-picker-inner-id" &&
      e.target.id !== "year-picker-num"
    ) {
      this.setState({ isOpen: false });
    }
  };
  handleClick = (e) => {
    this.setState({ isOpen: true });
  };
  handlePicked = (e) => {
    this.setState({ isOpen: false });
    this.props.setNewDate(this.props.curDateMoment.clone().year(e));
  };
  render = () => {
    var datesArray = this.state.datesArray;
    var self = this;
    return (
      <div
        id="datebox-year"
        className={
          "datebox-component " + (this.state.isOpen ? "picker-is-open" : "")
        }
        style={{ fontSize: "18px", padding: "5px", display: "inline-block" }}
      >
        <div className="year-picker">
          <div id="year-picker-num" onClick={this.handleClick}>
            {this.props.curYear}
          </div>
          {(() => {
            if (this.state.isOpen) {
              return (
                <div id="year-picker-inner-id" className="year-picker-inner">
                  {datesArray.map(function (e) {
                    return (
                      <div
                        className={
                          "year-picker-year picker-element " +
                          (e === self.props.curYear
                            ? "selected-picker-element"
                            : "")
                        }
                        onClick={function () {
                          self.handlePicked(e);
                        }}
                        key={"year-picker-" + e}
                      >
                        {e}
                      </div>
                    );
                  })}
                </div>
              );
            } else {
              return undefined;
            }
          })()}
        </div>
      </div>
    );
  };
}

module.exports = YearPicker;
