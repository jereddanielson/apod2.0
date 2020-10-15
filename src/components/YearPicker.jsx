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

const YearPicker = (props) => {
  const handlePicked = (e) => {
    props.setNewDate(props.curDateMoment.clone().year(e));
  };

  return (
    <select
      id="year-picker-num"
      className="datebox-component year-picker"
      value={props.curYear}
      style={{
        fontSize: 18,
        padding: 5,
        // A reset of styles, including removing the default dropdown arrow
        appearance: "none",
        WebkitAppearance: "none",
        // Additional resets for further consistency
        margin: 0,
        width: "100%",
        fontFamily: "inherit",
        lineHeight: "inherit",
        color: "inherit",
      }}
      onChange={(e) => {
        handlePicked(e.target.value);
      }}
    >
      {theDates.map((ea) => {
        return (
          <option value={ea} key={ea}>
            {ea}
          </option>
        );
      })}
    </select>
  );
};

module.exports = YearPicker;
