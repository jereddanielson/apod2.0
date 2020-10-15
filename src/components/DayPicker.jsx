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

const DayPicker = (props) => {
  const handlePicked = (e) => {
    props.setNewDate(props.curDateMoment.clone().date(e));
  };

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
  for (var i = 28; i < props.daysInCurMonth; i++) {
    datesArray.push(i + 1);
  }
  return (
    <div style={{ flexShrink: 1 }}>
      <select
        id="day-picker-num"
        className="datebox-component day-picker"
        value={props.curDay}
        style={{
          fontSize: 64,
          display: "inline-block",
          textAlign: "center",
          padding: 5,
          margin: "5px 0",
          lineHeight: "64px",
          padding: 5,
          // A reset of styles, including removing the default dropdown arrow
          appearance: "none",
          // Additional resets for further consistency
          width: "100%",
          fontFamily: "inherit",
          color: "inherit",
        }}
        onChange={(e) => {
          handlePicked(e.target.value);
        }}
      >
        {datesArray.map((ea) => {
          return (
            <option value={ea} key={ea}>
              {ea}
            </option>
          );
        })}
      </select>
    </div>
  );
};

module.exports = DayPicker;
