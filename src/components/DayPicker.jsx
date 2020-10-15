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

class DayPicker extends React.Component {
  state = { isOpen: false };
  componentDidMount = () => {
    document.addEventListener("click", this.handleCancelClick);
  };
  componentWillUnmount = () => {
    document.removeEventListener("click", this.handleCancelClick);
  };
  handleCancelClick = (e) => {
    if (
      this.state.isOpen &&
      e.target.id !== "day-picker-inner-id" &&
      e.target.id !== "day-picker-num"
    ) {
      this.setState({ isOpen: false });
    }
  };
  handleClick = (e) => {
    this.setState({ isOpen: true });
  };
  handlePicked = (e) => {
    this.setState({ isOpen: false });
    this.props.setNewDate(this.props.curDateMoment.clone().date(e));
  };
  render = () => {
    var datesArray = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
    ];
    for (var i = 28; i < this.props.daysInCurMonth; i++) {
      datesArray.push(i + 1);
    }
    var self = this;
    return (
      <div
        id="datebox-day"
        className={
          "datebox-component " + (this.state.isOpen ? "picker-is-open" : "")
        }
        style={{
          fontSize: "64px",
          display: "inline-block",
          textAlign: "center",
          padding: "5px",
          margin: "5px 0",
          lineHeight: "64px",
        }}
      >
        <div className="day-picker">
          <div id="day-picker-num" onClick={this.handleClick}>
            {this.props.curDay}
          </div>
          {(() => {
            if (this.state.isOpen) {
              return (
                <div id="day-picker-inner-id" className="day-picker-inner">
                  {datesArray.map(function (e) {
                    return (
                      <div
                        className={
                          "day-picker-day picker-element " +
                          (e === self.props.curDay
                            ? "selected-picker-element"
                            : "")
                        }
                        onClick={function () {
                          self.handlePicked(e);
                        }}
                        key={"day-picker-" + e}
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

module.exports = DayPicker;
