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

var datesArray = [
  { num: 1, name: "January" },
  { num: 2, name: "February" },
  { num: 3, name: "March" },
  { num: 4, name: "April" },
  { num: 5, name: "May" },
  { num: 6, name: "June" },
  { num: 7, name: "July" },
  { num: 8, name: "August" },
  { num: 9, name: "September" },
  { num: 10, name: "October" },
  { num: 11, name: "November" },
  { num: 12, name: "December" },
];

class MonthPicker extends React.Component {
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
      e.target.id !== "month-picker-inner-id" &&
      e.target.id !== "month-picker-num"
    ) {
      this.setState({ isOpen: false });
    }
  };
  handleClick = (e) => {
    this.ref.click();
  };
  handlePicked = (e) => {
    this.props.setNewDate(this.props.curDateMoment.clone().month(e - 1));
  };
  render = () => {
    return (
      <select
        id="month-picker-num"
        className="datebox-component month-picker"
        onClick={this.handleClick}
        value={datesArray.find((ea) => ea.name === this.props.curMonth).num}
        style={{
          fontSize: 18,
          padding: 5,
          // A reset of styles, including removing the default dropdown arrow
          appearance: "none",
          // Additional resets for further consistency
          margin: 0,
          width: "100%",
          fontFamily: "inherit",
          lineHeight: "inherit",
          color: "inherit",
        }}
        ref={(r) => {
          this.ref = r;
        }}
        onChange={(e) => {
          this.handlePicked(e.target.value);
        }}
      >
        {datesArray.map((ea) => {
          return (
            <option value={ea.num} key={ea.name}>
              {ea.name}
            </option>
          );
        })}
      </select>
    );
  };
}

module.exports = MonthPicker;
